"use client";
import { useState } from "react";
import Image from "next/image";
// import ApplyRidere from "@/assets/apply-rider.png";
import { User, Mail, Phone, Calendar, MapPin, CheckCircle, DollarSign, Clock, Shield, ChevronRight, Star } from "lucide-react";
import axiosInstance from "@/Lib/axiosInstance.js";
import toast, { Toaster } from "react-hot-toast";
import Container from "../../../Components/Shared/Container/Container.jsx";
import { motion } from "framer-motion";

export default function BeARider() {
  const states = {
    "Kano State": [
      "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta",
      "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko",
      "Garun Mallam", "Gaya", "Gezawa", "Ghari", "Gwale", "Gwarzo", "Kabo",
      "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura",
      "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo",
      "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada",
      "Ungogo", "Warawa", "Wudil"
    ],
  };

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    contact: "",
    state: "",
    lga: "",
  });

  const [lgas, setLgas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData({ ...formData, state, lga: "" });
    setLgas(states[state] || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/apply-riders", formData);

      if (res.data.success) {
        toast.success("✅ Application submitted successfully!");
        setFormData({
          name: "",
          age: "",
          email: "",
          contact: "",
          state: "",
          lga: "",
        });
        setLgas([]);
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-red-600" />,
      title: "Competitive Earnings",
      desc: "Earn competitive rates per delivery with weekly payouts and performance bonuses.",
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: "Flexible Schedule",
      desc: "Choose your own hours. Work full-time, part-time, or just on weekends.",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Insurance Coverage",
      desc: "Get accident insurance coverage while you are on the job for peace of mind.",
    },
  ];

  const steps = [
    { number: "01", title: "Apply Online", desc: "Fill out the simple application form below." },
    { number: "02", title: "Screening", desc: "We review your details and contact you." },
    { number: "03", title: "Training", desc: "Attend a short training session." },
    { number: "04", title: "Start Earning", desc: "Get your kit and start delivering!" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <section className="relative bg-white text-gray-900 py-20 overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="md:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <Image
                  src="/rider-hero-user.png"
                  alt="Delivery Rider"
                  width={600}
                  height={600}
                  className="object-contain"
                />
              </motion.div>
            </div>

            <div className="md:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-red-100 border border-red-200 text-red-600 text-sm font-semibold mb-4">
                  Join Our Fleet
                </span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                  Drive Your Way to <br />
                  <span className="text-red-600">
                    Financial Freedom
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  Become a Mk-Global Express rider partner today. Enjoy flexible hours, great earnings, and be part of the fastest-growing logistics network in Nigeria.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#apply-form" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-1">
                  Apply Now
                </a>
                <div className="flex items-center gap-2 px-6 py-4 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">500+ Riders Joined</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Ride with Mk-Global?</h2>
            <p className="text-gray-600">We care about our riders. That's why we offer the best benefits in the industry to help you succeed.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple Steps to Start</h2>
              <p className="text-gray-600 mb-10">Getting started is easy. Just follow these simple steps and you'll be on the road in no time.</p>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full "></div>

              <div className="relative z-10">
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Weekly Earnings</div>
                      <div className="text-2xl font-bold text-gray-900">₦ 12,500</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-[75%]"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Completed Deliveries</div>
                      <div className="text-2xl font-bold text-gray-900">142</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>This Week</span>
                    <span className="text-red-500 font-medium">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 bg-gray-50">
        <Container>
          <div className="mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Join the Team</h3>
                  <p className="text-slate-300 mb-8">Fill out the form to start your application process. It takes less than 2 minutes.</p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-red-500" />
                      <span>Quick Approval</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-red-500" />
                      <span>Training Provided</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <CheckCircle size={18} className="text-red-500" />
                      <span>Welcome Bonus</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-10">
                  <div className="text-sm text-slate-400">Questions? Call us</div>
                  <div className="text-xl font-bold text-white">+234 704 305 1284</div>
                </div>
              </div>

              <div className="md:col-span-3 p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="25"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="070..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleStateChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white appearance-none"
                          required
                        >
                          <option value="">Select State</option>
                          {Object.keys(states).map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">LGA</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="lga"
                          value={formData.lga}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white appearance-none"
                          required
                          disabled={!lgas.length}
                        >
                          <option value="">Select LGA</option>
                          {lgas.map((lga) => (
                            <option key={lga} value={lga}>{lga}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-1 mt-4"
                  >
                    {loading ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
