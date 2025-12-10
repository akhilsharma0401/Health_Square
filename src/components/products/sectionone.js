"use client";
import { useState, useEffect } from "react";
import {
  FaCapsules,
  FaHeartbeat,
  FaAppleAlt,
  FaTemperatureLow,
  FaCarrot,
  FaPills,
  FaAllergies,
  FaTooth,
  FaSyringe,
  FaShieldVirus,
  FaCommentDots,
  FaShoppingCart,
  FaSpa,
} from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  //  Category list with React Icons
  const categories = [
    { name: "Health", icon: <FaHeartbeat /> },
    { name: "Cosmetics", icon: <FaSpa /> },
    { name: "Dietary Supplements", icon: <FaAppleAlt /> },
    { name: "Cough, Cold, Fever", icon: <FaTemperatureLow /> },
    { name: "Nutrition", icon: <FaCarrot /> },
    { name: "Medicine", icon: <FaCapsules /> },
    { name: "Pollen Sneeze", icon: <FaAllergies /> },
    { name: "Allergies", icon: <FaAllergies /> },
    { name: "Mouth & Teeth", icon: <FaTooth /> },
    { name: "Medication", icon: <FaSyringe /> },
    { name: "Protection", icon: <FaShieldVirus /> },
  ];

  //  Slides (Image + Title + Description)
  const slides = [
    {
      img: "/images/services/dental/06-dental-services.png",
      title: "Daily Health Essentials",
      desc: "From disinfectants and first-aid kits to digestive care and cold-relief solutions, our pharmacy offers a complete collection of essentials.",
    },
    {
      img: "/images/services/dental/07-dental-services.png",
      title: "Explore Skincare & Personal Beauty Essentials",
      desc: "Discover a curated range of beauty and skincare products that nourish, protect, and enhance your natural glow — all certified and authentic.",
    },
    {
      img: "/images/services/dental/08-dental-services.png",
      title: "Stay Active with Quality Fitness Products",
      desc: "From protein powders to daily vitamins, Health Square brings you certified fitness products that fuel your performance and recovery.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-[#f9f7f3]">
      {/* ======== NAVBAR ======== */}
      <nav className="bg-[#5BB174] text-white flex items-center justify-between px-8 py-3 shadow-md">
        <div className="flex items-center gap-4 font-semibold">
          <div className="flex items-center bg-[#3C9B5E] px-4 py-2 rounded-sm cursor-pointer">
            <span className="text-xl mr-2">⋯</span>
            <span>Browse Categories</span>
          </div>

          <ul className="flex items-center gap-6 ml-8 text-white/90">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Pages</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Landing</li>
          </ul>
        </div>

        {/* Right Section */}
        <p className="font-semibold tracking-wide text-sm uppercase cursor-pointer">
          ASK YOUR PHARMACIST
        </p>
      </nav>

      {/* ======== MAIN CONTENT ======== */}
      <div className="flex">
        {/* ==== Sidebar ==== */}
        <aside className="w-64 bg-white border-r border-gray-200 pt-6 pb-10 ml-8 rounded-md shadow-sm">
          <ul className="space-y-4 px-6">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="flex justify-between items-center text-gray-700 hover:text-[#5BB174] cursor-pointer transition"
              >
                <div className="flex items-center gap-3 text-lg">
                  <span className="text-xl text-[#5BB174]">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <span className="text-gray-400">›</span>
              </li>
            ))}
          </ul>
        </aside>


        <section className="flex-1 relative flex items-center bg-[#f9f7f3] overflow-hidden">
  
          <div className="relative z-10 max-w-lg space-y-5 pl-4 lg:pl-8 xl:pl-10 pr-8 transition-all duration-700 ease-in-out">
            <h1
              key={slides[current].title}
              className="text-5xl font-bold text-gray-900 leading-snug transition-opacity duration-700"
            >
              {slides[current].title}
            </h1>
            <p className="text-gray-600 transition-opacity duration-700">
              {slides[current].desc}
            </p>
          </div>


          <div className="absolute right-0 top-0 h-full w-1/2 transition-all duration-700 ease-in-out">
            <Image
              key={slides[current].img}
              src={slides[current].img}
              fill
              alt="Health Beauty"
              className="w-full h-full object-cover rounded-l-lg transition-opacity duration-700"
            />
          </div>


          <div className="absolute right-10 bottom-10 flex flex-col gap-3 z-20">
            <div className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer text-xl hover:scale-105 transition-transform">
              <FaCommentDots />
            </div>
            <div className="bg-white text-pink-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg cursor-pointer border border-pink-500 text-xl hover:scale-105 transition-transform">
              <FaShoppingCart />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
