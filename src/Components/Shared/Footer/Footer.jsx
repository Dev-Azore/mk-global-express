"use client";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Mail, CreditCard, DollarSign, Smartphone, MapPin, Phone } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import Container from "@/Components/Shared/Container/Container";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-slate-900 dark:bg-gray-950 border-t border-red-500/20 pt-16 mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <Container>
        <footer className="relative transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand & Description */}
            <div className="space-y-6 md:col-span-2">
              <h2 className="text-4xl font-extrabold text-red-500">
                Mk-Global Express Logistics
              </h2>
              <p className="text-base text-gray-300 dark:text-gray-400 leading-relaxed">
                Fast, secure, and reliable courier services. Delivering parcels
                with care worldwide. Experience the future of logistics with our cutting-edge technology.
              </p>
              <div className="text-gray-300 dark:text-gray-400 space-y-2">
                <p className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> Rano, Headquarters, Kano State, Nigeria.</p>
                <p className="flex items-center gap-2"><Phone size={16} className="text-red-500" /> +2347043051284</p>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                  />
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Mail size={18} />
                  </button>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, color: 'hover:bg-blue-600' },
                  { Icon: Twitter, color: 'hover:bg-sky-500' },
                  { Icon: Instagram, color: 'hover:bg-pink-600' },
                  { Icon: Linkedin, color: 'hover:bg-blue-700' }
                ].map(({ Icon, color }, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 shadow-lg hover:shadow-xl hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${color}`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                Company
              </h3>
              <ul className="space-y-3">
                {["About Us", "Services", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                Legal
              </h3>
              <ul className="space-y-3">
                {["Terms & Conditions", "Privacy Policy"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item === "Terms & Conditions" ? "terms" : "privacy"}`}
                      className="text-gray-300 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                We Accept
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Visa",
                    icon: FaCcVisa,
                    bg: "bg-blue-600",
                    text: "Visa"
                  },
                  {
                    name: "Mastercard",
                    icon: FaCcMastercard,
                    bg: "bg-red-600",
                    text: "Mastercard"
                  },
                  {
                    name: "PayPal",
                    icon: FaCcPaypal,
                    bg: "bg-blue-500",
                    text: "PayPal"
                  },
                  {
                    name: "bKash",
                    icon: Smartphone,
                    bg: "bg-pink-600",
                    text: "bKash"
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className={`relative ${payment.bg} p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-16 flex items-center justify-center hover:scale-105 cursor-pointer`}
                  >
                    <payment.icon className="h-8 w-8 text-white" />
                    <span className="text-sm text-white font-semibold ml-2">{payment.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-red-500/20 py-6">
            <Container>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-300 dark:text-gray-400 text-center md:text-left">
                  © {new Date().getFullYear()} <span className="font-semibold text-white">Mk-Global Express Logistics</span>. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-gray-400 dark:text-gray-500">
                  <a href="#" className="hover:text-red-400 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-red-400 transition-colors">Terms</a>
                  <a href="#" className="hover:text-red-400 transition-colors">Sitemap</a>
                </div>
                {/* Back to Top Button */}
                <button
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 p-3 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-50"
                  aria-label="Back to top"
                >
                  <ArrowUp size={20} />
                </button>
              </div>
            </Container>
          </div>
        </footer>
      </Container>
    </div>
  );
}
