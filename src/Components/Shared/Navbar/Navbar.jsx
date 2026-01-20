"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Package, MapPin, Bike, Home, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/coverage", label: "Coverage", icon: <MapPin className="w-4 h-4" /> },
    { href: "/send-parcel", label: "Send Parcel", icon: <Package className="w-4 h-4" /> },
    { href: "/be-a-rider", label: "Be a Rider", icon: <Bike className="w-4 h-4" /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-rose-600 p-2 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Mk-Global Express
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Track parcel..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 focus:outline-none transition-all w-40 focus:w-56"
                />
              </div>

              {/* User Section */}
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-200">
                          <div className="font-semibold text-gray-900">{session?.user?.name || "User"}</div>
                          <div className="text-sm text-gray-600 truncate">{session?.user?.email}</div>
                        </div>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors font-medium border-b border-gray-100"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {session ? (
                    <>
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-900">{session?.user?.name}</div>
                        <div className="text-sm text-gray-600 truncate">{session?.user?.email}</div>
                      </div>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-center border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-center bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer removed */}
    </>
  );
}
