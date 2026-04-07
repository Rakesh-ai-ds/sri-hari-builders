import { Navbar } from "@/components/ui/Navbar";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";

export default function ProjectsPage() {
  return (
    <main className="bg-charcoal min-h-screen pt-20">
      <Navbar />
      <div className="py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Our <span className="text-gold italic">Portfolio</span></h1>
        <p className="text-off-white/90 max-w-2xl mx-auto uppercase tracking-widest text-sm">A legacy of excellence built over three decades.</p>
      </div>
      <ProjectShowcase />
    </main>
  );
}
