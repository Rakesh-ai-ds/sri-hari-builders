"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Shield, Briefcase, Award, Quote } from "lucide-react";

const timeline = [
  { year: "2008", event: "Foundation of Sri Hari Builder & Promoters with a vision for structural perfection." },
  { year: "2012", event: "Completed our first landmark residential project in Coimbatore." },
  { year: "2016", event: "Expanded operations into premium commercial developments." },
  { year: "2020", event: "Awarded 'Best Luxury Developer' for our sustainable design initiatives." },
  { year: "2024", event: "Pioneering smart home integration in all upcoming luxury estates." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 bg-charcoal text-off-white">
      {/* Header Section */}
      <section className="container mx-auto px-6 md:px-12 py-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 inline-block">The Legacy</span>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-tight mb-12 text-white">
            Built on <span className="text-gold italic underline decoration-white/10 underline-offset-8">Vision</span>,<br />Driven by <span className="text-white">Reputation</span>.
          </h1>
          <p className="text-off-white/80 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Sri Hari Builder & Promoters (SHB) is Coimbatore&apos;s premier engineering house. Since 2008, we have specialized in transforming complex blueprints into <span className="text-white font-bold">architectural landmarks</span>. Our approach is simple: <span className="text-gold italic font-bold">zero compromise</span> on structural integrity and complete transparency in every brick laid.
          </p>
        </motion.div>
      </section>

      {/* History Timeline */}
      <section className="py-24 md:py-48 bg-white/5 relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif mb-20 text-center">Our Journey</h2>
          
          <div className="relative">
            {/* The Vertical Line */}
            <div className="absolute left-4 md:left-1/2 h-full w-[1px] bg-gold/30 -translate-x-1/2" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-24 last:mb-0 ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Connection Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 z-20 border-4 border-charcoal shadow-[0_0_15px_rgba(212,175,55,0.5)]" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-gold/30 transition-colors group">
                    <span className="text-4xl font-serif text-gold mb-4 block group-hover:scale-110 transition-transform origin-left md:origin-right">
                      {item.year}
                    </span>
                    <p className="text-off-white/80 text-lg leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Mission & Vision Section */}
       <section className="py-24 md:py-48 container mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="p-12 bg-white/[0.03] border border-white/10 rounded-[40px] backdrop-blur-xl relative overflow-hidden group hover:border-gold/30 transition-all duration-700"
           >
             <div className="relative z-10">
               <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 text-gold group-hover:scale-110 transition-transform">
                 <Eye size={32} />
               </div>
               <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white">Our <span className="text-gold italic">Vision</span></h3>
               <p className="text-off-white/70 text-lg leading-relaxed">
                 To architect a future where every project stands as a testament to engineering perfection and luxurious transparency. We aim to redefine Coimbatore&apos;s skyline through structurally superior landmarks that endure for generations.
               </p>
             </div>
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-white">
               <Eye size={200} />
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="p-12 bg-white/[0.03] border border-white/10 rounded-[40px] backdrop-blur-xl relative overflow-hidden group hover:border-gold/30 transition-all duration-700"
           >
             <div className="relative z-10">
               <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 text-gold group-hover:scale-110 transition-transform">
                 <Target size={32} />
               </div>
               <h3 className="text-3xl md:text-4xl font-serif mb-6 text-white">Our <span className="text-gold italic">Mission</span></h3>
               <p className="text-off-white/70 text-lg leading-relaxed">
                 Empowering aspirations through unwavering structural integrity and visionary design. Our mission is built on 18 years of architectural and engineering mastery, ensuring that every brick laid is a commitment to precision and trust.
               </p>
             </div>
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-white">
               <Target size={200} />
             </div>
           </motion.div>
         </div>
       </section>

       {/* Founder Profile Section */}
       <section className="py-24 md:py-48 bg-charcoal border-y border-white/5 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.7 }}
               viewport={{ once: true }}
               className="relative"
             >
               <div className="relative h-[600px] md:h-[800px] overflow-hidden rounded-[80px] border border-white/10 shadow-2xl group">
                 <Image 
                   src="/WhatsApp Image 2026-04-08 at 11.14.47 PM.jpeg" 
                   alt="Er. N Sivakumar B.tech" 
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
               </div>
               
               {/* Experience Badge */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="absolute -bottom-10 -right-6 md:bottom-20 md:-right-10 bg-gold p-8 md:p-12 rounded-[40px] shadow-2xl border-8 border-charcoal max-w-[280px]"
               >
                 <div className="flex flex-col gap-2">
                   <span className="text-5xl md:text-7xl font-serif font-bold text-charcoal leading-none">18</span>
                   <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-charcoal/60 leading-tight">Years of<br />Architectural & Engineering Mastery</span>
                 </div>
               </motion.div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="space-y-12"
             >
               <div>
                 <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 inline-block">Founder & Managing Director</span>
                 <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Er. N Sivakumar <span className="text-gold text-2xl md:text-4xl align-top italic opacity-80 block md:inline mt-2 md:mt-0">B.tech</span></h2>
                 <p className="text-xl md:text-2xl text-off-white/80 leading-relaxed font-serif italic">
                   "A building's true strength isn't just in its reinforcement, but in the reputation it upholds for decades to come."
                 </p>
               </div>

               <div className="space-y-8">
                 <p className="text-lg text-off-white/60 leading-relaxed">
                   With nearly two decades of intensive experience in high-performance engineering and architectural innovation, Er. N Sivakumar has pioneered some of Coimbatore's most structurally resilient landmarks. 
                 </p>
                 <p className="text-lg text-off-white/60 leading-relaxed">
                   Under his visionary leadership, Sri Hari Builder & Promoters has evolved into a powerhouse of technical precision, where architectural boldenss meets uncompromised structural integrity.
                 </p>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                 <div>
                   <div className="text-gold mb-2"><Briefcase size={24} /></div>
                   <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 font-sans">Engineering</h4>
                   <p className="text-off-white/40 text-xs">Structural Perfection</p>
                 </div>
                 <div>
                   <div className="text-gold mb-2"><Award size={24} /></div>
                   <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2 font-sans">Legacy</h4>
                   <p className="text-off-white/40 text-xs">Built on Reputation</p>
                 </div>
               </div>
             </motion.div>
           </div>
         </div>
       </section>

       {/* Expertise Section */}
       <section className="py-24 md:py-48 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
         >
           <h2 className="text-4xl md:text-6xl font-serif mb-8">Unrivaled <span className="text-gold">Engineering & Architectural</span> Mastery.</h2>
           <p className="text-off-white text-lg leading-relaxed mb-10">
             Our team of world-class architects and engineers combine traditional craftsmanship with futuristic innovation to deliver structures that are as robust as they are beautiful. 
           </p>
           <div className="space-y-6">
             {["Structural Integrity First", "Sustainable Material Integration", "Advanced Smart-Home Systems"].map((item, idx) => (
               <div key={idx} className="flex items-center gap-4">
                 <div className="w-2 h-2 bg-gold rounded-full" />
                 <span className="text-off-white/80 uppercase tracking-widest text-sm">{item}</span>
               </div>
             ))}
           </div>
         </motion.div>
        
        <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl group border border-white/10 shadow-2xl">
          <Image 
            src="/about-engineering.png" 
            alt="Engineering Excellence" 
            fill
            className="object-cover group-hover:scale-110 transition-all duration-1000"
          />
        </div>
      </section>
    </main>
  );
}
