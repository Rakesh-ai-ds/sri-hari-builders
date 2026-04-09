"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown, LayoutGrid, Home, Construction, Hammer, Smartphone, Layers } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const MobileAccordion = ({ title, items, onItemClick }: { title: string, items: any[], onItemClick: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [active, setActive] = useState("");
    
    return (
      <div className="border-b border-white/5 py-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">{title}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gold opacity-50"
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 pb-2 space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => { setActive(item.id); onItemClick(); }}
                      className={`group flex items-center px-6 py-2.5 transition-all duration-300 ${
                        active === item.id 
                          ? 'bg-gold/10 border-r-4 border-gold' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <item.icon className={`mr-4 transition-colors ${
                        active === item.id ? 'text-gold' : 'text-white/40 group-hover:text-gold'
                      }`} size={20} />
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${
                        active === item.id ? 'text-gold' : 'text-white/60 group-hover:text-gold'
                      }`}>
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <motion.nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
          scrolled || isOpen ? "bg-charcoal/90 backdrop-blur-xl shadow-glass py-3" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        <Link href="/" className="flex items-center gap-4 group z-50">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gold/30 bg-white p-1 transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-gold/10">
            <Image 
              src="/logo.png" 
              alt="Sri Hari Builder Logo" 
              fill
              className="object-contain p-0 scale-[1.7]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-serif font-bold tracking-tighter text-gold leading-none">SRI HARI</span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-white/40 leading-none mt-1">Builder & Promoters</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-sans uppercase tracking-widest text-off-white/80">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gold transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4 z-50">
          <Link 
            href="/contact" 
            className="hidden md:flex items-center gap-2 px-6 py-2 border border-gold text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Consult Now
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gold transition-transform active:scale-95"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-charcoal/95 backdrop-blur-2xl flex flex-col md:hidden overflow-y-auto"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <div className="container mx-auto px-8 pt-24 pb-32 flex flex-col min-h-screen">
              {/* Primary Links */}
              <div className="mb-12">
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold mb-6 opacity-50">Main Navigation</p>
                <div className="space-y-5">
                  {/* Home */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white hover:text-gold transition-colors">Home</Link>
                  </motion.div>
                  
                  {/* About */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white hover:text-gold transition-colors">About</Link>
                  </motion.div>

                  {/* Projects with Sub-menu */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
                    <MobileAccordion 
                      title="Engineering in Motion" 
                      items={[
                        { id: 'all', name: "Master Dashboard", href: "/projects", icon: LayoutGrid },
                        { id: 'portfolio', name: "Portfolio highlights", href: "/projects?category=portfolio", icon: Home },
                        { id: 'basement-level', name: "Basement Level", href: "/projects?category=basement-level", icon: Construction },
                        { id: 'lintel-level', name: "Lintel Level", href: "/projects?category=lintel-level", icon: Layers },
                        { id: 'sill-level-concrete', name: "Sill Level", href: "/projects?category=sill-level-concrete", icon: Hammer },
                      ]}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </motion.div>

                  {/* Services */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
                    <Link href="/services" onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white hover:text-gold transition-colors">Services</Link>
                  </motion.div>

                  {/* Contact */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="text-3xl font-serif text-white hover:text-gold transition-colors">Contact</Link>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-8"
              >
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-gold text-charcoal font-bold uppercase tracking-widest text-xs text-center shadow-lg shadow-gold/10"
                >
                  Book a Consultation
                </Link>
                
                <div className="flex justify-between items-center text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
                  <span>Coimbatore, TN</span>
                  <a href="tel:+919787081184" className="text-gold opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Phone size={10} /> +91 97870 81184
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
