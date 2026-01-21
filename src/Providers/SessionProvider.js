"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function SessionProvider({ children, session }) {
  return (
    <NextAuthSessionProvider session={session}>
      <AuthProvider>{children}</AuthProvider>
    </NextAuthSessionProvider>
  );
}
