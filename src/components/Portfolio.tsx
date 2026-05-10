import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Post, Category } from "@/src/types";
import { Maximize2, Play, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const CATEGORIES: Category[] = ["All", "Wedding", "Maternity", "Baby", "Puberty", "Frames"];

export default function Portfolio() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
    }
    if (url.includes("instagram.com")) {
      const cleanUrl = url.split("?")[0];
      return `${cleanUrl}embed`;
    }
    return null;
  };

  const getYoutubeThumbnail = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
      : null;
  };

  const getThumbnail = (post: Post) => {
    if (post.type === "photo") return post.mediaUrl;
    if (post.mediaUrl.includes("youtube.com") || post.mediaUrl.includes("youtu.be")) {
      return getYoutubeThumbnail(post.mediaUrl) ?? `https://img.youtube.com/vi/${post.mediaUrl}/hqdefault.jpg`;
    }
    return "https://via.placeholder.com/1280x720?text=Video+Preview";
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-primary text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Our Work</span>
            <h2 className="text-4xl md:text-6xl font-display italic text-white">Our Best Photos</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold border transition-all",
                  activeCategory === cat
                    ? "bg-brand-primary border-brand-primary text-black shadow-lg shadow-brand-primary/20"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-white/20 uppercase tracking-widest text-sm font-bold">
            Loading Gallery...
          </div>
        ) : (
          <div className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="masonry-item group relative cursor-pointer overflow-hidden rounded-[1.5rem] bg-neutral-900 border border-white/5 shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.type === "video" ? (
                    <div className="relative aspect-video sm:aspect-square md:aspect-video overflow-hidden bg-black">
                      {post.mediaUrl.includes("youtube.com") || post.mediaUrl.includes("youtu.be") ? (
                        <img
                          src={getThumbnail(post)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            if (e.currentTarget.src.includes('maxresdefault')) {
                              e.currentTarget.src = e.currentTarget.src.replace('maxresdefault', 'hqdefault');
                            }
                          }}
                        />
                      ) : (
                        <video
                          src={post.mediaUrl}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-black transition-all">
                          <Play size={24} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-brand-primary font-bold mb-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      {post.category} • {post.type === "photo" ? "Photo" : "Video"}
                    </p>
                    <h3 className="text-sm font-bold font-heading text-white leading-tight transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/98 backdrop-blur-md p-6 md:p-12"
            onClick={() => setSelectedPost(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-brand-primary transition-colors z-[70]">
              <X size={32} />
            </button>
            
            <div 
              className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl shadow-black/50 bg-neutral-900 border border-white/5 w-full">
                {selectedPost.type === "video" ? (
                  getEmbedUrl(selectedPost.mediaUrl) ? (
                    <iframe
                      src={getEmbedUrl(selectedPost.mediaUrl)!}
                      className="w-full aspect-video md:aspect-[16/9]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={selectedPost.mediaUrl}
                      className="max-h-[75vh] w-full"
                      controls
                      autoPlay
                    />
                  )
                ) : (
                  <img
                    src={selectedPost.mediaUrl}
                    alt={selectedPost.title}
                    className="max-h-[75vh] w-auto object-contain"
                  />
                )}
              </div>
              <div className="md:w-1/3 text-left space-y-6">
                <div>
                  <span className="text-brand-primary text-xs uppercase tracking-[0.4em] font-bold mb-2 block">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display italic leading-tight text-white line-clamp-2">
                    {selectedPost.title}
                  </h2>
                </div>
                <p className="text-white/60 text-lg leading-relaxed font-normal">
                  {selectedPost.description}
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Captured: {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
