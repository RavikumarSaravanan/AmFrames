import { Instagram, Phone, MapPin, Mail, Camera } from "lucide-react";
import logo from "@/src/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 pt-24 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        {/* Brand Info */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="AM Frames Photography logo"
              className="w-12 h-12 rounded-full object-cover shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none tracking-tight text-white">AM FRAMES PHOTOGRAPHY</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Photo Studio</span>
            </div>
          </div>
          <p className="text-white/40 max-w-xs leading-relaxed text-sm font-normal">
            We are a photography studio in Tharangambadi. We take best photos for your happy days.
          </p>
          <div className="flex flex-col gap-3">
            <a href="https://www.instagram.com/am_frames_photography/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/insta">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white group-hover/insta:text-brand-primary group-hover/insta:border-brand-primary/30 transition-all shadow-sm">
                <Instagram size={18} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover/insta:text-white transition-colors">@am_frames_photography</span>
            </a>
            <a href="https://www.instagram.com/am_frames/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group/insta">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-white group-hover/insta:text-brand-primary group-hover/insta:border-brand-primary/30 transition-all shadow-sm">
                <Instagram size={18} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover/insta:text-white transition-colors">@am_frames</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-xs mb-8 uppercase tracking-[0.3em] text-white">Quick Links</h3>
          <ul className="space-y-4 text-sm text-white/40 font-bold">
            <li><a href="#home" className="hover:text-brand-primary transition-colors">Home</a></li>
            <li><a href="#portfolio" className="hover:text-brand-primary transition-colors">Photos</a></li>
            <li><a href="#services" className="hover:text-brand-primary transition-colors">Services</a></li>
            <li><a href="#contact" className="hover:text-brand-primary transition-colors">Location</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="contact">
          <h3 className="font-heading font-bold text-xs mb-8 uppercase tracking-[0.3em] text-white">Contact Info</h3>
          <ul className="space-y-4 text-sm text-white/40 font-normal">
            <li className="flex items-start gap-4">
              <div className="text-brand-primary pt-1"><MapPin size={20} /></div>
              <span className="leading-relaxed">No.5, SK Complex, GH Opposite, Kamarajar Saalai, Tharangambadi.</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="text-brand-primary"><Phone size={20} /></div>
              <span className="font-bold text-white">+91 82489 75778</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="text-brand-primary"><Mail size={20} /></div>
              <span>amframestharangai@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col items-center gap-2 text-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
        <p>&copy; {new Date().getFullYear()} AM FRAMES PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
        <p>
          Designed & Developed by{' '}
          <a href="https://raventrixtechnologies.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-white transition-colors">
            Raventrix Technologies
          </a>
        </p>
      </div>
    </footer>
  );
}
