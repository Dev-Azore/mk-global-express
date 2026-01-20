"use client";
import { useState, useRef } from "react";
import Container from "../../Components/Shared/Container/Container";
import { motion, useInView } from "framer-motion";
import { Send, Mail, BellRing, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import axiosInstance from "../../Lib/axiosInstance.js";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/newsletter", { email });
      if (res.data?.success) {
        setMessage("Success! You're now on the list.");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please check your email.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Micro-patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="cross" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 30 30 M 30 10 L 10 30" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cross)" />
        </svg>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-slate-900 rounded-[50px] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(220,38,38,0.2)] overflow-hidden"
        >
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-red-600/20 via-transparent to-blue-600/10 blur-[100px] -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content */}
            <div className="space-y-8 relative z-10 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest"
              >
                <Zap size={14} className="fill-red-500" />
                Insider Updates
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                  GET THE <br />
                  <span className="text-red-500 italic">LOGISTICS EDGE.</span>
                </h2>
                <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
                  Stay ahead with weekly insights on delivery efficiency, promo codes, and expansion news. No spam, just pure value.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-500" />
                  <span className="text-sm font-bold tracking-tight">Verified Secure</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-blue-500" />
                  <span className="text-sm font-bold tracking-tight">Weekly Digest</span>
                </div>
              </div>
            </div>

            {/* Right: Modern Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl"
            >
              <form onSubmit={handleSubscribe} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-500 transition-colors">
                    <Mail size={22} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-3xl py-6 pl-16 pr-6 text-white text-lg font-bold placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 rounded-3xl bg-red-600 hover:bg-red-700 text-white font-black text-xl shadow-2xl shadow-red-500/30 transition-all flex items-center justify-center gap-3 active:scale-95 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? "Processing..." : "Join the Waitlist"}
                    {!loading && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />}
                  </span>
                </motion.button>
              </form>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 text-center text-sm font-bold px-4 py-3 rounded-2xl ${message.includes("Success")
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                >
                  {message}
                </motion.div>
              )}

              <p className="text-[10px] text-center text-slate-600 font-black uppercase tracking-[0.2em] mt-8">
                Your privacy is our priority.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
