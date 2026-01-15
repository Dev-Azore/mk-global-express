"use client";
import { Package, ArrowRight, MapPin, Clock, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Container from "../../Components/Shared/Container/Container";

export default function CourierHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
      <Container className="min-h-screen flex items-start py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full">

          {/* Left Column - Hero Content */}
          <div className="relative z-10">
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  <span className="block text-gray-900 mb-3">
                    Premium
                  </span>
                  <span className="block bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
                    Courier
                  </span>
                  <span className="block text-gray-800 mt-3">
                    Experience
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-xl">
                  Swift, secure, and seamless delivery solutions tailored for modern Nigeria.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="group relative bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 rounded-xl text-white font-semibold text-base shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-500 transform hover:-translate-y-1">
                  <span className="flex items-center justify-center gap-2">
                    <span>Book Your Delivery</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>

                <button className="group backdrop-blur-xl bg-white/70 border-2 border-gray-300 hover:border-red-400 px-6 py-2.5 rounded-xl text-gray-900 font-semibold text-base hover:bg-white shadow-lg hover:shadow-xl transition-all duration-500">
                  <span className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span>Track Parcel</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Bangladesh Map */}
          <div className="relative flex items-center justify-center h-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/kano_map.png"
                alt="Kano State Map"
                width={350}
                height={350}
                className="w-full h-auto max-w-sm object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </Container>

      {/* Minimal Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600"></div>
    </section>
  );
}