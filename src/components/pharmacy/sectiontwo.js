"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBaby, FaAtom, FaAddressCard, FaGifts } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";

export default function SectionTwo() {
  const services = [
    {
      icon: <FaUserDoctor className="w-10 h-10 text-blue-600" />,
      title: "Personal Care",
      desc: "Find all your personal care essentials in Vaishali Nagar at Health Square Pharmacy. Our selection of items includes pads, colognes, deodorants, lotions, makeup, hand soaps, body washes, toothpaste, and shampoos, all at reasonable prices.",
    },
    {
      icon: <FaBaby className="w-10 h-10 text-blue-600" />,
      title: "Mom & Baby",
      desc: "Selecting the right products for mother and baby care is crucial. At Health Square, we provide top-quality items to ensure the health, hygiene, and safety of both mother and child. From diapers and baby lotions to prenatal vitamins and nursing supplies, we have everything you need.",
    },
    {
      icon: <FaAtom className="w-10 h-10 text-blue-600" />,
      title: "Preventive Solutions",
      desc: "Enhance your well-being with our range of nutrition products. We offer supplements and health foods from top brands to help you maintain a balanced diet and healthy lifestyle. Whether you’re looking for vitamins, protein powders, or herbal supplements, we have it all.",
    },
    {
      icon: <GiMedicines className="w-10 h-10 text-blue-600" />,
      title: "Health Care",
      desc: "Improve your health and wellness with our extensive selection of healthcare products. We offer syrups, tablets, capsules, soft gels, and more to address all health concerns. Our products are sourced from trusted manufacturers to ensure their safety and effectiveness.",
    },
    {
      icon: <FaAddressCard className="w-10 h-10 text-blue-600" />,
      title: "RGHS Scheme",
      desc: "Health Square pharmacy is empanelled under Rajasthan Government Health Scheme (RGHS) where beneficiaries can cashless medicines in-store or home delivered as per your convenience. Learn More",
    },
    {
      icon: <FaGifts className="w-10 h-10 text-blue-600" />,
      title: "Beauty",
      desc: "Achieve your beauty goals with our premium beauty products. We stock items from the best brands in the industry, including skincare, haircare, and cosmetics. Discover high-quality products that cater to your beauty and wellness needs.",
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-200">
      <div className="py-16 px-4 md:px-10 lg:px-16 container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            OUR PRODUCTS
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-4 bg-blue-100 p-4 rounded-full">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        
      </div>
      
    </section>
  );
}
