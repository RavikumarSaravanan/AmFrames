import { motion } from "motion/react";
import { ArrowRight, Camera } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1920"
          alt="Hero Wedding Photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-neutral-950"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-10 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl"
        >
          <Camera size={14} className="text-brand-primary" />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/90">
            Professional Studio Tharangambadi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display italic mb-10 leading-[0.85] tracking-tighter text-white"
        >
          Beautiful <br />
          <span className="text-brand-primary">Photos</span> for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 text-base md:text-xl font-medium max-w-xl mx-auto mb-12 leading-relaxed"
        >
          We take best photos for your Wedding, Baby Shower, and all special functions in Tharangambadi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#portfolio"
            className="group w-full sm:w-auto px-12 py-5 bg-brand-primary text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-2xl shadow-brand-primary/20"
          >
            See Our Photos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-lg text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
          >
            Book Session
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
