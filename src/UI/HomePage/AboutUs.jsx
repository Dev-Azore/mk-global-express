"use client";
import Lottie from "lottie-react";
import deliveryMap from "../../assets/delivery-map.json";
import { HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import Container from "../../Components/Shared/Container/Container";

export default function AboutUsSection() {
  return (
    <section className="relative bg-white py-10">
      <Container>
        <div className="mx-auto grid lg:grid-cols-2 items-center px-6">
          {/* LEFT SIDE (LOTTIE) -  */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <Lottie
              animationData={deliveryMap}
              loop={true}
              className="w-full h-full"
            />
          </div>

          {/* RIGHT SIDE (TEXT) - show first on mobile */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Built for{" "}
              <span className="text-red-600">Nigerian Businesses</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              We help online and offline businesses deliver parcels to customers
              in every state of Nigeria. With a nationwide rider network,
              smart routing and a merchant‑first mindset, we focus on keeping
              your customers happy and your operations smooth.
            </p>

            {/* FEATURES */}
            <div className="flex justify-between pt-4">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-7 h-7 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Trusted & Secure
                  </h4>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Truck className="w-7 h-7 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Nationwide Delivery
                  </h4>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HeartHandshake className="w-7 h-7 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Merchant & Customer First
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
