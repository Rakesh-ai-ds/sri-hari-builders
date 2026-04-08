"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  { name: "Basement Level", icon: <Layers size={18} />, query: "basement" },
  { name: "Lintel Level", icon: <Package size={18} />, query: "lintel" },
  { name: "Sill Level Concrete", icon: <BarChart3 size={18} />, query: "sill" },
  { name: "Still Level Concrete", icon: <BarChart3 size={18} />, query: "still" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

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
    <aside className="w-72 bg-charcoal text-off-white flex flex-col h-screen sticky top-0 border-r border-white/5">
      <div className="p-8 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-charcoal" size={20} />
          </div>
          <div>
            <span className="text-lg font-serif font-bold text-white uppercase block">Admin</span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">SHB Control</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6 ml-4">Construction Stages</div>
        {navItems.map((item) => (
          <Link 
            key={item.query}
            href={`/admin/dashboard?section=${item.query}`}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
              pathname === "/admin/dashboard" && (new URLSearchParams(window.location.search)).get("section") === item.query
                ? "bg-gold text-charcoal font-bold"
                : "hover:bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            <span className={pathname === "/admin/dashboard" ? "text-inherit" : "text-gold group-hover:scale-110 transition-transform"}>
              {item.icon}
            </span>
            <span className="text-xs uppercase tracking-widest">{item.name}</span>
          </Link>
        ))}
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
  );
};
