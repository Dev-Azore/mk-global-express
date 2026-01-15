"use client";

import { useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/Components/Shared/Sidebar";
import Topbar from "@/Components/Shared/Topbar";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Restore collapsed state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("dashboardSidebarCollapsed");
    if (stored) {
      setCollapsed(stored === "true");
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboardSidebarCollapsed", String(next));
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Large Screen Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 80 : 260 }}
          className="hidden md:flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-red-900 text-white h-screen sticky top-0 shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-red-900/40">
            <div className="flex items-center gap-2">
              <Link href="/" className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-red-500 text-white text-sm font-bold shadow-lg">
                MK
              </Link>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide">
                    Mk-Global Panel
                  </span>
                  <span className="text-[11px] text-gray-300/80">
                    Smart delivery dashboard
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={toggleCollapsed}
              className="text-gray-300 hover:text-white text-xl"
            >
              {collapsed ? "›" : "‹"}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar collapsed={collapsed} />
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile top bar */}
          <div className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 flex items-center justify-between px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="text-2xl text-gray-800"
              >
                <IoMdMenu />
              </button>
              <span className="font-semibold text-gray-800">Dashboard</span>
            </div>
          </div>

          {/* Desktop Topbar */}
          <div className="hidden md:block">
            <Topbar />
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>

      {/* Drawer for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-red-900 text-white shadow-2xl z-50"
            >
              <div className="flex justify-between items-center p-4 border-b border-red-900/40">
                <h1 className="text-lg font-bold">Dashboard</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-white"
                >
                  <IoMdClose />
                </button>
              </div>
              <Sidebar onClick={() => setIsOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
