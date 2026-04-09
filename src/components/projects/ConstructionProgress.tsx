"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

const STATIC_PROJECTS = [
  {
    id: "1",
    title: "SHB Emerald",
    description: "The pinnacle of urban luxury engineered with premium finishes.",
    imageUrl: "/projects/project1.png",
    section: "portfolio"
  },
  {
    id: "2",
    title: "Sri Hari Residency",
    description: "Contemporary living featuring open-concept layouts and city views.",
    imageUrl: "/projects/project2.png",
    section: "portfolio"
  },
  {
    id: "3",
    title: "Heritage Enclave",
    description: "Signature villas blending traditional heritage with modern engineering.",
    imageUrl: "/projects/project3.png",
    section: "portfolio"
  }
];

const STAGES = [
  { id: "portfolio", name: "Completed Projects", collection: "portfolio" },
  { id: "basement-level", name: "Basement Level", collection: "progress" },
  { id: "lintel-level", name: "Lintel Level", collection: "progress" },
  { id: "sill-level-concrete", name: "Sill Level", collection: "progress" },
  { id: "still-level-concrete", name: "Still Level", collection: "progress" },
];

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function ProgressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  
  const [activeStage, setActiveStage] = useState(categoryParam || STAGES[0].id);
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam && categoryParam !== activeStage) {
      setActiveStage(categoryParam);
    }
  }, [categoryParam]);

  const handleStageChange = (stageId: string) => {
    setActiveStage(stageId);
    router.push(`/projects?category=${stageId}`, { scroll: false });
  };

  const stageName = STAGES.find(s => s.id === activeStage)?.name || "Progress";

  useEffect(() => {
    // Only show loading if we have literally no items yet
    if (items.length === 0) setLoading(true);

    const targetStage = STAGES.find(s => s.id === activeStage);
    const colName = targetStage?.collection || "progress";
    
    // Build specialized queries: 
    // Portfolio is collection-wide; Progress is section-specific
    const q = activeStage === "portfolio"
      ? query(collection(db, colName), orderBy("createdAt", "desc"))
      : query(collection(db, colName), where("section", "==", activeStage), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firebaseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProgressItem[];

      let finalData = firebaseData;

      if (activeStage === "portfolio") {
        // Merge static projects that aren't already in Firebase
        const uniqueStatic = STATIC_PROJECTS.filter(
          sp => !firebaseData.some(fd => fd.id === sp.id || fd.title === sp.title)
        ) as ProgressItem[];
        finalData = [...firebaseData, ...uniqueStatic];
      }

      // Universal Shuffle for all categories - ensures fresh look on every load
      if (finalData.length > 0) {
        finalData = shuffleArray(finalData);
      }

      setItems(finalData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching progress:", error);
      
      // Fallback for Portfolio even on Error
      if (activeStage === "portfolio" && items.length === 0) {
        setItems(shuffleArray([...STATIC_PROJECTS]) as ProgressItem[]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeStage]);

  return (
    <div className="py-20 md:py-32 bg-charcoal text-off-white min-h-[600px]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stage Selector - Refined Mobile Experience */}
        <div className="mb-16 md:mb-24 px-4 py-2 border border-white/5 bg-white/[0.02] rounded-full backdrop-blur-sm overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center items-center gap-2 min-w-max md:min-w-0 px-2">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => handleStageChange(stage.id)}
                className={`px-6 py-2.5 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 whitespace-nowrap
                  ${activeStage === stage.id 
                    ? "bg-gold text-charcoal shadow-lg shadow-gold/20 scale-105" 
                    : "text-off-white/40 hover:text-gold"}`}
              >
                {stage.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {items.length === 0 ? (
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
                      transition: { delay: index * 0.05, duration: 0.5, ease: "easeOut" } 
                    }}
                    className="group relative"
                  >
                    {/* Refined Split-Card Architecture */}
                    <div className="flex flex-col h-[500px] md:h-[650px] overflow-hidden rounded-[40px] shadow-2xl border border-white/5 bg-white/5 group transition-all duration-700 hover:border-gold/20">
                      {/* Image Zone (60% Height) */}
                      <div className="relative h-[55%] md:h-[60%] w-full overflow-hidden">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title || "Progress Update"} 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-700" />
                      </div>
                      
                      {/* Content Zone (40% Height) - Solid & Legible */}
                      <div className="flex-1 p-8 md:p-10 bg-[#121212] relative overflow-hidden flex flex-col justify-center">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="w-4 h-[1px] bg-gold" />
                            <span className="text-gold uppercase tracking-[0.4em] text-[8px] font-bold">
                              {stageName.replace("Completed Projects", "Showcase").replace("Level", "Stage")}
                            </span>
                          </div>
                          <h3 className="text-white text-xl md:text-2xl font-serif leading-tight">
                            {item.title || "Engineering Milestone"}
                          </h3>
                          <p className="text-white/60 text-xs leading-relaxed italic line-clamp-4 md:line-clamp-6">
                            "{item.description}"
                          </p>
                        </div>
                        
                        {/* Decorative background element */}
                        <div className="absolute -right-4 -bottom-4 text-[120px] font-serif italic text-white/[0.02] pointer-events-none select-none">
                          SHB
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
}

export const ConstructionProgress = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    }>
      <ProgressContent />
    </Suspense>
  );
};
