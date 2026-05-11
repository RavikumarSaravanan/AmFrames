import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Camera } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/src/assets/logo.svg";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Our Photos", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Location", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      id="main-header"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12",
        isScrolled || !isHomePage ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="AM Frames Photography logo"
            className="w-10 h-10 rounded-full object-contain shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className={cn("font-heading font-bold text-lg leading-none tracking-tight transition-colors", isScrolled || !isHomePage ? "text-white" : "text-white")}>AM FRAMES PHOTOGRAPHY</span>
            <span className={cn("text-[10px] uppercase tracking-[0.2em] transition-opacity", isScrolled || !isHomePage ? "text-white/50" : "text-white/60")}>Photo Studio</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-sm uppercase tracking-widest font-bold transition-all cursor-pointer hover:text-brand-primary",
                isScrolled || !isHomePage ? "text-white/70" : "text-white/80"
              )}
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/admin"
            className={cn("transition-colors", isScrolled || !isHomePage ? "text-white/30 hover:text-white/60" : "text-white/30 hover:text-white/60")}
            title="Admin Login"
          >
            <Camera size={18} />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden transition-colors text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-lg uppercase tracking-widest font-bold text-white/80 hover:text-brand-primary"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg uppercase tracking-widest font-bold text-white/80 hover:text-brand-primary"
            >
              Admin Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
