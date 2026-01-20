"use client";
import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, Clock, MapPin, Shield, Phone, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function OurServices() {
  const services = [
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Nationwide Doorstep Delivery",
      desc: "Express delivery across Nigeria with optimized route mapping for maximum speed.",
      tag: "Express",
      className: "md:col-span-2 lg:col-span-2 bg-slate-900 text-white",
      iconBg: "bg-red-600",
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: "E‑commerce Logistics",
      desc: "Tailored for online shops with bulk support and API integration.",
      tag: "Merchant First",
      className: "bg-white",
      iconBg: "bg-blue-600",
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Same‑Day In-City",
      desc: "Urgent urban delivery solutions for time-sensitive packages.",
      tag: "Fastest",
      className: "bg-white",
      iconBg: "bg-amber-500",
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Live GPS Tracking",
      desc: "End‑to‑end visibility with real-time map tracking and SMS alerts.",
      tag: "Precise",
      className: "md:col-span-2 bg-slate-100",
      iconBg: "bg-emerald-600",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure COD Handling",
      desc: "Safe cash collection and instant wallet settlement for peace of mind.",
      tag: "Reliable",
      className: "bg-white",
      iconBg: "bg-violet-600",
    },
    {
      icon: <Phone className="w-10 h-10" />,
      title: "24/7 Priority Support",
      desc: "Dedicated account managers always ready to help your business scale.",
      tag: "Personal",
      className: "bg-white",
      iconBg: "bg-rose-500",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-black uppercase tracking-widest mb-4"
          >
            <Zap size={14} className="fill-red-600" />
            Our Powerhouse
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Solutions for <span className="text-red-600">Modern Delivery.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`relative p-10 rounded-[40px] shadow-sm border border-slate-200/60 overflow-hidden group cursor-pointer transition-all duration-500 ${service.className}`}
    >
      {/* Decorative Gradient Overlay (Only for light cards) */}
      {!service.className.includes("slate-900") && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] group-hover:bg-red-500/10 transition-colors" />
      )}

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-[22px] ${service.iconBg} flex items-center justify-center text-white shadow-lg`}
          >
            {service.icon}
          </motion.div>
          <span className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full border ${service.className.includes("slate-900") ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"} text-slate-400 opacity-60`}>
            {service.tag}
          </span>
        </div>

        <h3 className={`text-3xl font-black mb-4 tracking-tighter leading-none ${service.className.includes("slate-900") ? "text-white" : "text-slate-900"}`}>
          {service.title}
        </h3>
        <p className={`text-lg font-medium leading-relaxed mb-8 flex-1 ${service.className.includes("slate-900") ? "text-slate-400" : "text-slate-500"}`}>
          {service.desc}
        </p>

        <div className={`flex items-center gap-2 text-sm font-black group-hover:gap-4 transition-all ${service.className.includes("slate-900") ? "text-red-500" : "text-red-600"}`}>
          Explore Service
          <ArrowRight size={18} />
        </div>
      </div>
    </motion.div>
  );
}
