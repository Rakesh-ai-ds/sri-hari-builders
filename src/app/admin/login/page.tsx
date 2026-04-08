"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center p-6">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl overflow-hidden relative">
        {/* Construction Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
        
        <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-8 mx-auto">
          <Lock className="text-gold" size={32} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-charcoal mb-2">Admin Access</h1>
          <p className="text-charcoal/60 text-sm uppercase tracking-widest font-bold">Sri Hari Builders</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block" htmlFor="email">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={18} />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-gold transition-colors"
                placeholder="admin@sriharibuilders.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal/40 uppercase tracking-widest block" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={18} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal/5 border border-charcoal/10 rounded-xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign Into Dashboard"}
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] text-charcoal/30 uppercase tracking-[0.2em] font-bold">
          Confidential Access • authorized personnel only
        </p>
      </div>
    </main>
  );
}
