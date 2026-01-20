"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, initialized, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !loading && !user) {
      router.push("/login");
    }
  }, [user, initialized, loading, router]);

  if (loading || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  // Check if user has required role (case-insensitive)
  const userRole = user.role?.toUpperCase();
  const isAuthorized = allowedRoles?.some(role => role.toUpperCase() === userRole);

  if (allowedRoles && !isAuthorized) {
    // Optionally redirect unauthorized users to their own dashboard
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return <>{children}</>;
}





