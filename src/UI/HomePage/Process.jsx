"use client";
import Container from "../../Components/Shared/Container/Container";
import { Truck, Package, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Create Order",
      desc: "Place orders individually or in bulk with our smart dashboard.",
      color: "bg-blue-500",
      accent: "text-blue-500"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Swift Pickup",
      desc: "Our riders collect parcels from your location within hours.",
      color: "bg-red-500",
      accent: "text-red-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Real-time Transit",
      desc: "Watch your parcel move across Nigeria with live GPS tracking.",
      color: "bg-amber-500",
      accent: "text-amber-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "On-time Delivery",
      desc: "Successful doorstep delivery with instant COD settlement.",
      color: "bg-green-500",
      accent: "text-green-500"
    },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10 hidden md:block" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            How Your <span className="text-red-600 italic">Parcels Move.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-slate-500 font-medium"
          >
            A transparent, automated journey from your doorstep to the customer's hands.
          </motion.p>
        </div>

        <div className="relative">
          {/* Progress Path Animation (Mobile: Vertical, Desktop: Horizontal) */}
          <div className="absolute top-0 left-[2.25rem] md:left-0 md:top-12 w-1 h-full md:w-full md:h-1 bg-slate-50 -z-0">
            <motion.div
              style={{ scaleY: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
              className="absolute top-0 left-0 w-full h-full bg-red-500 origin-top md:hidden"
            />
            <motion.div
              style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [0, 1]) }}
              className="absolute top-0 left-0 w-full h-full bg-red-500 origin-left hidden md:block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="flex md:flex-col items-center md:items-start gap-6 md:gap-8">
        {/* Animated Icon Circle */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`relative z-10 w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-xl shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300`}
        >
          {step.icon}
          {/* Step Number Badge */}
          <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-slate-900 border-2 border-white text-[10px] font-black flex items-center justify-center">
            0{index + 1}
          </div>
        </motion.div>

        <div className="flex-1 text-left">
          <h3 className={`text-2xl font-black text-slate-800 mb-3 group-hover:${step.accent} transition-colors uppercase tracking-tight`}>
            {step.title}
          </h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>

      {/* Connective Arrow (Desktop) */}
      {index < 3 && (
        <div className="absolute top-12 right-0 translate-x-1/2 text-slate-200 hidden md:block">
          <ArrowRight size={24} className="animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}
