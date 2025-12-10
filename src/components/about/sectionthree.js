"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SectionThree() {
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
      className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-1 lg:order-1 space-y-6">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-[#0E76CD] font-semibold text-sm uppercase tracking-wide mb-4">
                Our Services
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0E76CD] leading-tight mb-6">
                RGHS Pharmacy in Jaipur
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                <span className="font-bold text-gray-700">Health Square</span>{" "}
                is an{" "}
                <span className="font-bold text-gray-700">
                  RGHS (Rajasthan Government Health Scheme) empanelled pharmacy
                </span>{" "}
                in Jaipur providing authentic branded and generic medicines,
                healthcare products, and cashless billing for RGHS
                beneficiaries. Our certified pharmacists combine clinical
                expertise with compassionate care to ensure safe and effective
                healthcare guidance. We offer a wide range of quality medicines,
                health, and body-care products, along with fast home delivery
                across Jaipur. Experience government-approved, affordable, and
                reliable healthcare with{" "}
                <span className="font-bold text-gray-700">
                  Health Square Pharmacy
                </span>{" "}
                — your trusted RGHS partner in Jaipur.
                <Link href="/rghs-pharmacy">
                  <span className="font-bold text-[#0E76CD] cursor-pointer hover:text-[#00A859]">
                    {" "}
                    Click here{" "}
                  </span>
                </Link>
                to know more about the RGHS scheme.
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
                "Standard and authorized medicines.",
                "Availability of other medical and personal care products.",
                "24*7 home delivery of medicines on just a phone call.",
                "Fast Delivery Across City",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0E76CD] flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{text}</span>
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
              <Link href="/rghs-pharmacy">
                <button
                  className="
    relative overflow-hidden bg-[#0E76CD] cursor-pointer text-white font-semibold
    px-8 py-3 rounded-lg shadow-lg w-fit
    transition-all duration-500 ease-in-out
    group
  "
                >
                  <span className="relative z-10 transition-colors duration-500 ease-in-out">
                    Learn More
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

          {/* Images Section */}
          <div className="order-2 lg:order-2 flex gap-4 justify-center items-center">
            {/* Right Image - Taller single image */}
            <div
              className={`h-[400px] lg:w-[280px] w-[330px] mt-8 rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Image
                src="/images/about/rghs-01.png"
                alt="Dental clinic"
                width={330}
                height={400}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Right Column - Two stacked images */}
            <div className="flex flex-col gap-4">
              <div
                className={`h-[180px] lg:w-[240px] w-[200px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <Image
                  src="/images/about/rghs-02.png"
                  alt="Dental equipment"
                  width={200}
                  height={180}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div
                className={`h-[240px] lg:w-[240px] w-[200px] rounded-3xl overflow-hidden shadow-2xl mt-8 transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <Image
                  src="/images/about/rghs-03.png"
                  alt="Dental procedure"
                  width={200}
                  height={240}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
