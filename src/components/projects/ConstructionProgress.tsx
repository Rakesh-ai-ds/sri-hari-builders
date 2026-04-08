"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Loader2, Construction, Calendar, CheckCircle2 } from "lucide-react";

interface ProgressItem {
  id: string;
  title?: string;
  description: string;
  imageUrl: string;
  section: string;
  createdAt: any;
}

const STAGES = [
  { id: "basement-level", name: "Basement Level" },
  { id: "lintel-level", name: "Lintel Level" },
  { id: "sill-level-concrete", name: "Sill Level" },
  { id: "still-level-concrete", name: "Still Level" },
];

export const ConstructionProgress = () => {
  const [activeStage, setActiveStage] = useState(STAGES[0].id);
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  const stageName = STAGES.find(s => s.id === activeStage)?.name || "Progress";

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "progress"),
      where("section", "==", activeStage),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProgressItem[];
      setItems(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching progress:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeStage]);

  return (
    <div className="py-20 md:py-32 bg-charcoal text-off-white min-h-[600px]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stage Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 border
                ${activeStage === stage.id 
                  ? "bg-gold text-charcoal border-gold shadow-lg shadow-gold/20 scale-105" 
                  : "bg-white/5 text-off-white/40 border-white/5 hover:border-gold/30 hover:text-gold"}`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <Loader2 className="animate-spin text-gold" size={48} />
                <span className="text-xs uppercase tracking-[0.3em] text-gold/60 font-serif italic">Accessing Live Data</span>
              </motion.div>
            ) : items.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white/5 rounded-[40px] border border-white/10"
              >
                <Construction className="mx-auto text-gold/20 mb-6" size={64} />
                <h3 className="text-2xl font-serif text-white/40 italic">Updates arriving soon</h3>
                <p className="text-xs uppercase tracking-widest text-white/20 mt-4">This stage is in the final stages of engineering preparation</p>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.8, ease: "easeOut" } 
                    }}
                    className="group relative"
                  >
                    {/* Project-style Card Layout */}
                    <div className="relative h-[550px] md:h-[650px] overflow-hidden rounded-[32px] md:rounded-[40px] shadow-2xl border border-white/5 bg-white/5">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title || "Progress Update"} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      
                      {/* Dark Overlay for Text Visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80" />
                      
                      {/* Luxury Content Overlay */}
                      <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] transform transition-all duration-700 ease-out">
                        <div className="flex flex-col gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="w-6 h-[1px] bg-gold" />
                              <span className="text-gold uppercase tracking-[0.4em] text-[8px] font-bold">
                                {stageName.replace("Progress", "")}
                              </span>
                            </div>
                            <h3 className="text-white text-lg md:text-2xl font-serif leading-tight mb-1">
                              {item.title || "Engineering Update"}
                            </h3>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                              {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              }) : "Syncing..."}
                            </p>
                          </div>

                          <p className="text-white/70 text-xs leading-relaxed italic line-clamp-1">
                            "{item.description}"
                          </p>

                          {/* Specifications - Matching Portfolio Design */}
                          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[7px] uppercase tracking-widest text-white/30 mb-1 font-bold">Milestone</p>
                              <p className="text-gold text-[10px] font-serif uppercase tracking-wider">{stageName.split(" ")[0]}</p>
                            </div>
                            <div>
                              <p className="text-[7px] uppercase tracking-widest text-white/30 mb-1 font-bold">Verification</p>
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
                                <p className="text-white text-[8px] uppercase tracking-widest font-bold">SHB Official</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
