"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, MapPin, Calendar, Ruler, Award } from "lucide-react";

const projectsData = {
  "1": {
    title: "SHB Emerald",
    category: "Luxury Apartments",
    image: "/projects/project1.jpg",
    location: "Saravanampatti, Coimbatore",
    description: "Experience the pinnacle of urban luxury at SHB Emerald. These residences are meticulously engineered with premium ventilation, high-end marble finishes, and state-of-the-art security systems. Designed for the discerning family that values both privacy and community.",
    details: {
      area: "1,850 - 2,400 Sq. Ft.",
      completed: "2023",
      duration: "18 Months",
      type: "Residential",
    }
  },
  "2": {
    title: "Sri Hari Residency",
    category: "Modern Living",
    image: "/projects/project2.png",
    location: "Ramanathapuram, Coimbatore",
    description: "Sri Hari Residency stands as a testament to contemporary living. Featuring open-concept layouts and large balconies with city views, this project focuses on maximizing space and natural light. It's not just an apartment; it's a statement of lifestyle.",
    details: {
      area: "1,400 - 1,950 Sq. Ft.",
      completed: "2022",
      duration: "14 Months",
      type: "Residential",
    }
  },
  "3": {
    title: "Heritage Enclave",
    category: "Premium Villa",
    image: "/projects/project3.png",
    location: "Gandhipuram, Coimbatore",
    description: "An exclusive collection of signature villas that blend traditional Tamil heritage with modern engineering. Heritage Enclave offers absolute privacy, private landscaped gardens, and premium sustainable materials that gain character with time.",
    details: {
      area: "3,500 - 4,800 Sq. Ft.",
      completed: "2024",
      duration: "24 Months",
      type: "Residential / Villa",
    }
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <main className="bg-charcoal min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-8">Project Not Found</h1>
        <Link href="/projects" className="text-gold flex items-center gap-2 hover:underline">
          <ChevronLeft size={20} /> Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-charcoal min-h-screen text-off-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-6 md:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/projects" className="text-gold text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity">
              <ChevronLeft size={16} /> Back to Collection
            </Link>
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif leading-none mb-6">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 text-off-white/60 uppercase tracking-widest text-xs">
              <MapPin size={14} className="text-gold" />
              {project.location}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif text-white mb-8">About the Project</h2>
            <p className="text-off-white text-lg leading-relaxed mb-12 italic">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
              <div className="p-10 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-sm">
                 <h3 className="text-xl font-serif text-white mb-6">Our Approach</h3>
                 <p className="text-sm text-off-white/40 leading-relaxed">
                   Every detail of this project was meticulously planned and executed by our specialized team of engineers and designers. From soil testing to final interior finishes, we ensured the highest standards of engineering excellence.
                 </p>
              </div>
              <div className="p-10 border border-gold/10 bg-gold/5 rounded-3xl backdrop-blur-sm">
                 <h3 className="text-xl font-serif text-white mb-6">Awards & Recognition</h3>
                 <div className="flex items-center gap-4">
                   <Award className="text-gold w-10 h-10" />
                   <div>
                     <p className="text-white font-bold text-sm uppercase">Luxury Design 2023</p>
                     <p className="text-off-white/40 text-[10px] uppercase">Architectural Excellence Award</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 p-10 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-md">
              <h3 className="text-xl font-serif text-white mb-10 border-b border-white/10 pb-6 uppercase tracking-widest text-sm">Specifications</h3>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-off-white/40 text-[10px] uppercase tracking-widest font-bold">Total Area</span>
                  <span className="text-gold font-serif">{project.details.area}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-off-white/40 text-[10px] uppercase tracking-widest font-bold">Completion</span>
                  <span className="text-gold font-serif">{project.details.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-off-white/40 text-[10px] uppercase tracking-widest font-bold">Duration</span>
                  <span className="text-gold font-serif">{project.details.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-off-white/40 text-[10px] uppercase tracking-widest font-bold">Category</span>
                  <span className="text-gold font-serif">{project.details.type}</span>
                </div>
              </div>

              <Link href="/contact" className="mt-12 block w-full py-4 bg-gold text-charcoal text-center text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
