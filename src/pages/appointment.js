"use client";

import Image from "next/image";
import Seo from "@/src/components/seo";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import { showSuccess, showError } from "@/src/components/toaster";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";
import AppointmentForm from "../components/appointment/appointmentform";

export default function About() {
  return (
    <>
      <Seo
        title="Book Appointment | Health Square Jaipur – Dental Clinic & Pharmacy"
        description="Book your appointment at Health Square Jaipur — trusted dental clinic and pharmacy offering expert care, RGHS cashless treatment & home medicine delivery."
        keywords="Health Square Jaipur appointment, dentist Jaipur, pharmacy Jaipur, RGHS cashless treatment, oral care Jaipur, medicine home delivery"
      />

      <style jsx>{`
        .form-error {
          font-size: 12px;
          color: #ef4444;
          margin-top: 2px;
          line-height: 1.2;
          min-height: 16px;
        }
      `}</style>

      <main>
        <section className="relative w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-br from-[#E6F6FF] via-[#F9FBFF] to-[#FFFFFF] py-12 sm:py-16 md:py-20">
          <div className="absolute -top-10 -left-10 w-56 sm:w-72 h-56 sm:h-72 bg-[#0070C9]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00A6FB]/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 flex flex-col lg:flex-row items-stretch relative z-10 gap-6 sm:gap-8 lg:gap-0">

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex-1 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl lg:rounded-l-3xl lg:rounded-r-none p-5 sm:p-8 md:p-10 border border-gray-100"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0070C9] mb-4">
                Book Your Appointment
              </h1>
              <p className="text-gray-600 mb-8 text-base md:text-[17px] leading-relaxed">
                Experience world-class dental care and pharmacy services under
                one roof. Book your appointment today and take the first step
                towards a healthier, more confident smile.
              </p>

              <AppointmentForm />
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: -80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative flex-1 w-full"
            >
              <div className="relative h-52 sm:h-72 md:h-[520px] lg:h-full rounded-2xl lg:rounded-r-3xl lg:rounded-l-none overflow-hidden shadow-2xl">
                <Image
                  src="/images/appointment/appointment-01.png"
                  alt="Health Square Dental Clinic and Pharmacy Jaipur"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="md:absolute md:bottom-0 md:right-0 w-full md:w-[85%] lg:w-[70%] bg-white/95 backdrop-blur-md border border-[#E0F2FF] rounded-2xl md:rounded-tl-3xl shadow-2xl p-5 sm:p-6 md:p-8 mt-4 md:mt-0">
                <h2 className="text-[#0070C9] font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#0070C9] rounded-full"></span>
                  Visit Us Anytime
                </h2>

                <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#0070C9] text-5xl mt-[2px]" />
                    <p className="mt-3">
                      <strong>Health Square</strong>
                      <br />
                      Vinayak Tower, 22, Ground Floor, Biswa Nagar, New Sanganer
                      Road, Opp. Metro Pillar No. 75, Jaipur, Rajasthan – 302019
                    </p>
                  </li>
                  <li className="flex items-center">
                    <FaPhoneAlt className="text-[#0070C9] text-lg" />
                    <Link href="tel:7403330888" passHref>
                      <span className="hover:underline cursor-pointer ml-3">
                        7403330888
                      </span>
                    </Link>
                    ,{" "}
                    <Link href="tel:7403330777" passHref>
                      <span className="hover:underline cursor-pointer">
                        7403330777
                      </span>
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaEnvelope className="text-[#0070C9] text-lg" />
                    <p>
                      {" "}
                      <Link href="mailto:info@healthsquare.in" passHref>
                        <span className="hover:underline cursor-pointer">
                          info@healthsquare.in
                        </span>
                      </Link>
                    </p>
                  </li>
                </ul>

                <div className="mt-6 border-t border-[#E3EAF5] pt-4">
                  <h3 className="text-[#0070C9] font-semibold mb-2 flex items-center gap-2">
                    <FaClock className="text-[#0070C9] text-lg" />
                    Working Hours
                  </h3>
                  <ul className="text-sm sm:text-base text-gray-700 space-y-1">
                    <li className="flex justify-between">
                      <span>Pharmacy</span>
                      <span className="font-medium">7 AM – 11 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Home Delivery</span>
                      <span className="font-medium">7 AM – 11 PM</span>
                    </li>
                    <li className="flex justify-between border-t border-gray-200 pt-2">
                      <span>Sunday</span>
                      <span className="font-medium">11 AM – 4 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full">
          <iframe
            title="Health Square Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.614948628238!2d75.76515446066838!3d26.883972126567006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5491152ed97%3A0xf73eaf4b91e0e1f3!2sHealth%20Square!5e0!3m2!1sen!2sin!4v1762840582398!5m2!1sen!2sin"
            className="h-[360px] w-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>
    </>
  );
}
