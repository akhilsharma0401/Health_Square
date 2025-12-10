"use client";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import RotatingBadge from "@/src/components/rotatingbadge";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-6 md:px-12">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/hero-pattern.jpg')] bg-[length:800px_800px] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
     
        <div className="flex-1 relative flex flex-col justify-center md:pl-10">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-20 h-[90%] bg-gradient-to-b from-[#e1efff] to-white rounded-full blur-lg opacity-90 md:block hidden"></div>

          <div className="relative z-10">
            <h1 className="text-[42px] md:text-[54px] font-serif text-[#25257e] leading-snug mb-6">
              We Care <br /> Medical &amp; Health
            </h1>
            <p className="text-gray-500 text-base max-w-md mb-8">
              Your One Stop Solution for all your Pharmaceutical and Dental
              Needs.
            </p>

            <button className="inline-flex items-center gap-2 bg-[#0070C9] text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
              Make an Appointment <HiPlus className="text-lg" />
            </button>
          </div>
        </div>


        <div className="flex-1 relative flex justify-center md:justify-end items-center">
          <div className="relative w-[92%] md:w-[500px] h-[340px] md:h-[420px] transform rotate-[-2deg] rounded-2xl overflow-hidden shadow-xl bg-white">
            <Image
              src="/images/appointment.jpg"
              alt="Doctors discussing patient report"
              fill
              className="object-cover"
              priority
            />
          </div>


          <div className="absolute -bottom-10 -left-10">
            <RotatingBadge
   text="HEALTH SQUARE • PHARMACY • DENTAL • "
  size={200}
  speed="med"
  className="text-[#02AA66]"
/>

          </div>
        </div>
      </div>
    </section>
  );
}
