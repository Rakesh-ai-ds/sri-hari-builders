"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "SHB Emerald",
    category: "Luxury Apartments",
    image: "/projects/project1.png",
    location: "Saravanampatti, Coimbatore",
  },
  {
    id: 2,
    title: "Sri Hari Residency",
    category: "Modern Living",
    image: "/projects/project2.png",
    location: "Ramanathapuram, Coimbatore",
  },
  {
    id: 3,
    title: "Heritage Enclave",
    category: "Premium Villa",
    image: "/projects/project3.png",
    location: "Peelamedu, Coimbatore",
  },
];

export const ProjectShowcase = () => {
  return (
    <section className="py-24 md:py-48 bg-off-white text-charcoal overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">Showcase</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              Extraordinary <span className="text-gold italic">Creations</span>
            </h2>
          </div>
          <Link href="/projects" className="group px-8 py-3 mx-auto md:mx-0 border border-charcoal/20 text-xs uppercase tracking-widest font-bold hover:bg-charcoal hover:text-off-white transition-all duration-300">
            View All Projects 
            <span className="ml-4 inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {}
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="group relative cursor-pointer"
            >
              <div className="relative h-[600px] overflow-hidden rounded-3xl mb-8 shadow-2xl">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]" />
                
                <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 p-6 md:p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl transform translate-y-0 md:translate-y-10 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 ease-out">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gold uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-2 md:mb-4 block font-bold">{project.category}</span>
                      <h3 className="text-white text-3xl font-serif leading-tight">{project.title}</h3>
                      <p className="text-white/90 text-xs mt-2 uppercase tracking-widest">{project.location}</p>
                    </div>
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-charcoal transform transition-transform hover:scale-110"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
