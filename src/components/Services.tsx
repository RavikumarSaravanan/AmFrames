import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Image as ImageIcon, 
  Frame, 
  Ticket, 
  Send, 
  Star, 
  Heart, 
  User, 
  Smile, 
  Layout, 
  Palette, 
  X, 
  ChevronRight,
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Service {
  title: string;
  description: string;
  details: string;
  icon: any;
  category: "photography" | "design";
}

const PHOTOGRAPHY_SERVICES: Service[] = [
  {
    title: "Wedding",
    description: "Professional cinematography and high-end photography for your big day.",
    details: "Our wedding package includes full-day coverage, cinematic highlight films, candid photography, and premium wedding albums. We focus on capturing natural emotions and traditional rituals with artistic precision.",
    icon: Camera,
    category: "photography"
  },
  {
    title: "Pre Wedding",
    description: "Stylish pre-wedding shoots to highlight your romance and story.",
    details: "Beautiful pre-wedding photography in scenic locations or elegant indoor sets. We craft cinematic imagery that captures your connection, anticipation, and the joy leading up to your wedding.",
    icon: Camera,
    category: "photography"
  },
  {
    title: "Engagement",
    description: "Romantic pre-wedding shoots to capture your love story.",
    details: "Beautiful engagement sessions in scenic outdoor or elegant indoor settings. We create timeless photos that highlight your connection, joy, and anticipation before the wedding day.",
    icon: Heart,
    category: "photography"
  },
  {
    title: "Reception",
    description: "Stylish coverage of your wedding reception and celebrations.",
    details: "Full reception photography captures speeches, first dances, decor, and candid moments. We preserve the energy and emotion of your evening celebration with cinematic precision.",
    icon: Camera,
    category: "photography"
  },
  {
    title: "Outdoor",
    description: "Creative sessions in beautiful natural locations around Tharangambadi.",
    details: "Perfect for pre-wedding, post-wedding, or individual portraits. we use professional lighting and the scenic beauty of historical Tharangambadi to create stunning cinematic shots.",
    icon: ImageIcon,
    category: "photography"
  },
  {
    title: "Birthday",
    description: "Vibrant and fun sessions to celebrate your special milestones.",
    details: "Whether it's a first birthday or a grand celebration, we capture the joy and energy of the event. We offer theme-based setups and candid coverage of your guests.",
    icon: Star,
    category: "photography"
  },
  {
    title: "Maternity",
    description: "Elegant photography celebrating the beautiful journey of motherhood.",
    details: "A comfortable, artistic session for expecting mothers. We create a serene environment to capture the glow and anticipation of your new arrival. Best between 7-8 months.",
    icon: Heart,
    category: "photography"
  },
  {
    title: "Puberty",
    description: "Traditional coverage of the Manjal Neerattu Vizha with respect and elegance.",
    details: "Comprehensive coverage of traditional rituals and family portraits. We ensure the cultural significance of the ceremony is preserved in every frame.",
    icon: User,
    category: "photography"
  },
  {
    title: "Baby ",
    description: "Adorable and patient sessions for your little ones' early years.",
    details: "Specialized newborn and toddler photography with baby-friendly props and themes. We prioritize your child's comfort while creating timeless memories.",
    icon: Smile,
    category: "photography"
  }
];

const DESIGN_SERVICES: Service[] = [
  {
    title: "Invitation Cards",
    description: "Custom designs for weddings, birthdays, and all special occasions.",
    details: "From premium quality printed traditional invitations to modern digital e-invites with animations. We tailor every design to your unique style and needs.",
    icon: Ticket,
    category: "design"
  },
  {
    title: "Frames & Gifts",
    description: "High-quality photo framing and printing services at SK Complex.",
    details: "A wide variety of frame styles including wooden, minimalist, and large canvas prints. We use premium paper and long-lasting ink to preserve your memories.",
    icon: Frame,
    category: "design"
  },
  {
    title: "Banners & Standees",
    description: "Professional large-scale designs for events and business promos.",
    details: "High-resolution layouts for vinyl banners, flex, and standees. Perfect for weddings, shop openings, and public events in and around town.",
    icon: Layout,
    category: "design"
  },
  {
    title: "Posters & Graphic Works",
    description: "All types of designing and editing works for social media and print.",
    details: "Creative posters, brochures, and digital graphics. We also handle high-end photo restoration and professional color grading for your old photos.",
    icon: Palette,
    category: "design"
  }
];

interface ServiceProps {
  onBookClick: () => void;
}

export default function Services({ onBookClick }: ServiceProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-32 px-6 bg-neutral-950 border-y border-white/5 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display italic mb-6 text-white"
          >
            Photography & Design
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-medium text-sm md:text-base leading-relaxed"
          >
            From your wedding rituals to custom invitation designs, we handle everything with care and professional excellence.
          </motion.p>
        </div>

        {/* Photography Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-white/10" />
            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-2">
              <Sparkles className="text-brand-primary" size={14} /> Photography
            </h3>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTOGRAPHY_SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.title} 
                service={service} 
                index={index} 
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {/* Design Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-white/10" />
            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-2">
              <Layers className="text-brand-primary" size={14} /> Other Services
            </h3>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESIGN_SERVICES.map((service, index) => (
              <ServiceCard 
                 key={service.title} 
                 service={service} 
                 index={index + 6} 
                 onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
              All types of designing & editing works available @am frames & am frames photography
            </p>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8 text-brand-primary">
                  <selectedService.icon size={32} />
                </div>
                
                <span className="text-brand-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">
                  {selectedService.category} service
                </span>
                
                <h2 className="text-3xl md:text-4xl font-display italic text-white mb-6 leading-tight">
                  {selectedService.title}
                </h2>
                
                <div className="space-y-6">
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
                    {selectedService.description}
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-6">
                    {selectedService.details}
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/918248975778?text=${encodeURIComponent(`Hi AM Frames! I'm interested in your ${selectedService.title} service. Can you provide more details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white transition-all shadow-xl shadow-brand-primary/10"
                  >
                    Inquire via WhatsApp <ChevronRight size={14} />
                  </a>
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      onBookClick();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white/10 transition-all"
                  >
                    Fill Booking Form
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({ 
  service, 
  index, 
  onClick 
}: { 
  service: Service, 
  index: number, 
  onClick: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="p-8 border border-white/5 bg-neutral-900/50 hover:bg-neutral-800/80 hover:border-brand-primary/30 transition-all cursor-pointer group rounded-[2rem] relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-brand-primary group-hover:text-black group-hover:scale-110 transition-all duration-500">
          <service.icon size={22} />
        </div>
        <h3 className="text-sm md:text-base font-bold font-heading mb-3 uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors flex items-center justify-between">
          {service.title}
          <ChevronRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-primary" />
        </h3>
        <p className="text-white/30 leading-relaxed text-[11px] font-normal group-hover:text-white/50 transition-colors uppercase tracking-wider">
          {service.description}
        </p>
      </div>
      
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
