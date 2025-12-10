"use client";
import { motion } from "framer-motion";
import { Clock, Phone } from "lucide-react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import PhoneIcon from "@/src/animation/call.json";

export default function StoreTimings() {
  return (
    <section
      className="relative bg-[url('/images/background1.png')] bg-cover bg-center bg-fixed py-28"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-[#0072CE]/80 via-[#008CC1]/70 to-[#00A859]/70 backdrop-blur-[1px]"></div>


      <div className="relative max-w-6xl mx-auto px-6 md:px-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] p-10 md:p-14"
        >
      
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-[#0072CE] to-[#00A859] p-3 rounded-full shadow-md">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                Store Timings
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-white/30 pb-3">
                <p className="text-lg text-white/90 font-medium">Pharmacy</p>
                <p className="font-semibold text-[#A7FFEA] text-lg">7 AM – 11 PM</p>
              </div>
              <div className="flex justify-between items-center border-b border-white/30 pb-3">
                <p className="text-lg text-white/90 font-medium">Home Delivery</p>
                <p className="font-semibold text-[#A7FFEA] text-lg">7 AM – 11 PM</p>
              </div>
            </div>
          </div>

   
            <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 text-center md:text-left shadow-inner"
    >
      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
        <div className="relative w-20 h-20 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full "></div>
  <div className="w-14 h-14 bg-gradient-to-br from-[#0072CE] to-[#00A859] rounded-full flex items-center justify-center p-2 relative z-20 overflow-hidden">
 <Lottie
  animationData={PhoneIcon}
  loop
  autoplay
  className="relative z-30"
  style={{
    width: 48,
    height: 48,
    display: "block",
    filter: "brightness(0) invert(1)",
  }}
/>

</div>

        </div>

        <div>
          <h3 className="font-semibold text-xl text-white">
            7403330888, 7403330777
          </h3>
          <p className="text-sm text-white/70">
            Call us anytime for assistance
          </p>
        </div>
      </div>

      <p className="text-white/85 text-base leading-relaxed">
        We’re committed to your health and comfort. Whether it’s pharmacy support or
        doorstep delivery, our team is ready from morning till late night.
      </p>
    </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
