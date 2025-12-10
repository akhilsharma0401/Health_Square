"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTooth, FaPills, FaHeartbeat } from "react-icons/fa";
import RotatingBadge from "@/src/components/rotatingbadge";
import Link from "next/link";

export default function HeroSection() {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };


  const fadeFromRight = {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };


  const fadeFromBottom = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-white pt-[40px] pb-20 sm:pb-24 overflow-hidden">

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[-80px] left-[-80px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#0E76CD]/10 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-[-80px] right-[-80px] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#00A859]/10 rounded-full blur-3xl"
      ></motion.div>


      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between relative z-10 gap-10 md:gap-0"
      >
        <motion.div
          variants={container}
          className="flex-1 text-center md:text-left"
        >
          <motion.h1
            variants={fadeFromRight}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E76CD] leading-tight"
          >
           Best Dental Care<br /> 
            <span className="text-[#00A859]"> & Pharmacy Services</span> <br />
            in Jaipur
          </motion.h1>

          <motion.p
            variants={fadeFromRight}
            className="text-gray-600 mt-4 text-base sm:text-lg md:text-xl max-w-md sm:max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Health Square is Jaipur’s leading <b>Pharmacy</b> and{" "}
            <b>Dental Clinic</b> offering complete healthcare solutions under one
            roof. From professional dental treatments to authentic medicines and
            fast home delivery, we provide trusted, affordable, and accessible
            healthcare for every family in Jaipur.
          </motion.p>

          <motion.div
            variants={fadeFromRight}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start"
          >
            <Link href="/appointment" passHref>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#0E76CD] to-[#00A859] cursor-pointer text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all text-sm sm:text-base"
              >
                Book Appointment
              </motion.button>
            </Link>

            <Link href="/pharmacy" passHref>
              <motion.button
                whileHover={{
                  backgroundColor: "#0E76CD",
                  color: "#fff",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#0E76CD] cursor-pointer text-[#0E76CD] px-6 sm:px-8 py-3 rounded-full font-semibold transition-all text-sm sm:text-base"
              >
                Explore Pharmacy
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeFromBottom}
          className="flex-1 relative mt-12 sm:mt-16 md:mt-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] lg:w-[550px] lg:h-[550px]"
          >
            <Image
              src="/webhero.png"
              alt="Doctor Smiling"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

     
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-4 sm:top-8 left-4 sm:left-12 text-[#0E76CD]"
          >
            <FaTooth className="text-3xl sm:text-4xl md:text-5xl opacity-80" />
          </motion.div>

          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="absolute bottom-6 sm:bottom-10 right-6 sm:right-16 text-[#00A859]"
          >
            <FaPills className="text-3xl sm:text-4xl md:text-5xl opacity-80" />
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-1/2 -left-6 sm:-left-10 text-[#0E76CD]"
          >
            <FaHeartbeat className="text-2xl sm:text-3xl md:text-4xl opacity-70" />
          </motion.div>


         <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -top-4 -right-10"
          >
            <RotatingBadge
              text="HEALTH SQUARE • PHARMACY • DENTAL • "
              size={200}
              speed="slow"
              className="text-[#02AA66]"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
