"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Seo from "@/src/components/seo";
import {
  Smile,
  Activity,
  Baby,
  Sun,
  Settings2,
  Gem,
  Anchor,
  Scissors,
} from "lucide-react";

const services = [
  {
    icon: <Smile className="w-8 h-8 text-white" />,
    title: "Smile Design",
    desc: "Achieve the perfect smile by correcting dental imperfections and enhancing your overall appearance.",
    color: "bg-[#0078C9]",
    link: "/services/smile-design",
  },
  {
    icon: <Activity className="w-8 h-8 text-white" />,
    title: "Root Canal Treatment",
    desc: "Painlessly remove infection and save your natural tooth with advanced dental technology.",
    color: "bg-[#00A859]",
    link: "/services/advanced-root-canal-treatment",
  },
  {
    icon: <Baby className="w-8 h-8 text-white" />,
    title: "Child Dental Care",
    desc: "Gentle dental care for children, ensuring healthy habits and happy smiles from day one.",
    color: "bg-[#0078C9]",
    link: "/services/child-dental-care",
  },
  {
    icon: <Sun className="w-8 h-8 text-white" />,
    title: "Teeth Whitening",
    desc: "Brighten your smile safely with our professional whitening treatment that lasts longer.",
    color: "bg-[#00A859]",
    link: "/services/teeth-whitening",
  },
  {
    icon: <Settings2 className="w-8 h-8 text-white" />,
    title: "Full Mouth Rehabilitation",
    desc: "Comprehensive restoration to improve bite, function, and aesthetics for your entire mouth.",
    color: "bg-[#0078C9]",
    link: "/services/full-mouth-rehabilitation",
  },
  {
    icon: <Gem className="w-8 h-8 text-white" />,
    title: "Veneers & Crowns",
    desc: "Custom-made shells and caps designed to enhance your smile by covering damaged teeth.",
    color: "bg-[#00A859]",
    link: "/services/veneers-and-crown",
  },
  {
    icon: <Anchor className="w-8 h-8 text-white" />,
    title: "Tooth Implants",
    desc: "Durable replacements that look, feel, and function just like your natural teeth.",
    color: "bg-[#0078C9]",
    link: "/services/tooth-implant",
  },
  {
    icon: <Scissors className="w-8 h-8 text-white" />,
    title: "Tooth Extraction",
    desc: "Safe and comfortable tooth removal, including wisdom teeth, with quick recovery time.",
    color: "bg-[#00A859]",
    link: "/services/tooth-extraction",
  },
];

const OurServices = () => {
  return (
    <>
      <Seo
        title="Health Square – Advanced Dental Services & Root-Canal Care"
        description="Experience expert dental care in Jaipur with Health Square — from painless root canals to smile makeovers, teeth whitening, and complete oral treatments."
      />
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/appointment.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/90" />

        <div className="relative max-w-full w-full flex flex-col md:flex-row items-stretch justify-between min-h-[420px] md:min-h-[480px] mx-auto">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-[#0078C9] to-[#00A859] md:w-[45%] w-full flex justify-center md:justify-end items-center rounded-br-[180px] pr-6 sm:pr-10 md:pr-14"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/services/dental/dental-care-service.png"
                alt="Our Services"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:w-[55%] w-full flex flex-col justify-center text-center md:text-left py-10 px-6 sm:px-10 md:pl-16"
          >
            <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
              <span className="text-[#0078C9]">Our </span>
              <span className="text-[#00A859]">DENTAL SERVICES</span>
            </h1>
            <p className="text-gray-700 mt-3 leading-relaxed max-w-2xl mx-auto md:mx-0 text-base sm:text-lg">
              Discover next-level dental care with Health Square — advanced
              equipment, expert dentists, and a commitment to keeping every
              smile healthy, natural, and beautiful.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-32 mt-10 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="flex flex-col justify-between items-center text-center bg-white rounded-2xl shadow-md p-6 sm:p-8 min-h-[340px] hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full shadow-md mx-auto ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <h2
                    className={`text-lg sm:text-xl font-semibold mt-4 ${
                      i % 2 === 0 ? "text-[#0078C9]" : "text-[#00A859]"
                    }`}
                  >
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed h-[72px] sm:h-[80px] overflow-hidden">
                    {service.desc}
                  </p>
                </div>

                <Link
                  href={service.link}
                  className="mt-4 text-sm font-medium text-[#0078C9] hover:text-[#00A859] transition-colors duration-200"
                >
                  Read more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurServices;
