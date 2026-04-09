"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Hammer, Landmark, Layers, Map, PenTool, Ruler } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Zero-Stress Turnkey",
    description: "From blueprint to key handover, we handle the chaos. Experience a seamless building journey while we manage every detail.",
    icon: <Landmark className="w-8 h-8 text-gold" />,
  },
  {
    title: "Architectural Mastery",
    description: "Bespoke designs that don't just look good—they elevate your status. We craft spaces that reflect your unique vision.",
    icon: <PenTool className="w-8 h-8 text-gold" />,
  },
  {
    title: "Precision Engineering",
    description: "Foundations built for generations. Our structural integrity is non-negotiable, ensuring safety and longevity.",
    icon: <Ruler className="w-8 h-8 text-gold" />,
  },
  {
    title: "Interior Luxury",
    description: "Immersive interiors tailored to your refined taste. We blend high-end aesthetics with functional brilliance.",
    icon: <Layers className="w-8 h-8 text-gold" />,
  },
  {
    title: "Land Development",
    description: "Strategic property planning that maximizes ROI. We identify and develop the most promising landscapes in Coimbatore.",
    icon: <Map className="w-8 h-8 text-gold" />,
  },
  {
    title: "Expert Consulting",
    description: "18 Years of wisdom at your service. Avoid costly mistakes with our professional project guidance and valuation.",
    icon: <Hammer className="w-8 h-8 text-gold" />,
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-48 bg-charcoal text-off-white overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight max-w-2xl">
            Designing <span className="text-gold italic">Lifestyles</span>, Building Icons.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group p-10 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl hover:border-gold/30 hover:bg-gold/5 transition-all duration-500"
            >
              <div className="mb-8 p-4 w-fit border border-gold/20 rounded-xl group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-off-white/90 text-sm leading-relaxed mb-8 group-hover:text-white transition-colors">
                {service.description}
              </p>
              <Link 
                href="/services" 
                className="inline-flex items-center gap-3 text-gold text-[10px] uppercase tracking-[0.3em] font-bold group/btn"
              >
                <span className="relative">
                  Learn More
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover/btn:w-full" />
                </span>
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-gold group-hover/btn:text-charcoal group-hover/btn:border-gold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-gold/40 to-transparent" />
    </section>
  );
};
