"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureCards() {
  const features = [
    {
      icon: "/images/services/service01.png",
      title: "ON CALL APPOINTMENT",
      desc: "No need to come to the clinic and wait in a queue — just give a call and get the appointment!",
    },
    {
      icon: "/images/services/service02.png",
      title: "EFFECTIVE MEDICINES",
      desc: "Health Square supplies medicines that are of the best quality and highly effective.",
    },
    {
      icon: "/images/services/service03.png",
      title: "DENTAL CHECKUP",
      desc: "Highly qualified and experienced doctors for your dental checkup and examination.",
    },
    {
      icon: "/images/services/service04.png",
      title: "FREE HOME DELIVERY",
      desc: "Save your commuting time — get free home delivery of all necessary medicines!",
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative bg-gradient-to-br from-[#E6F4FF] via-white to-[#E6F4FF] py-10 md:py-28 overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute left-[10px] top-[30px] w-[150px] md:w-[190px] lg:w-[210px] opacity-80 pointer-events-none"
      >
        <Image
          src="/shape-6.png"
          alt="Background Shape"
          width={210}
          height={210}
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center pb-5 md:mb-16 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0072CE] mb-4">
          OUR DENTAL AND PHARMACY <span className="text-[#00A859]">SERVICES</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your trusted dental and pharmacy partner in Jaipur — quality care, genuine medicines, and easy home delivery.
        </p>
        <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#0072CE] to-[#00B388] mx-auto rounded-full" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{
              y: -10,
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
            className="
              group relative bg-white rounded-2xl overflow-hidden
              shadow-md hover:shadow-xl transition-all duration-500 ease-out
              text-start p-8 flex flex-col items-start
            "
          >
            <div
              className="
                absolute inset-0 bg-gradient-to-b from-[#0072CE] to-[#00B388]
                translate-y-[-102%] group-hover:translate-y-0
                transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              "
            ></div>

            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 z-10 border-2 border-[#E6F4FF] shadow-sm">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <h3
              className="
                text-[#1E1E3E] font-semibold text-lg mb-2 relative z-10 
                transition-colors duration-500 group-hover:text-white
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-gray-600 text-sm leading-relaxed relative z-10 
                transition-colors duration-500  group-hover:text-white/90
              "
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
