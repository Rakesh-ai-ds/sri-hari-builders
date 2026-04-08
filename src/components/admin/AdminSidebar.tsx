"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  BarChart3, 
  Layers, 
  LayoutDashboard, 
  LogOut, 
  Package, 
  Settings, 
  Image as ImageIcon 
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { name: "Portfolio Showcase", icon: <ImageIcon size={18} />, query: "portfolio", isMain: true },
  { name: "Construction Updates", icon: <Layers size={18} />, query: "basement-level", isMain: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section") || "basement-level";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside className={`w-72 bg-charcoal text-off-white flex flex-col h-screen fixed lg:sticky top-0 left-0 border-r border-white/5 z-50 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-8 border-b border-white/5 relative">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
              <LayoutDashboard className="text-charcoal" size={20} />
            </div>
            <div>
              <span className="text-lg font-serif font-bold text-white uppercase block">Admin</span>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">SHB Control</span>
            </div>
          </Link>
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <ImageIcon size={20} className="rotate-45" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6 ml-4">Universal Control</div>
          <Link 
            href="/admin/dashboard"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
              pathname === "/admin/dashboard"
                ? "bg-gold text-charcoal font-bold"
                : "hover:bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            <span className={pathname === "/admin/dashboard" ? "text-inherit" : "text-gold group-hover:scale-110 transition-transform"}>
              <LayoutDashboard size={18} />
            </span>
            <span className="text-xs uppercase tracking-widest">Master Hub</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="text-xs uppercase tracking-widest font-bold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
