"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    title: "RGHS Certified Pharmacy in Jaipur | Health Square",
    des: "Health Square is Jaipur’s trusted RGHS-certified pharmacy providing authentic medicines, wellness products, and hassle-free home delivery across the city.",
    image: "/doc2.png",
  },
  {
    title: "Pharmacy & Wellness Center in Jaipur | Health Square",
    des: "Health Square is a trusted pharmacy and wellness center in Jaipur offering genuine medicines, dental care, beauty, and healthcare products.",
    image: "/doc3.png",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slowFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smoothSlideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .fade-line-1 {
          animation: slowFadeDown 1.4s ease forwards;
        }
        .fade-line-2 {
          animation: slowFadeDown 1.4s ease 0.6s forwards;
          opacity: 0;
        }
        .fade-line-3 {
          animation: slowFadeDown 1.4s ease 1.2s forwards;
          opacity: 0;
        }
        .slide-image {
          animation: smoothSlideInRight 1.8s ease forwards;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #007bff, #00a97f);
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
      `}</style>

      <section className="relative flex flex-col md:flex-row items-center justify-between gradient-bg text-white px-8 md:px-20 pt-10 overflow-hidden min-h-[500px] md:min-h-[550px]">
        <div
          key={current + "-text"}
          className="w-full md:w-1/2 flex flex-col gap-4 md:gap-5 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-snug fade-line-1 drop-shadow-md">
            {slides[current].title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4 fade-line-3">
            <span className="text-base text-white">{slides[current].des}</span>
          </div>
        </div>


        <div
          key={current + "-image"}
          className="w-full md:w-1/2 flex justify-center slide-image"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            width={520}
            height={520}
            className="object-contain w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[550px]"
          />
        </div>

        <div className="absolute inset-0 bg-[#005FB8]/20 pointer-events-none" />
      </section>
    </>
  );
}
