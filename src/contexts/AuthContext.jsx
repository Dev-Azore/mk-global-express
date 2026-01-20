"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  // Derive user state from NextAuth session
  const user = useMemo(() => {
    if (status === "authenticated" && session?.user) {
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role || "USER",
        username: session.user.username,
      };
    }
    return null;
  }, [session, status]);

  // Derived loading state
  const isAuthLoading = status === "loading" || loading;

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const value = {
    user,
    token: null, // Tokens are now handled via secure browser cookies via NextAuth
    loading: isAuthLoading,
    initialized: status !== "loading",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}





