import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, LogOut, Camera, Video, Type, Link as LinkIcon, FileText, LayoutGrid, Upload, CheckCircle2, AlertCircle, Inbox, User as UserIcon, Phone as PhoneIcon, Calendar as CalendarIcon } from "lucide-react";
import { Post, MediaType, Category } from "@/src/types";
import { cn } from "@/src/lib/utils";
import Header from "@/src/components/Header";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "bookings">("posts");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ... (rest of form states)
  const [type, setType] = useState<MediaType>("photo");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Wedding");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      // dashboardData will be triggered by the useEffect observing isLoggedIn
    }
  }, []);

  const dashboardData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      setPosts(data.posts || []);
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) dashboardData();
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("adminToken", data.token);
        dashboardData();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, category, description, mediaUrl }),
      });
      if (response.ok) {
        setTitle("");
        setDescription("");
        setMediaUrl("");
        setUploadSuccess(false);
        dashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFile(true);
    setUploadSuccess(false);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMediaUrl(data.url);
        setUploadSuccess(true);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError("Error uploading file");
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      dashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const getThumbnail = (post: Post) => {
    if (post.type === "photo") return post.mediaUrl;
    if (post.mediaUrl.includes("youtube.com") || post.mediaUrl.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = post.mediaUrl.match(regExp);
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
      }
    }
    return post.mediaUrl;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md p-10 bg-neutral-900 border border-white/5 rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-black font-bold text-3xl mb-4 shadow-lg shadow-brand-primary/20">
              AM
            </div>
            <h1 className="text-3xl font-display italic text-white">Admin Portal</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mt-2">Manage your photography studio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:border-brand-primary outline-none transition-all text-sm font-medium text-white"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:border-brand-primary outline-none transition-all text-sm font-medium text-white"
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-tight">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-brand-primary/20"
            >
              Enter Dashboard
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => navigate("/")} className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white/60 transition-colors">
              Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-neutral-900 p-8 rounded-[2rem] border border-white/5 shadow-sm">
          <div>
            <h1 className="text-4xl md:text-5xl font-display italic text-white leading-none">Studio Dashboard</h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">Manage your works & services</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setActiveTab("posts")}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === "posts" ? "bg-brand-primary text-black shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                Gallery
              </button>
              <button 
                onClick={() => setActiveTab("bookings")}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === "bookings" ? "bg-brand-primary text-black shadow-sm" : "text-white/40 hover:text-white"
                )}
              >
                Bookings {bookings.length > 0 && <span className="ml-1 text-red-500">({bookings.length})</span>}
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 border border-white/5 rounded-full text-white/40 hover:text-red-500 hover:border-red-500 transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {activeTab === "posts" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* New Post Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 p-10 bg-neutral-900 border border-white/5 rounded-[2.5rem] shadow-sm">
                <h2 className="text-xl font-heading font-bold mb-8 uppercase tracking-widest flex items-center gap-3 text-white">
                  <Plus size={20} className="text-brand-primary" /> Add New Work
                </h2>
                
                <form onSubmit={handleAddPost} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Media Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setType("photo")}
                        className={cn(
                          "flex items-center justify-center gap-2 py-3 border rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest",
                          type === "photo" ? "bg-brand-primary border-brand-primary text-black shadow-lg shadow-brand-primary/10" : "border-white/5 text-white/40 hover:border-white/20"
                        )}
                      >
                        <Camera size={14} /> Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("video")}
                        className={cn(
                          "flex items-center justify-center gap-2 py-3 border rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest",
                          type === "video" ? "bg-brand-primary border-brand-primary text-black shadow-lg shadow-brand-primary/10" : "border-white/5 text-white/40 hover:border-white/20"
                        )}
                      >
                        <Video size={14} /> Video
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Title</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium text-white"
                        placeholder="e.g. Beachside Wedding"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-bold appearance-none text-white"
                    >
                      {["Wedding", "Maternity", "Baby", "Puberty", "Frames"].map(cat => (
                        <option key={cat} value={cat} className="bg-neutral-900">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium text-white min-h-[100px] resize-none"
                      placeholder="Add some details about this work..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "w-full p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-white/5 text-center",
                        uploadSuccess ? "border-green-500 bg-green-500/10" : "border-white/10"
                      )}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept={type === "photo" ? "image/*" : "video/*"}
                        onChange={handleFileUpload}
                      />
                      {isUploadingFile ? (
                        <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                      ) : uploadSuccess ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <Upload className="text-white/20" size={24} />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {isUploadingFile ? "Uploading..." : uploadSuccess ? "Ready to Publish" : `Upload ${type === "photo" ? "Photo" : "Video"}`}
                      </span>
                    </div>
                    <div className="relative group">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        type="text"
                        value={mediaUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMediaUrl(val);
                          setUploadSuccess(false);
                          
                          // Auto detect video type
                          if (val.includes("youtube.com") || val.includes("youtu.be") || val.includes("instagram.com")) {
                            setType("video");
                          }
                        }}
                        className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium text-white"
                        placeholder="Or Paste URL (YouTube, Instagram, etc.)"
                      />
                      {mediaUrl && (
                        <button 
                          type="button"
                          onClick={() => {setMediaUrl(""); setUploadSuccess(false);}}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all disabled:opacity-50 shadow-xl shadow-brand-primary/20"
                  >
                    {isLoading ? "Publishing..." : "Publish Work"}
                  </button>
                </form>
              </div>
            </div>

            {/* Posts List */}
            <div className="lg:col-span-2">
              <div className="p-10 bg-neutral-900 border border-white/5 rounded-[2.5rem] shadow-sm">
                <h2 className="text-xl font-heading font-bold mb-8 uppercase tracking-widest flex items-center gap-3 text-white">
                  <LayoutGrid size={20} className="text-brand-primary" /> Gallery Works ({posts.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center gap-5 p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0 border border-white/5">
                        <img 
                          src={getThumbnail(post)} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            if (e.currentTarget.src.includes('maxresdefault')) {
                              e.currentTarget.src = e.currentTarget.src.replace('maxresdefault', '0');
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="font-bold text-white truncate text-sm">{post.title}</h4>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mt-1">{post.category} • {post.type}</p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-3 text-white/40 hover:text-red-500 hover:bg-red-500/10 flex-shrink-0 transition-all rounded-xl border border-white/5 hover:border-red-500/30"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Bookings Tab */
          <div className="space-y-4">
            <div className="bg-neutral-900 p-10 rounded-[2.5rem] border border-white/5 shadow-sm">
               <div className="flex items-center gap-3 mb-8">
                 <Inbox className="text-brand-primary" size={24} />
                 <h2 className="text-2xl font-display italic text-white">Recent Inquiries</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {bookings.map((b) => (
                   <div key={b.id} className="p-8 bg-black/20 rounded-3xl border border-white/5 space-y-6">
                     <div className="flex justify-between items-start">
                       <span className="px-4 py-1 bg-brand-primary text-black text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-brand-primary/20">
                         {b.service}
                       </span>
                       <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">
                         {new Date(b.createdAt).toLocaleDateString()}
                       </span>
                     </div>
                     <div className="space-y-4">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 shadow-sm border border-white/5">
                           <UserIcon size={16} />
                         </div>
                         <div>
                           <p className="text-sm font-bold text-white">{b.name}</p>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Client Name</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 shadow-sm border border-white/5">
                           <PhoneIcon size={16} />
                         </div>
                         <div>
                           <p className="text-sm font-bold text-white">{b.phone}</p>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Contact number</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 shadow-sm border border-white/5">
                           <CalendarIcon size={16} />
                         </div>
                         <div>
                           <p className="text-sm font-bold text-white">{new Date(b.date).toDateString()}</p>
                           <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Preferred Date</p>
                         </div>
                       </div>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm text-white/60 leading-relaxed italic">
                       "{b.message || "No special message provided."}"
                     </div>
                     <button
                        onClick={() => window.open(`https://wa.me/${b.phone.startsWith('91') ? b.phone : '91' + b.phone}`, '_blank')}
                        className="w-full py-3 bg-green-500 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-green-600 transition-all shadow-xl shadow-green-500/10 flex items-center justify-center gap-2"
                     >
                       Reply via WhatsApp
                     </button>
                   </div>
                 ))}
                 
                 {bookings.length === 0 && (
                   <div className="col-span-full py-32 text-center space-y-4 opacity-10">
                     <Inbox size={48} className="mx-auto text-white" />
                     <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">No inquiries yet. They will appear here!</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
