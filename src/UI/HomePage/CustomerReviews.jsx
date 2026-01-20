"use client";
import { useState, useRef } from "react";
import Container from "../../Components/Shared/Container/Container";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, User } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Tunde Ednut",
      role: "CEO, TechBakery",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Logistics made simple.",
      rating: 5,
      desc: "Transify has completely transformed our supply chain. The real-time tracking and automated COD settlements are game-changers for any business operating in Nigeria.",
    },
    {
      id: 2,
      name: "Amaka Okafor",
      role: "Founder, Glow Up",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
      title: "Reliable and Fast!",
      rating: 5,
      desc: "I've tried several courier services, but Transify stands out for its professionalism. My customers receive their orders on time, and the support team is always helpful.",
    },
    {
      id: 3,
      name: "David Adeleke",
      role: "Operations, Sendbox",
      img: "https://randomuser.me/api/portraits/men/76.jpg",
      title: "Highly Professional",
      rating: 5,
      desc: "The integration process was seamless, and the rider network is extensive. We've seen a 30% increase in delivery success since switching to Transify's platform.",
    },
  ];

  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const next = () => setActive((prev) => (prev + 1) % reviews.length);
  const prev = () => setActive((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Headline & Controls */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
                <Quote size={14} className="fill-red-500" />
                Trusted by 10k+ Merchants
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                What Our <br />
                <span className="text-red-500 italic">Partners Say.</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium max-w-lg leading-relaxed">
                Join thousands of businesses that trust Transify for their nationwide delivery needs.
              </p>
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-14 h-14 rounded-2xl border-2 border-slate-800 flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-all group"
                >
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={next}
                  className="w-14 h-14 rounded-2xl border-2 border-slate-800 flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-all group"
                >
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="h-px w-24 bg-slate-800" />
              <div className="text-slate-500 font-bold tracking-widest text-sm">
                0{active + 1} / 0{reviews.length}
              </div>
            </div>
          </div>

          {/* Right Column: Review Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, rotateY: -30, x: 50 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 p-12 rounded-[40px] bg-slate-800/50 backdrop-blur-xl border border-slate-700 shadow-2xl"
              >
                <div className="absolute top-10 right-10 text-slate-700/50">
                  <Quote size={80} />
                </div>

                <div className="flex gap-1 mb-8">
                  {[...Array(reviews[active].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                  ))}
                </div>

                <h3 className="text-3xl font-black text-white mb-6 italic tracking-tight">
                  "{reviews[active].title}"
                </h3>

                <p className="text-lg text-slate-300 font-medium leading-relaxed mb-10">
                  {reviews[active].desc}
                </p>

                <div className="flex items-center gap-4 pt-8 border-t border-slate-700">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500 shadow-lg p-0.5">
                    <img src={reviews[active].img} alt={reviews[active].name} className="w-full h-full object-cover rounded-[14px]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">{reviews[active].name}</h4>
                    <p className="text-sm font-bold text-red-500 uppercase tracking-widest">{reviews[active].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Accent Card */}
            <div className="absolute top-10 -right-4 w-full h-full bg-red-600/20 rounded-[40px] -z-10 translate-x-4 translate-y-4" />
          </div>

        </div>
      </Container>
    </section>
  );
}
