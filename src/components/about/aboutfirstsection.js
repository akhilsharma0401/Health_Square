"use client";
import React from "react";
import Image from "next/image";
import { FaCamera, FaCapsules, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTooth, FaPills, FaTruckMedical } from "react-icons/fa6";

export default function HeroSection() {
  return (
    <>
      {/* <section className="relative w-full lg:h-[80vh] h-screen overflow-hidden">
        <Image
          src="/images/services/health-service-01.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 lg:px-16">
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
              &nbsp; is Jaipur’s leading <b>Pharmacy</b> and{" "}
              <b>Dental Clinic</b>, delivering comprehensive healthcare
              solutions for families. We provide expert dental treatments,
              cosmetic dentistry, oral hygiene care, and trusted pharmacy
              services with free home medicine delivery in Jaipur.
            </p>

            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl">
              Combining advanced dental technology, certified pharmacists, and a
              patient-first approach, we ensure affordable, reliable, and
              high-quality healthcare that promotes long-term wellness and
              smiles.
            </p>
          </motion.div>
        </div>
      </section> */}
      {/* <section className="relative overflow-hidden">
  <img
    src="/images/health-banner.jpg"
    alt="Health Clinic Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-[#009FDF]/90 to-[#0DC981]/80"></div>

  <div className="relative z-10 max-w-5xl mx-auto text-white text-center py-28 px-6">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to Health Square</h1>
    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
      A complete healthcare hub in Jaipur — offering trusted Pharmacy, advanced Dental Care,
      and personalized treatment under one roof.
    </p>
    <div className="flex justify-center gap-6 mt-8">
      <button className="bg-white text-[#009FDF] font-semibold px-6 py-3 rounded-xl hover:bg-gray-100">
        Get Started
      </button>
      <button className="border border-white px-6 py-3 rounded-xl hover:bg-white/20">
        Learn More
      </button>
    </div>
  </div>


  <div className="absolute bottom-0 left-0 w-full h-24 bg-white rounded-t-[60%]"></div>
  
</section> */}
           <section className="relative bg-gradient-to-br from-[#f8fbff] to-[#f2fff9] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#1dba63]/30 rounded-full mix-blend-multiply opacity-40 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0082e6]/30 rounded-full mix-blend-multiply opacity-40 blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Your Trusted Partner in{" "}
            <span className="text-[#0082e6]">Pharmacy</span> &{" "}
            <span className="text-[#1dba63]">Dental</span> Care
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-4 text-justify">
            Health Square is Jaipur’s leading{" "}
            <strong>pharmacy and dental clinic</strong>, offering expert dental
            care, cosmetic dentistry, and oral hygiene with reliable pharmacy
            services and <strong>free home medicine delivery</strong>.
          </p>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-justify">
            Combining advanced dental technology, certified pharmacists, and a
            patient-first approach — we ensure affordable, high-quality
            healthcare that keeps your family smiling.
          </p>

       <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
  {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href="/contact"
      className="bg-[#0082e6] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#1dba63] transition-all duration-300 block text-center"
    >
      Book Appointment
    </Link>
  </motion.div> */}

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href="/services"
      className="border-2 border-[#0082e6] text-[#0082e6] px-8 py-3 rounded-full font-semibold hover:bg-[#0082e6] hover:text-white transition-all duration-300 block text-center"
    >
      Explore Services
    </Link>
  </motion.div>
</div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-[260px] sm:w-[340px] md:w-[430px] h-[300px] sm:h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden shadow-xl">
            <Image
              src="/images/services/health-service-01.png"
              alt="Health Square Jaipur Dental and Pharmacy"
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
