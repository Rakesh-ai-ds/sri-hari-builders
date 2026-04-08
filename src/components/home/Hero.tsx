"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const words = "Engineering Luxury, Redefined".split(" ");

  return (
    <section ref={ref} className="relative h-[90vh] md:h-[110vh] w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal z-10" />
        <Image 
          src="/hero-bg.png" 
          alt="Luxury Architecture" 
          fill
          priority
          className="object-cover opacity-60"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <span className="px-4 py-1 border border-gold/50 text-gold text-[10px] md:text-xs uppercase tracking-[0.3em] backdrop-blur-md bg-gold/5 rounded-full">
            Est. 2008 • Sri Hari Builder
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif text-white mb-8 overflow-hidden flex flex-wrap justify-center gap-x-2 md:gap-x-6">
          Engineering <span className="text-gold">Legacy</span>, Defining <span className="text-gold italic">Luxury</span>.
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-off-white text-base md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-12 px-4"
        >
          Stop settling for ordinary. Experience <span className="text-white font-bold underline decoration-gold/50 underline-offset-8">35 years</span> of engineering precision that transforms your vision into a stable, <span className="text-white font-bold">world-class sanctuary</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <Link href="/about" className="group relative px-10 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:pr-14 overflow-hidden">
            <span className="relative z-10">Explore Our Legacy</span>
            <span className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-0 group-hover:right-5 group-hover:opacity-100 transition-all duration-300">→</span>
          </Link>
          
          <Link href="/projects" className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white hover:text-charcoal hover:border-white">
            View Projects
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] vertical-text">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold/50 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};
