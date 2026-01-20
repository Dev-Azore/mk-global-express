"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "../../Components/Shared/Container/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bike, DollarSign, Calendar, Zap, ArrowRight, Star, User } from "lucide-react";

export default function BecomeDeliveryMan() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      title: "Flexible Shifts",
      desc: "Work when it fits your schedule.",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Weekly Payouts",
      desc: "Fast, transparent earnings.",
      icon: <DollarSign className="w-5 h-5 transition-transform group-hover:scale-125" />,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-slate-900 rounded-[50px] overflow-hidden shadow-2xl"
        >
          {/* Decorative Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="md:w-3/5 p-10 md:p-20 space-y-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest"
              >
                <Zap size={14} className="fill-red-500" />
                Join the Elite Network
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                  BECOME A <br />
                  <span className="text-red-600 italic">RIDER PARTNER.</span>
                </h2>
                <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed">
                  Join the fastest-growing delivery network in Nigeria. Enjoy flexible hours, competitive earnings, and a professional support ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">{b.title}</h4>
                      <p className="text-sm text-slate-500 font-bold">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/be-a-rider">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-red-500/30 hover:bg-red-700 transition-all text-lg group"
                  >
                    Apply Now
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <div className="flex items-center gap-2 px-4 text-slate-500">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                        <User className="w-full h-full p-1 opacity-50" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">+2.5k riders</span>
                </div>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="md:w-2/5 relative h-full self-stretch min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-l from-slate-900/50 to-transparent z-10 pointer-events-none" />
              <Image
                src="/rider-hero.png"
                alt="Delivery Rider"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 z-20 glass-effect p-6 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white">
                    <Star size={20} className="fill-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Avg. Rating</div>
                    <div className="text-sm font-bold text-slate-900 italic">4.9 / 5.0</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}