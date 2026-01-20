"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SecurityControlLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/security-control/login");
            return;
        }

        // Verify admin/merchant role
        if (session.user?.role !== "ADMIN" && session.user?.role !== "MERCHANT") {
            router.push("/");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "MERCHANT")) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Admin Header */}
            <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Security Control Panel</h1>
                            <p className="text-xs text-white/80">Administrator Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">{session.user?.email}</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                            {session.user?.role}
                        </span>
                    </div>
                </div>
            </header>

            {children}
        </div>
    );
}
