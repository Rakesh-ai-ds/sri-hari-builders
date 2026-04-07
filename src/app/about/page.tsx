"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const timeline = [
  { year: "1995", event: "Foundation of Sri Hari Builder & Promoters with a vision for excellence." },
  { year: "2002", event: "Completed our first landmark residential project in Chennai." },
  { year: "2010", event: "Expanded operations into premium commercial developments." },
  { year: "2018", event: "Awarded &apos;Best Luxury Developer&apos; for our sustainable design initiatives." },
  { year: "2024", event: "pioneering smart home integration in all our upcoming luxury estates." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 bg-charcoal text-off-white">
      {/* Header Section */}
      <section className="container mx-auto px-6 md:px-12 py-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 inline-block">The Legacy</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight mb-12 text-white">
            Built on <span className="text-gold italic underline decoration-white/10 underline-offset-8">Vision</span>,<br />Driven by <span className="text-white">Reputation</span>.
          </h1>
          <p className="text-off-white/80 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Sri Hari Builder & Promoters (SHB) is Coimbatore&apos;s premier engineering house. Since 1995, we have specialized in transforming complex blueprints into <span className="text-white font-bold">architectural landmarks</span>. Our approach is simple: <span className="text-gold italic font-bold">zero compromise</span> on structural integrity and complete transparency in every brick laid.
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
                transition={{ duration: 0.8, delay: idx * 0.1 }}
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

       {/* Expertise Section */}
       <section className="py-24 md:py-48 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Unrivaled <span className="text-gold">Engineering</span> Mastery.</h2>
          <p className="text-off-white text-lg leading-relaxed mb-10">
            Our team of world-class architects and engineers combine traditional craftsmanship with futuristic innovation to deliver structures that are as robust as they are beautiful. 
          </p>
          <div className="space-y-6">
            {["Precision Structural Engineering", "Sustainable Material Integration", "Advanced Smart-Home Systems"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span className="text-off-white/80 uppercase tracking-widest text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="relative h-[600px] overflow-hidden rounded-2xl group border border-white/10 shadow-2xl">
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
