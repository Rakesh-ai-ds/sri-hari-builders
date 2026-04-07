"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen pt-32 bg-off-white text-charcoal font-sans">
      <section className="container mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-24 relative overflow-hidden">
        {/* Left Side: Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
        >
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 inline-block">Get in Touch</span>
          <h1 className="text-5xl md:text-8xl font-serif text-charcoal leading-tight mb-12">
            Let&apos;s <span className="text-gold italic">Connect</span>.
          </h1>
          <p className="text-charcoal/80 text-lg md:text-xl max-w-xl mb-16 leading-relaxed">
            Reach out for a private consultation and discover how we can transform your vision into an iconic architectural masterpiece.
          </p>

          <div className="space-y-12">
            <div className="flex items-start gap-8 group text-left">
              <div className="p-4 bg-charcoal text-gold rounded-2xl group-hover:bg-gold group-hover:text-charcoal transition-all duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif text-charcoal mb-2 uppercase tracking-widest text-xs">Our Presence</h4>
                <a 
                  href="https://share.google/DyjsYyYXRiFtDiqUV" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-charcoal/80 text-lg hover:text-gold transition-colors block leading-relaxed"
                >
                  No 133, Near Ramanis Appartment,<br />Amarar Jevanatham Road, 7th Street Ext,<br />Coimbatore, Tamil Nadu 641012
                </a>
              </div>
            </div>
            <div className="flex items-start gap-8 group text-left">
               <div className="p-4 bg-charcoal text-gold rounded-2xl group-hover:bg-gold group-hover:text-charcoal transition-all duration-500">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif text-charcoal mb-2 uppercase tracking-widest text-xs">Direct Line</h4>
                <p className="text-charcoal/80 text-lg">+91 97870 81184, 90470 35184</p>
              </div>
            </div>
            <div className="flex items-start gap-8 group text-left">
               <div className="p-4 bg-charcoal text-gold rounded-2xl group-hover:bg-gold group-hover:text-charcoal transition-all duration-500">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif text-charcoal mb-2 uppercase tracking-widest text-xs">Email Address</h4>
                <p className="text-charcoal/80 text-lg">sriharibuilderscbe@gmail.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
           className="relative"
        >
          <div className="absolute -inset-4 border border-gold/10 rounded-3xl -z-10" />
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="glass p-12 space-y-8 bg-white/50 backdrop-blur-xl border border-charcoal/5 shadow-2xl rounded-3xl text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/70 ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-charcoal/10 pb-4 focus:border-gold outline-none text-charcoal placeholder:text-charcoal/20" required />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/70 ml-1">Email Address</label>
                    <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-charcoal/10 pb-4 focus:border-gold outline-none text-charcoal placeholder:text-charcoal/20" required />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/70 ml-1">Service Type</label>
                   <select className="w-full bg-transparent border-b border-charcoal/10 pb-4 focus:border-gold outline-none text-charcoal appearance-none">
                     <option>Luxury Residential</option>
                     <option>Premium Commercial</option>
                     <option>Architecture Consulting</option>
                     <option>Interior Design</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/70 ml-1">Message</label>
                  <textarea placeholder="Tell us about your vision..." rows={5} className="w-full bg-transparent border-b border-charcoal/10 pb-4 focus:border-gold outline-none text-charcoal placeholder:text-charcoal/20 resize-none" required />
                </div>
                <button type="submit" className="group flex items-center justify-center gap-4 w-full py-5 bg-charcoal text-off-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-black overflow-hidden relative">
                  <span className="relative z-10 font-bold">Send Vision</span>
                  <Send size={14} className="relative z-10 transition-transform group-hover:translate-x-2" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 h-full flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-xl border border-charcoal/5 shadow-2xl rounded-3xl min-h-[500px]"
              >
                <div className="w-20 h-20 bg-gold/20 text-gold rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif text-charcoal mb-4">Message Received</h3>
                <p className="text-charcoal/80 max-w-sm">
                  Thank you for reaching out. Our architectural consultants will contact you within 24 hours to discuss your vision.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-12 text-xs uppercase font-bold tracking-widest border-b border-charcoal/20 pb-2 hover:border-gold transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-12 flex items-center justify-center gap-12 grayscale opacity-60">
             <a href="https://www.facebook.com/share/1NkGcyHxAX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold tracking-[0.4em] hover:text-gold transition-colors">Facebook</a>
             <a href="https://www.instagram.com/srihari_buildercbe?igsh=MTFjbGU5aXA3dmlzcQ==" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold tracking-[0.4em] hover:text-gold transition-colors">Instagram</a>
             <a href="https://youtube.com/@sriharibuildershb?si=vPAGA8UogVz84N-P" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold tracking-[0.4em] hover:text-gold transition-colors">YouTube</a>
          </div>
        </motion.div>
      </section>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-serif uppercase tracking-[1em] opacity-[0.02] -z-10 pointer-events-none">SHB</div>
    </main>
  );
}
