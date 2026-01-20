"use client";
import Image from "next/image";
import Container from "../../Components/Shared/Container/Container";
import { MapPin, Package, Clock, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CoverageSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const coverageStats = [
        { icon: <Globe className="w-5 h-5" />, label: "Regions covered", value: "36+1", color: "text-red-600" },
        { icon: <Package className="w-5 h-5" />, label: "Packages/Day", value: "50K+", color: "text-rose-600" },
        { icon: <Clock className="w-5 h-5" />, label: "Delivery Time", value: "24h", color: "text-slate-900" },
        { icon: <ShieldCheck className="w-5 h-5" />, label: "Safety Rate", value: "99.9%", color: "text-red-700" },
    ];

    const majorCities = [
        { name: "Kano", position: "top-[20%] left-[45%]" },
        { name: "Lagos", position: "bottom-[20%] left-[15%]" },
        { name: "Abuja", position: "top-[45%] left-[45%]" },
        { name: "Port Harcourt", position: "bottom-[15%] left-[45%]" },
        { name: "Kaduna", position: "top-[30%] left-[40%]" },
        { name: "Ibadan", position: "bottom-[25%] left-[15%]" },
        { name: "Maiduguri", position: "top-[15%] right-[15%]" },
        { name: "Sokoto", position: "top-[10%] left-[15%]" },
    ];

    return (
        <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dotGrid)" />
                </svg>
            </div>

            <Container>
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Text and Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest"
                            >
                                <Globe size={14} />
                                Nationwide reach
                            </motion.div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                                Excellence Across <br />
                                <span className="text-red-600">Every Corner.</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                From the bustling streets of Lagos to the heartbeat of Kano, our logistics network provides 100% coverage across Nigeria.
                            </p>
                        </div>

                        {/* Stats mini-grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {coverageStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors group"
                                >
                                    <div className={`${stat.color} mb-3 transition-transform group-hover:scale-110`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/track" className="inline-block w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:bg-slate-800 transition-all"
                            >
                                <MapPin size={20} className="text-red-500" />
                                Check Your Area
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Right Side: Interactive Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Map Container with Glassmorphism */}
                        <div className="relative z-10 bg-white rounded-[40px] p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/kano_map.png"
                                    alt="Coverage Map"
                                    fill
                                    className="object-contain opacity-20 grayscale"
                                />

                                {/* Pulse Effect in Center */}
                                <div className="absolute inset-0 flex items-center justify-center -z-0">
                                    <div className="w-[60%] h-[60%] bg-red-600/5 rounded-full animate-ping duration-3000" />
                                </div>

                                {/* Animated Markers */}
                                {majorCities.map((city, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                                        className={`absolute ${city.position} group cursor-pointer z-10`}
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute w-6 h-6 bg-red-600/20 rounded-full animate-ping" />
                                            <div className="relative w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg group-hover:scale-150 transition-transform" />
                                        </div>

                                        {/* City Name Reveal */}
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl uppercase tracking-widest">
                                                {city.name}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/5 rounded-full blur-[80px] -z-0" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -z-0" />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}

// Internal Link component helper since we don't have it imported above
function Link({ href, children, className }) {
    return <a href={href} className={className}>{children}</a>;
}
