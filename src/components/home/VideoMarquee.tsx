"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, X, Youtube, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const VIDEOS: Video[] = [
  { id: "MpSzDpae6-k", title: "Engineering Excellence", thumbnail: "https://img.youtube.com/vi/MpSzDpae6-k/hqdefault.jpg" },
  { id: "EY6Olw6EW4I", title: "Architectural Grandeur", thumbnail: "https://img.youtube.com/vi/EY6Olw6EW4I/hqdefault.jpg" },
  { id: "suxoAdJKwwk", title: "Structural Precision", thumbnail: "https://img.youtube.com/vi/suxoAdJKwwk/hqdefault.jpg" },
  { id: "Oy2wN-edaD4", title: "Luxury Living", thumbnail: "https://img.youtube.com/vi/Oy2wN-edaD4/hqdefault.jpg" },
  { id: "LXg9_b28Wu8", title: "Crafting Legacy", thumbnail: "https://img.youtube.com/vi/LXg9_b28Wu8/hqdefault.jpg" },
];

export const VideoMarquee = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicating videos for infinite scroll effect
  const displayVideos = [...VIDEOS, ...VIDEOS, ...VIDEOS];

  return (
    <section className="py-24 bg-charcoal overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-2 border border-gold/30 rounded-full mb-6 bg-gold/5"
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Engineering in Motion</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Cinematic Showcase</h2>
        <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed uppercase tracking-widest">
          EXPERIENCE THE ARCHITECTURAL NARRATIVE OF SRI HARI THROUGH OUR OFFICIAL PROJECT CHRONICLES.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {displayVideos.map((video, idx) => (
            <div 
              key={`${video.id}-${idx}`}
              className="inline-block px-4 w-[300px] md:w-[450px]"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl bg-black"
                onClick={() => setSelectedVideo(video)}
              >
                <Image 
                  src={video.thumbnail} 
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay - Subtle darker bottom for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500" />
                
                {/* Content Overlay - Always Visible */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="w-14 h-14 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-2xl scale-110">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-2 drop-shadow-lg">{video.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold font-black">
                      <Youtube size={14} /> Play Showcase
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)] border border-white/10">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-4 bg-white/5 hover:bg-gold text-white hover:text-charcoal rounded-full transition-all duration-300"
              >
                <X size={24} />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              <div className="absolute bottom-10 right-10 flex justify-end items-center pointer-events-none">
                <a 
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-gold text-charcoal rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform pointer-events-auto shadow-2xl shadow-gold/40"
                >
                  <ExternalLink size={18} /> Open in YouTube
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
