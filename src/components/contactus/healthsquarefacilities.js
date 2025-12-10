"use client";

import { motion } from "framer-motion";
import { HiHome, HiClipboardList, HiPhone } from "react-icons/hi";
import { FaHeart, FaPlus, FaCapsules, FaStethoscope } from "react-icons/fa";

export default function HealthSquareFacilities() {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative w-full bg-[#e6f6ff]  py-24 px-6 md:px-12 overflow-hidden">
      {/* ---------- Floating Icons ---------- */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <FaHeart className="text-[#FF7B7B] absolute top-[40px] left-[50px] text-5xl opacity-30 animate-float1" />
        <FaPlus className="text-[#3AB8FF] absolute top-[180px] right-[60px] text-4xl opacity-40 animate-float2" />
        <FaStethoscope className="text-[#0070C9] absolute top-[320px] left-[30px] text-6xl opacity-25 animate-float3" />
        <FaCapsules className="text-[#00A6FB] absolute bottom-[80px] right-[40px] text-5xl opacity-40 animate-float2" />
      </div>

      {/* ---------- Main Content ---------- */}
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-[#005fa3] mb-4"
        >
          Health Square Facilities
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-3xl mx-auto mb-16 text-[15px] md:text-base"
        >
          Book appointments for dental services on-call. Health Square also offers free
          home delivery of medicines and healthcare products — ensuring your wellbeing.
        </motion.p>

        {/* ---------- Animated Cards ---------- */}
        <div className="relative flex flex-col md:flex-row justify-center items-start gap-12 md:gap-6">
          {[ 
            {
              icon: <HiHome className="text-white text-3xl" />,
              title: "Free Home Delivery",
              desc: "Get your medicines and health essentials delivered to your doorstep at no extra cost. Fast, reliable, and hassle-free.",
              phone: "7403330888",
            },
            {
              icon: <HiClipboardList className="text-white text-3xl" />,
              title: "Same Day Appointment",
              desc: "Need urgent dental or medical care? Book your appointment today and consult our specialists on the very same day.",
              phone: "7403330777",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={`relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 w-full md:w-1/2 lg:w-1/3 transition-all duration-300 ${
                i === 0 ? "z-20 md:-translate-y-6" : "z-10 md:translate-y-6"
              }`}
            >
              <div className="bg-gradient-to-br from-[#3AB8FF] to-[#0070C9] rounded-full p-6 shadow-lg -mt-16 mx-auto w-fit transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0070C9] mt-6 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-[15px] mb-6">{card.desc}</p>
              <a
                href={`tel:${card.phone}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0070C9] to-[#00A6FB] text-white font-medium py-2.5 px-6 rounded-full hover:scale-105 transition-transform duration-300"
              >
                <HiPhone className="text-white text-lg" /> Call {card.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
