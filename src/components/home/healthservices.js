"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTooth, FaPills } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function HealthServicesSection() {
  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };


  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, 20, {
      duration: 2,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded]);

  return (
    <div className="bg-white">
      <section className="container mx-auto relative py-10 md:py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
   
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-16 h-16 border-2 border-[#0D75CD] rotate-12 rounded-md"
        ></motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-16 h-16 border-2 border-[#00A759] -rotate-12 rounded-md"
        ></motion.div>


        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:w-1/2 gap-6 relative z-10"
        >

          <motion.div variants={fadeUp} className="flex gap-4">
            <div className="relative w-1/2 h-52 rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/services/health-service-01.png"
                alt="Doctors discussing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative w-1/2 h-52 rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/services/health-service-02.png"
                alt="Doctor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>


          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="relative w-1/2 h-52 rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/services/health-service-03.png"
                alt="Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>


            <div className="flex flex-col justify-center items-center bg-[#E6F4FF] rounded-3xl p-10 w-1/2 shadow-md relative overflow-hidden">
              <span className="absolute bottom-0 left-0 h-1 w-full bg-[#00A759]" />
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-5xl font-extrabold text-[#0D75CD] leading-tight"
              >
                {displayValue}
              </motion.h2>
              <p className="text-[#2B2F33]/70 text-center mt-2 text-lg">
                Years Experience
              </p>
            </div>
          </motion.div>
        </motion.div>


        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="md:w-1/2 flex flex-col gap-6 z-10"
        >
          <p className="font-semibold uppercase tracking-wide bg-gradient-to-r from-[#0D75CD] to-[#00A759] bg-clip-text text-transparent">
            Our Health Services
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#2B2F33] leading-snug">
            Health Square — Dental & Pharmacy Care
          </h2>

          <p className="text-[#2B2F33]/75 leading-relaxed">
            Health Square is a dental clinic in Jaipur with a dentist
            specializing in cosmetics and world-class equipment. It also has a
            well-equipped pharmacy for all essential and premium medical needs.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Link href="/services">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-3 bg-[#E6F4FF] hover:bg-[#D8EBFF] transition p-4 rounded-xl border border-[#B9DAFF] cursor-pointer"
              >
                <FaTooth className="text-[#0D75CD] text-2xl" />
                <p className="font-medium text-[#2B2F33]">Dental Care</p>
              </motion.div>
            </Link>

            <Link href="/pharmacy">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-3 bg-[#E8F9F1] hover:bg-[#D8F4E7] transition p-4 rounded-xl border border-[#BEEED7]"
              >
                <FaPills className="text-[#00A759] text-2xl" />
                <p className="font-medium text-[#2B2F33]">Pharmacy</p>
              </motion.div>
            </Link>
          </div>


          {/* <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden bg-[#0072CE] text-white font-semibold px-6 py-3 rounded-lg cursor-pointer w-fit mt-6 shadow-md transition-all duration-500 ease-in-out group"
            >
              <span className="relative z-10 transition-colors duration-500 ease-in-out">
                Know More
              </span>
              <span className="absolute inset-0 bg-[#00B388] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </motion.button>
          </Link> */}
        </motion.div>

    
        <div className="absolute inset-0 -z-10 opacity-10 bg-gradient-to-br from-[#0D75CD] via-white to-[#00A759]" />
      </section>
    </div>
  );
}
