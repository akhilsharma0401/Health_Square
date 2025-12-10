"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
    { src: "/images/services/dental/06-dental-services.png", alt: "Hinge" },
    { src: "/images/services/dental/07-dental-services.png", alt: "SK telecom" },
    { src: "/images/services/dental/08-dental-services.png", alt: "Virgin mobile" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Weight Watchers" },
    { src: "/images/services/dental/06-dental-services.png", alt: "WEF" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Maya" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Docplanner" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Hostelworld" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Socar" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Yahoo" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Luna" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Hinge" },
    { src: "/images/services/dental/06-dental-services.png", alt: "SK telecom" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Virgin mobile" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Weight Watchers" },
    { src: "/images/services/dental/06-dental-services.png", alt: "WEF" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Maya" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Docplanner" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Hostelworld" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Socar" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Yahoo" },
    { src: "/images/services/dental/06-dental-services.png", alt: "Luna" },
  ];

export default function FeaturedSwiper() {


  return (
     <div className="w-full carousel-mask px-4">
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={24}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              allowTouchMove={true}
            >
              {[...logos, ...logos].map((logo, index) => (
                <SwiperSlide key={index} className="SwiperSlide">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className="h-60  w-78    hover:grayscale-0 transition duration-1000 ease-in-out"
                      width={100}  
  height={100}
                  // loading="auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  );
}
