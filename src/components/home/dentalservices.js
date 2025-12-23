"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { title: "Advanced Root Canal", icon: "/images/services/dental/01-dental-services.png",link:"/services/advanced-root-canal-treatment" },
  { title: "Tooth Implant", icon: "/images/services/dental/02-dental-services.png",link:"/services/tooth-implant" },
  { title: "Atraumatic Tooth Extraction", icon: "/images/services/dental/03-dental-services.png",link:"/services/tooth-extraction" },
  { title: "Scaling & Polishing", icon: "/images/services/dental/04-dental-services.png",link:"/services/teeth-whitening" },
  { title: "Digital X-ray System", icon: "/images/services/dental/05-dental-services.png" ,link:"/services/digital-x-ray-system"},
  { title: "Teeth Whitening / Bleaching", icon: "/images/services/dental/06-dental-services.png" ,link:"/services/teeth-whitening"},
  { title: "Full Mouth Rehabilitation", icon: "/images/services/dental/07-dental-services.png" ,link:"/services/full-mouth-rehabilitation"},
  { title: "Veneers & Crown", icon: "/images/services/dental/08-dental-services.png" ,link:"/services/veneers-and-crown"},
  { title: "Smile Design", icon: "/images/services/dental/09-dental-services.png" ,link:"/services/smile-design"},
  { title: "Child Dental Care", icon: "/images/services/dental/010-dental-services.png" ,link:"/services/child-dental-care"},
];

export default function DentalServices() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* 🫧 Animated background shapes */}
      <motion.div
        initial={{ rotate: 0, y: 0 }}
        animate={{ rotate: [0, 15, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-20 left-24 w-24 h-24 bg-gradient-to-br from-[#0072CE]/15 to-[#00A859]/15 rounded-2xl blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], rotate: [-8, -12, -8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-16 w-28 h-28 bg-gradient-to-tr from-[#00A859]/10 to-[#0072CE]/10 rounded-full blur-2xl"
      ></motion.div>

      {/* 💠 Main Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-[#004B8D] mb-3"
        >
          Our Extensive Dental Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#0072CE] text-lg mb-14"
        >
          Complete dental care designed for healthy, confident smiles.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
  {services.map((service, index) => (
    <Link href={service.link} key={index}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="bg-white border border-[#E0E0E0] rounded-3xl p-5 flex flex-col items-center justify-center transition-all w-full h-[280px]" 
      >
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-tr from-[#E6F7FF] to-[#E0F9F0] border border-[#0072CE]/10 mb-6 flex items-center justify-center">
          <Image
            src={service.icon}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        <p className="font-semibold text-lg text-gray-800 leading-snug text-center">
          {service.title}
        </p>
        <div className="mt-3 w-10 h-[2px] bg-gradient-to-r from-[#0072CE] to-[#00A859] rounded-full"></div>
      </motion.div>
    </Link>
  ))}
</div>

      </div>
    </section>
  );
}
