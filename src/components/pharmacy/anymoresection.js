"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function QuestionsSection() {
  // Animation variants for staggered entrance
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between each element
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 py-10 md:py-16 px-6 flex justify-center items-center text-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        {/* Heading */}
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-medium text-[#0e76cd] mb-4"
        >
          Any More Questions?
        </motion.h2>

        {/* Divider */}
        <motion.div
          variants={item}
          className="w-48 h-[2px] bg-gray-300 mx-auto mb-6"
        ></motion.div>

        {/* Paragraph */}
        <motion.p
          variants={item}
          className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg "
        >
          If you have any doubts you’d like to get cleared about the availability of
          certain products or our dental services, please reach out to us and we will
          get back to you shortly thereafter.
        </motion.p>

        {/* Button */}
          <Link href="/contact" passHref>
        <motion.button
  type="submit"
  variants={item}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="
    relative overflow-hidden bg-[#0072CE]  cursor-pointer text-white font-semibold
    py-3 px-10 rounded-full
    shadow-md transition-all duration-500 ease-in-out
    group
  "
>
  <span className="relative z-10 transition-colors duration-500 ease-in-out">
    GET IN TOUCH →
  </span>
  <span
    className="
      absolute inset-0 bg-[#00B388]
      -translate-x-full group-hover:translate-x-0
      transition-transform duration-500 ease-in-out
    "
  ></span>
</motion.button>
</Link>
      </motion.div>
    </section>
  );
}
