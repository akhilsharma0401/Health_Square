"use client";

import { motion } from "framer-motion";
import {
  FaUser,
  FaBaby,
  FaShieldAlt,
  FaHeartbeat,
  FaMedkit,
  FaGift,
} from "react-icons/fa";
import Link from "next/link";

const products = [
  {
    icon: <FaUser />,
    title: "Personal Care",
    desc: "Find all your personal care essentials in Vaishali Nagar at Health Square Pharmacy. Our selection includes soaps, colognes, deodorants, lotions, makeup, hand soaps, body washes, toothpaste, and shampoos, all at reasonable prices.",
  },
  {
    icon: <FaBaby />,
    title: "Mom & Baby",
    desc: "Selecting the right products for mother and baby care is crucial. At Health Square, we provide top-quality items to ensure health, hygiene, and safety of both mother and child — from diapers, baby lotions to prenatal vitamins and nursing supplies.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Preventive Solutions",
    desc: "Enhance your well-being with our range of nutrition products. We offer supplements and health foods from top brands to help you maintain a balanced diet and healthy lifestyle. Whether vitamins, protein powders, or herbal supplements — we have it all.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Health Care",
    desc: "Improve your health and wellness with our extensive selection of healthcare products. We offer syrups, tablets, capsules, soft gels, and more to address all health concerns. Our products are sourced from trusted manufacturers to ensure safety and effectiveness.",
  },
  {
    icon: <FaMedkit />,
    title: "RGHS Scheme",
    desc: "Health Square pharmacy is empanelled under Rajasthan Government Health Scheme (RGHS) where beneficiaries can access medicines in-store or get them delivered as per convenience.",
  },
  {
    icon: <FaGift />,
    title: "Beauty",
    desc: "Achieve your beauty goals with our premium beauty products. We stock items from the best brands in the industry, including skincare, makeup, and cosmetics. Discover high-quality products that cater to your beauty and wellness needs.",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-200 py-10 md:py-16 px-4 md:px-10 lg:px-16">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          OUR <span className="text-[#0E76CD]">PRODUCTS</span>
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </motion.div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 gap-8 justify-items-center">

        {products.map((item, index) => {
          const card = (
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ duration: 0.7 }}
              className="relative bg-white rounded-3xl shadow-lg px-6 py-8 w-full sm:w-[90%] md:w-[95%] lg:w-full h-full min-h-[380px] overflow-hidden group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.45,0,0.55,1)]"
            >
              {/* Animated Shape */}
              <motion.div
                variants={{
                  rest: { width: 90, height: 90, borderRadius: "0px 0% 0px 50%", backgroundColor: "rgb(221,236,255)", top: 0, right: 0 },
                  hover: { width: "200%", height: "200%", borderRadius: "0%", backgroundColor: "#0E76CD", top: 0, right: 0 },
                }}
                transition={{ duration: 1 }}
                className="absolute z-0"
              />

              {/* Content */}
              <motion.div
                variants={{ rest: { color: "#1f2937" }, hover: { color: "#ffffff" } }}
                transition={{ duration: 0.7 }}
                className="relative z-10 flex flex-col h-full"
              >
                {/* Icon */}
                <motion.div
                  variants={{
                    rest: { backgroundColor: "#0E76CD1A", color: "#0E76CD", scale: 1 },
                    hover: { backgroundColor: "#ffffff", color: "#0E76CD", scale: 1.1 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 flex items-center justify-center p-8 rounded-sm mb-8 shadow-sm self-start"
                >
                  <div className="text-3xl">{item.icon}</div>
                </motion.div>

                {/* Title */}
                <motion.h3 className="text-xl font-semibold mb-3">{item.title}</motion.h3>

                {/* Description */}
                <motion.p className="text-base leading-relaxed text-justify">{item.desc}</motion.p>
              </motion.div>
            </motion.div>
          );

          return item.title === "RGHS Scheme" ? (
            <Link href="/rghs-pharmacy" key={index} className="w-full">
              {card}
            </Link>
          ) : (
            <div key={index} className="w-full">
              {card}
            </div>
          );
        })}

      </div>

      {/* Button */}
      <div className="text-center">
        <Link
          href="/products"
          className="relative thmbtn overflow-hidden bg-[#0072CE] text-white font-semibold py-3 px-10 rounded-full shadow-md transition-all duration-500 ease-in-out group inline-block"
        >
          <span className="relative z-10">Explore Products</span>
          <span className="absolute inset-0 bg-[#00B388] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        </Link>
      </div>
    </section>
  );
}
