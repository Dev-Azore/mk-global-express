"use client";
import { useEffect, useRef, useState } from "react";
import Container from "../../Components/Shared/Container/Container";

export default function StatsSection() {
  const stats = [
    { label: "States Covered", value: 37, suffix: "+" },
    { label: "LGAs Served", value: 774, suffix: "+" },
    { label: "Parcels Delivered / Day", value: 50, suffix: "K+" },
    { label: "Merchants Trust Us", value: 10, suffix: "K+" },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 border-y border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item, index) => (
            <StatCard
              key={item.label}
              item={item}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({ item, isVisible, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = item.value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= item.value) {
          setCount(item.value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, item.value, delay]);

  return (
    <div className="text-center rounded-2xl bg-white border border-gray-200 px-4 py-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
        {count}
        {count === item.value && <span className="text-red-600">{item.suffix}</span>}
      </p>
      <p className="mt-2 text-xs md:text-sm font-medium text-gray-600">
        {item.label}
      </p>
    </div>
  );
}
