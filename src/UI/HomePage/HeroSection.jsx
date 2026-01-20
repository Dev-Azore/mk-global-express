"use client";
import { ArrowRight, MapPin, Package, Shield, Truck, Zap, Globe, Clock } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../../Components/Shared/Container/Container";
import Link from "next/link";
import { useRef } from "react";

export default function CourierHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden mesh-bg pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[100px]"
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100/50 border border-red-200 text-red-700 text-sm font-bold backdrop-blur-sm"
              >
                <Zap className="w-4 h-4 fill-red-600" />
                <span>Next-Gen Logistics Platform</span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-gray-900">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  RELIABLE
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="block bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent italic"
                >
                  LOGISTICS
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="block text-slate-800"
                >
                  SIMPLIFIED.
                </motion.span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                Empowering businesses across Nigeria with smart, secure, and lightning-fast delivery solutions. Experience world-class precision from pick-up to doorstep.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:bg-red-700 transition-all group"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/login?callbackUrl=/dashboard/user/track">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/50 backdrop-blur-md border-2 border-slate-200 text-slate-900 rounded-2xl font-bold flex items-center gap-2 hover:border-red-600/50 transition-all"
                >
                  <MapPin className="w-5 h-5 text-red-600" />
                  Track Parcel
                </motion.button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <Shield size={18} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <Globe size={18} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Reach</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <Clock size={18} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">24/7 Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column content */}
          <div className="relative">
            {/* Main Interactive Floating Container */}
            <motion.div
              style={{ y: y2 }}
              className="relative z-10 w-full max-w-[500px] mx-auto"
            >
              <motion.div
                initial={{ rotateY: -20, rotateX: 10, y: 50, opacity: 0 }}
                animate={{ rotateY: 0, rotateX: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ rotateY: 5, rotateX: -5 }}
                className="relative rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[8px] border-white bg-slate-100 animate-float"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/IMG-20251111-WA0010.png"
                    alt="Premium Logistics"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                  {/* Subtle Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>

              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 z-20 glass-effect p-6 rounded-3xl shadow-2xl border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg">
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status</div>
                    <div className="text-sm font-bold text-slate-900 italic">In Transit...</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-10 z-20 glass-effect p-6 rounded-3xl shadow-2xl border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Package size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Order ID</div>
                    <div className="text-sm font-bold text-slate-900 italic">#TR-839210</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decoration */}
            <motion.div
              style={{ y: y1 }}
              className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[80px] -z-10"
            />
          </div>

        </div>
      </Container>

      {/* Hero Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}