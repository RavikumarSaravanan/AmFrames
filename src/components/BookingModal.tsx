import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, User, Phone, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Wedding Photoshoot",
    date: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        // Also open WhatsApp as a confirmation step (optional but helpful)
        setTimeout(() => {
          const text = encodeURIComponent(`Hi AM Frames! I just booked a session for ${formData.service} on ${formData.date}. My name is ${formData.name}.`);
          window.open(`https://wa.me/918248975778?text=${text}`, '_blank');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5"
          >
            {/* Header */}
            <div className="relative h-32 bg-brand-primary flex items-center px-10">
              <div className="absolute top-0 right-0 p-6">
                <button onClick={onClose} className="text-black/60 hover:text-black transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-display italic text-black leading-none">Book a Session</h2>
                <p className="text-black/80 text-[10px] uppercase tracking-[0.2em] font-bold">Please fill your details below</p>
              </div>
            </div>

            <div className="p-10">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-xl shadow-green-500/10">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display italic text-white">Thank You, {formData.name.split(' ')[0]}!</h3>
                    <p className="text-white/40 text-sm mt-2 leading-relaxed">We got your booking! Please check your WhatsApp for a message from us.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-brand-primary text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
                  >
                    OK, Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-1">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium"
                          placeholder="Type your name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-1">Service</label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-bold appearance-none text-white"
                      >
                        <option className="bg-neutral-900">Wedding Photoshoot</option>
                        <option className="bg-neutral-900">Outdoor Photoshoot</option>
                        <option className="bg-neutral-900">Birthday Photoshoot</option>
                        <option className="bg-neutral-900">Maternity Photoshoot</option>
                        <option className="bg-neutral-900">Puberty Ceremony</option>
                        <option className="bg-neutral-900">Baby Photoshoot</option>
                        <option className="bg-neutral-900">Invitation Cards</option>
                        <option className="bg-neutral-900">Frames & Gifts</option>
                        <option className="bg-neutral-900">Banners & Posters</option>
                        <option className="bg-neutral-900">Designing Work</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-1">Function Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-1">Other Details</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-4 bg-white/5 border border-white/5 rounded-2xl outline-none focus:border-brand-primary transition-all text-sm font-medium h-24 resize-none"
                      placeholder="Tell us more details about your function..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Send Booking
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-white/20 text-center uppercase tracking-widest font-bold">No payment needed now</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
