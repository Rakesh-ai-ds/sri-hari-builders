"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 AuthProvider: Initializing Firebase Auth listener...");
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 AuthProvider: Auth condition changed", user ? "User logged in" : "No user");
      setUser(user);
      setLoading(false);
    });

    // Fallback: If Firebase doesn't respond in 10s, something is likely wrong with config
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn("🔒 AuthProvider: Timeout reached. Firebase Auth is not responding. Check your keys!");
        setLoading(false);
      }
    }, 10000);

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
