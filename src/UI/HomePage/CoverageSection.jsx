"use client";
import Image from "next/image";
import Container from "../../Components/Shared/Container/Container";
import { MapPin, Package, Clock, CheckCircle2 } from "lucide-react";

export default function CoverageSection() {
    const coverageStats = [
        { icon: <MapPin className="w-6 h-6" />, label: "States Covered", value: "36+1" },
        { icon: <Package className="w-6 h-6" />, label: "Daily Deliveries", value: "5000+" },
        { icon: <Clock className="w-6 h-6" />, label: "Avg. Delivery Time", value: "24-48h" },
        { icon: <CheckCircle2 className="w-6 h-6" />, label: "Success Rate", value: "99.5%" },
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
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(220, 38, 38) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <Container>
                <div className="relative max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Nationwide{" "}
                            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
                                Coverage
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Delivering excellence across all 36 states of Nigeria. From bustling cities to remote villages,
                            we ensure your parcels reach every corner of the nation.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Map */}
                        <div className="relative">
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                {/* Map Container */}
                                <div className="relative w-full aspect-square max-w-lg mx-auto">
                                    {/* Bangladesh Map Image */}
                                    <Image
                                        src="/kano_map.png"
                                        alt="Kano State Coverage Map"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-contain opacity-90"
                                        priority
                                    />

                                    {/* City Markers */}
                                    {majorCities.map((city, index) => (
                                        <div
                                            key={index}
                                            className={`absolute ${city.position} transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10`}
                                        >
                                            {/* Pulse Animation */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                            </div>

                                            {/* Static Pin */}
                                            <div className="relative w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>

                                            {/* City Label - Shows on hover */}
                                            <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                                                    {city.name}
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Coverage Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span className="font-bold text-sm">100% Coverage</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -top-4 -left-4 w-32 h-32 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
                        </div>

                        {/* Right Side - Stats & Info */}
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {coverageStats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-3 text-red-600">
                                            {stat.icon}
                                            <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
                                        </div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feature List */}
                            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border border-red-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Network?</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Express delivery to all major cities",
                                        "Remote area coverage with local partnerships",
                                        "Real-time tracking across the entire network",
                                        "Dedicated support team in every region",
                                        "Flexible delivery options for your customers"
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-500 transform hover:-translate-y-1">
                                <span className="flex items-center justify-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>Check Coverage in Your Area</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
