"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function SectionTwo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-br from-[#E6F0FF] via-white to-[#E0F7EB] py-10 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       
          <div className="order-1 lg:order-2 space-y-6">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-[#0E76CD] font-semibold text-sm uppercase tracking-wide mb-4">
                About Us
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0E76CD] leading-tight mb-6">
                Dental Clinic in Jaipur
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-justify mb-8">
                Looking for the best dental clinic in Jaipur? Visit Health Square, led by Dr. Sonal Agarwal (BDS from RUHS & Fellowship in Aesthetic and Cosmetic Dentistry, New Delhi)—a trusted dentist in Jaipur with  of experience. We offer advanced dental treatments including RCT, smile design, braces, teeth whitening, full mouth rehabilitation, and pediatric dentistry. Our modern clinic combines technology, hygiene, and personalized care to make every dental visit safe, comfortable, and affordable for families in Jaipur.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {[
                "Easy Online Bookings.",
                "World-Class Equipment & Facilities.",
                "Low-Radiation Digital X-Ray.",
                "Advanced Safety & Hygiene Protocols.",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0E76CD] flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div
              className={`flex lg:justify-start justify-center transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link href="/appointment">
                <button
                  className="
    relative overflow-hidden bg-[#0E76CD] text-white font-semibold
    px-8 py-3 cursor-pointer rounded-lg shadow-lg w-fit
    transition-all duration-500 ease-in-out
    group
  "
                >
                  <span className="relative z-10 transition-colors duration-500 ease-in-out">
                    Book Appointment
                  </span>
                  <span
                    className="
      absolute inset-0 bg-[#00A859]
      -translate-x-full group-hover:translate-x-0
      transition-transform duration-500 ease-in-out
    "
                  ></span>
                </button>
              </Link>
            </div>
          </div>

       
          <div className="order-2 lg:order-1 flex gap-4 justify-center items-center">
            <div className="flex flex-col gap-4">
              <div
                className={`h-[180px] w-[240px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <Image
                  src="/images/about/dental-clinic-01.png"
                  alt="Dental patient smiling"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  width={240}
                  height={180}
                />
              </div>
              <div
                className={`h-[240px] w-[240px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <Image
                  src="/images/about/dental-clinic-02.png"
                  alt="Dental professionals"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  width={240}
                  height={240}
                />
              </div>
            </div>

            <div
              className={`mt-8 h-[344px] w-[240px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Image
                src="/images/about/dental-clinic-03.png"
                alt="Happy patient in dental chair"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                width={240}
                height={344}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
