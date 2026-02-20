"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DentalSpecialist() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  const highlightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-labelledby="dental-specialist"
      className="relative bg-gradient-to-br from-[#E6F7FF] via-white to-[#E0F9F0] py-16 md:py-24 overflow-hidden"
    >

      <div className="absolute top-10 left-0 w-72 h-72 bg-[#0072CE]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#00A859]/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full shadow-md overflow-hidden bg-[#E0F9F0]">
              <Image
                src="/images/services/dental/teet-icon.png"
                alt="Tooth Icon"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2
            id="dental-specialist"
            className="text-4xl md:text-5xl font-bold text-[#004B8D] tracking-tight"
          >
            Our Dental Specialist
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#0072CE] to-[#00A859] mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Our experienced and specialized doctor is highly trained in aesthetic
            dentistry from a reputable organization. You can place your trust in her
            years of experience.
          </p>
        </motion.div>


        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-10 md:p-12 relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0072CE]/10 to-[#00A859]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-[#E6F7FF] to-[#E0F9F0] flex items-center justify-center mb-6 shadow-md"
              >
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute -top-3 -right-2 w-10 h-10 bg-[#E6F7FF] rounded-full flex items-center justify-center shadow-sm">
                    <Image
                      src="/images/services/dental/teet-icon.png"
                      alt="Brush Icon"
                      width={22}
                      height={22}
                    />
                  </div>
                  <div className="absolute -bottom-2 -left-3 w-10 h-10 bg-[#E0F9F0] rounded-full flex items-center justify-center shadow-sm">
                    <Image
                      src="/images/services/dental/teet-icon.png"
                      alt="Smile Icon"
                      width={22}
                      height={22}
                    />
                  </div>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E6F7FF] to-[#E0F9F0] shadow-inner overflow-hidden relative">
  <Image
    src="/images/profile.jpg"
    alt="Tooth Icon"
    fill
    className="object-cover"
  />
</div>

                </div>
              </motion.div>

              <h3 className="text-2xl font-semibold text-[#0072CE]">
                Dr. Sonal Agarwal
              </h3>
              <p className="text-gray-700 text-base mt-1 mb-1">Dentist</p>
              <p className="text-[#00A859] font-medium">
                B.D.S., Certified in Aesthetic Dentistry
              </p>
            </div>
          </motion.div>

     
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Meet the Smile Architect ✨
            </h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              With over a decade of experience in dental aesthetics, Dr. Agarwal
              has transformed hundreds of smiles through precision and compassion.
              Her approach combines artistry with science — ensuring every patient
              feels confident in their smile.
            </p>

       
            <motion.div
              className="grid grid-cols-2 gap-5 mt-8"
              initial="hidden"
              whileInView="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              viewport={{ once: true }}
            >
              {[
                { label: "10+ Years", sub: "Experience" },
                { label: "500+", sub: "Happy Patients" },
                { label: "Aesthetic Expert", sub: "Certified" },
                { label: "Gentle Care", sub: "Patient Focused" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={highlightVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-gradient-to-br from-[#E6F7FF] to-[#E0F9F0] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <p className="text-[#0072CE] font-semibold text-lg">
                    {item.label}
                  </p>
                  <p className="text-gray-500 text-sm">{item.sub}</p>
                </motion.div>
              ))}
            </motion.div>

          
          </motion.div>
        </div>
      </div>
    </section>
  );
}
