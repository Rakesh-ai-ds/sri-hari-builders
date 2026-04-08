"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, Menu, LayoutDashboard } from "lucide-react";
import { Toaster } from "react-hot-toast";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-off-white/80">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-charcoal border-b border-white/5 flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-charcoal" size={20} />
          </div>
          <span className="text-lg font-serif font-bold text-white uppercase">Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gold hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 p-6 md:p-12 mt-20 lg:mt-0 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
