"use client";
import { motion } from "framer-motion";
import { Stethoscope, HeartPulse, ShieldCheck } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function RghsSection() {
  return (
    <section className="relative py-20 px-6 md:px-16 overflow-hidden bg-[#fff]">
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-blue-200 rounded-full blur-[140px] opacity-40" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[40px] overflow-hidden shadow-2xl border border-white">
              <Image
              src="/rghs-02.png"
              alt="RGHS Pharmacy"
              width={600}
              height={430}
              className="object-cover w-full h-[430px]"
            />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -left-8 top-10 bg-white shadow-lg p-3 rounded-2xl"
          >
            <Stethoscope className="w-7 h-7 text-blue-600" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.6 }}
            className="absolute right-3 -bottom-6 bg-white shadow-lg p-3 rounded-2xl"
          >
            <HeartPulse className="w-7 h-7 text-red-500" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 3.3 }}
            className="absolute -right-8 top-1/2 bg-white shadow-lg p-3 rounded-2xl"
          >
            <ShieldCheck className="w-7 h-7 text-green-500" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Seamless Cashless Healthcare at Our{" "}
            <span className="text-green-600">RGHS Approved Pharmacy</span>
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Our RGHS Empanel Pharmacy is dedicated to supporting everyone with
            their health requirements in the easiest, tension-free manner. No
            cash transactions, no long waiting, and no unnecessary procedures.
          </p>

          <ul className="space-y-3 text-gray-700">
            {[
              "Genuine medicines & professional guidance.",
              "Quick paperwork & smooth cashless process.",
              "Peaceful service for employees, pensioners & families.",
              "Our mission is your confidence, comfort & care.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-green-600 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/rghs-pharmacy">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden bg-[#0072CE] text-white font-semibold px-6 py-3 rounded-full cursor-pointer w-fit mt-6 shadow-md transition-all duration-500 ease-in-out group"
            >
              <span className="relative z-10 transition-colors duration-500 ease-in-out">
                Visit Our Pharmacy
              </span>
              <span className="absolute inset-0 bg-[#00B388] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
