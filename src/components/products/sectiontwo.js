"use client";
import { useState, useEffect } from "react";
import { FaCommentDots, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const slides = [
    {
      img: "/images/products/hero01.png",
       title: "Hair Care Essential",
      desc: "From daily shampoos to nourishing oils and repair treatments, our pharmacy offers reliable hair care products to keep your hair healthy, strong, and well-maintained.",
    },
    {
      img: "/images/products/hero02.png",
      title: "Explore Skincare & Beauty Essentials",
      desc: "Discover a curated range of beauty and skincare products that nourish, protect, and enhance your natural glow — all certified and authentic.",
    },
    {
      img: "/images/products/hero03.png",
      title: "Stay Active with Quality Fitness Products",
      desc: "From protein powders to daily vitamins, Health Square brings you certified fitness products that fuel your performance and recovery.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-gradient-to-br from-[#f2fff9] to-[#f2fff9]">
      <section className="relative flex items-center justify-between h-[80vh] bg-[#f2fff9] overflow-hidden">
        <div className="z-10 w-1/2 pl-16 pr-10 flex flex-col justify-center">
          <div
            key={slides[current].title}
            className="transition-all duration-700 ease-in-out animate-slide-down"
          >
            <h1 className="text-5xl font-bold text-gray-900 leading-snug mb-4 animate-heading">
              {slides[current].title}
            </h1>
            <p className="text-gray-600 text-lg animate-desc">
              {slides[current].desc}
            </p>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            key={slides[current].img}
            src={slides[current].img}
            fill
            alt="Health Beauty"
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>
{/* 
        <div className="absolute right-10 bottom-10 flex flex-col gap-3 z-20">
          <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer text-xl hover:scale-105 transition-transform">
            <FaCommentDots />
          </div>
          <div className="bg-white text-pink-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-pink-500 text-xl hover:scale-105 transition-transform">
            <FaShoppingCart />
          </div>
        </div> */}
      </section>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.7s ease forwards;
        }

        .animate-heading {
          animation: slideDown 0.7s ease forwards;
        }

        .animate-desc {
          animation: fadeIn 1.2s ease forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
