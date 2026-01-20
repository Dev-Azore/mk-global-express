"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Container from "../../Components/Shared/Container/Container";
import { TrendingUp, Users, Package, Map } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      label: "States Covered",
      value: 37,
      suffix: "+",
      icon: <Map className="w-5 h-5" />,
      color: "bg-red-500"
    },
    {
      label: "LGAs Served",
      value: 774,
      suffix: "+",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-rose-500"
    },
    {
      label: "Parcels / Day",
      value: 50,
      suffix: "K+",
      icon: <Package className="w-5 h-5" />,
      color: "bg-red-600"
    },
    {
      label: "Merchants Trust Us",
      value: 10,
      suffix: "K+",
      icon: <Users className="w-5 h-5" />,
      color: "bg-slate-900"
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = item.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, item.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group p-8 rounded-[32px] bg-white border border-slate-200 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg shadow-red-500/20 mb-2`}>
          {item.icon}
        </div>
        <div>
          <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
            {count}
            <span className="text-red-600 ml-1">{item.suffix}</span>
          </h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
            {item.label}
          </p>
        </div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
      </div>
    </motion.div>
  );
}
