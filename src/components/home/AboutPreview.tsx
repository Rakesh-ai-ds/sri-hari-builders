"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const AboutPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 md:py-48 bg-charcoal text-off-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">The Legacy</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            35 Years of <span className="text-gold underline decoration-white/20 underline-offset-8">Unshakable Trust</span>.
          </h2>
          
          <p className="text-off-white/80 text-lg leading-relaxed mb-10 max-w-xl">
            Since 1995, Sri Hari Builder & Promoters has been the cornerstone of Coimbatore&apos;s skyline. We don&apos;t just build structures; we craft <span className="text-white font-bold italic">generational legacies</span> with engineering precision and absolute transparency. Your dream isn&apos;t just a project—it&apos;s our <span className="text-gold font-bold">reputation</span>.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-3xl font-serif text-gold mb-2">28+</h4>
              <p className="text-off-white/90 uppercase tracking-widest text-[10px]">Years of Expertise</p>
            </div>
            <div>
              <h4 className="text-3xl font-serif text-gold mb-2">150+</h4>
              <p className="text-off-white/90 uppercase tracking-widest text-[10px]">Projects Delivered</p>
            </div>
            <div>
              <h4 className="text-3xl font-serif text-gold mb-2">12M+</h4>
              <p className="text-off-white/90 uppercase tracking-widest text-[10px]">Sq. Ft. Built</p>
            </div>
            <div>
              <h4 className="text-3xl font-serif text-gold mb-2">1.2k</h4>
              <p className="text-off-white/90 uppercase tracking-widest text-[10px]">Happy Families</p>
            </div>
          </div>

          <Link href="/about" className="inline-block px-10 py-4 border border-gold/40 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300">
            Our Story
          </Link>
        </motion.div>

        {/* Right Side: Visuals */}
        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="absolute -inset-4 border border-gold/20 rounded-2xl -z-10 group-hover:inset-0 transition-all duration-700" />
            <Image 
              src="/about-preview-main.png" 
              alt="Premium Architecture" 
              width={800}
              height={600}
              className="w-full h-[600px] object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 grayscale-50"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-6 -right-4 md:-bottom-12 md:-right-12 z-20 w-1/2 overflow-hidden rounded-xl border-4 border-charcoal shadow-2xl"
          >
             <Image 
              src="/about-preview-small.png" 
              alt="Detailed Craftsmanship" 
              width={400}
              height={300}
              className="w-full h-full object-cover aspect-video"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
