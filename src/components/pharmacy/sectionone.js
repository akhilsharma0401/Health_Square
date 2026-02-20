"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SectionOne() {
  return (
    <>
      {/* <section className="relative w-full lg:h-[80vh] h-screen overflow-hidden">
      <Image
        src="/images/background1.png"
        alt="Background"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white"
        >
          <span className="text-[#0E76CD]">HEALTH</span>{" "}
          <span className="text-[#00A859]">SQUARE</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="bg-black/40 p-4 sm:p-6 rounded-lg max-w-3xl"
        >
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4">
            <span className="text-[#0E76CD] font-bold text-base sm:text-lg md:text-2xl">
              Health Square
            </span>
            &nbsp; is a pharmacy cum modern-day dental clinic in Jaipur,
            providing a full range of top-notch dental services via our dental
            clinic, as well as free home delivery of medicines via our pharmacy
            in Jaipur.
          </p>

          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl">
            Health Square is your trusted healthcare partner that provides
            accessible, high-quality, and affordable dental and pharmacy
            services. Our mission is to bridge the gap between healthcare
            accessibility and excellence, ensuring every patient receives
            personalized care in a comfortable and professional environment.
          </p>
        </motion.div>
      </div>
    </section> */}

      <section className="relative bg-gradient-to-br from-[#f8fbff] to-[#f2fff9] overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#1dba63]/30 rounded-full mix-blend-multiply opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0082e6]/30 rounded-full mix-blend-multiply opacity-40 blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Your Trusted Source for{" "}
              <span className="text-[#0082e6]">Pharmacy</span> &{" "}
              <span className="text-[#1dba63]">Dental</span> Care
            </h1>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed text-justify mb-6">
              Health Square is a{" "}
              <strong>pharmacy-cum-modern-day dental clinic</strong> in Jaipur,
              providing a full range of top-notch dental services through our
              clinic, along with{" "}
              <strong>free home delivery of medicines</strong> via our pharmacy
              in Jaipur.
            </p>

            <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed text-justify mb-8">
              We are your trusted healthcare partner delivering accessible,
              high-quality, and affordable dental and pharmacy services. Our
              mission is to bridge the gap between healthcare accessibility and
              excellence, ensuring every patient receives personalized care in a
              comfortable and professional environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-[#0082e6] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#1dba63] transition-all duration-300 block text-center"
                >
                  Contact Us
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="border-2 border-[#0082e6] text-[#0082e6] px-8 py-3 rounded-full font-semibold hover:bg-[#0082e6] hover:text-white transition-all duration-300 block text-center"
                >
                  Explore Products
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="relative w-[260px] sm:w-[340px] md:w-[430px] h-[300px] sm:h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-xl">
              <Image
                src="/images/background1.png"
                alt="Health Square Pharmacy and Dental Clinic Jaipur"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
