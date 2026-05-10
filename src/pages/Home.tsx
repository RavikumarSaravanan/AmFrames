import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import Services from "@/src/components/Services";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import Header from "@/src/components/Header";
import BookingModal from "@/src/components/BookingModal";
import { useState } from "react";
import { motion } from "motion/react";
import { Star, Clock, MapPin } from "lucide-react";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero onBookClick={() => setIsBookingOpen(true)} />

      {/* Trust Badges / Why Us */}
      <section className="py-20 border-y border-white/5 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-5 p-6 rounded-2xl bg-neutral-900 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Star size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase tracking-widest text-sm mb-1 text-white">Best Quality</h4>
              <p className="text-white/40 text-xs font-medium">Clear photos & nice editing</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 rounded-2xl bg-neutral-900 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase tracking-widest text-sm mb-1 text-white">Fast Service</h4>
              <p className="text-white/40 text-xs font-medium">Always ready for you</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 rounded-2xl bg-neutral-900 border border-white/5">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-heading font-bold uppercase tracking-widest text-sm mb-1 text-white">Prime Location</h4>
              <p className="text-white/40 text-xs font-medium">Opposite GH, Tharangambadi</p>
            </div>
          </div>
        </div>
      </section>

      <Portfolio />
      
      <Services onBookClick={() => setIsBookingOpen(true)} />

      {/* Google Maps Section */}
      <section className="py-24 px-6 bg-neutral-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8 text-left">
              <span className="text-brand-primary text-xs uppercase tracking-[0.4em] font-bold block">Visit Our Studio</span>
              <h2 className="text-4xl md:text-6xl font-display italic leading-tight text-white">Find Us in <br /> Tharangambadi</h2>
              <div className="space-y-6 text-white/50">
                <p className="text-lg font-medium leading-relaxed">Located at the heart of the town, our studio is equipped with the latest technology to bring your visions to life.</p>
                <div className="p-8 bg-neutral-900 rounded-3xl border border-white/5">
                  <h4 className="text-white font-bold mb-3 font-heading tracking-widest text-xs uppercase">Studio Address</h4>
                  <p className="text-sm font-medium">No.5, SK Complex, GH Opposite, Kamarajar Saalai, Tharangambadi, Tamil Nadu 609313</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[450px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-700">
               {/* Replace with real embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1176.6146705911096!2d79.8512995453727!3d11.031126264626856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a551bb70342111f%3A0x754c4bd41876bed8!2sAm%20Frames%20Photography!5e1!3m2!1sen!2sin!4v1778264435926!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
