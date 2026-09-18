"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  { name: "Skin Care", img: "/images/products/featuredbrand/log-01.png" },
  { name: "Hair Care", img: "/images/products/featuredbrand/log-02.png" },
  { name: "Sexual Wellness", img: "/images/products/featuredbrand/log-03.png" },
  { name: "Oral Care", img: "/images/products/featuredbrand/log-04.png" },
  { name: "Elderly Care", img: "/images/products/featuredbrand/log-05.png" },
  { name: "Baby Care", img: "/images/products/featuredbrand/log-06.png" },
  { name: "Women Care", img: "/images/products/featuredbrand/log-07.png" },
  { name: "Men Grooming", img: "/images/products/featuredbrand/log-08.png" },
  { name: "Mamypoko", img: "/images/products/featuredbrand/log-09.webp" },
  { name: "Volini", img: "/images/products/featuredbrand/log-10.webp" },
  { name: "Vaseline", img: "/images/products/featuredbrand/log-11.webp" },
  { name: "Zandu", img: "/images/products/featuredbrand/Zandu.avif" },
  { name: "Himalaya", img: "/images/products/featuredbrand/Himalaya.avif" },
  { name: "johnsons", img: "/images/products/featuredbrand/johnsons.avif" },
  { name: "Dettol", img: "/images/products/featuredbrand/Dettol.avif" },
  { name: "Cetaphil", img: "/images/products/featuredbrand/Cetaphil.avif" },
];

export default function BrandSlider() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const [paused, setPaused] = useState(false);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    let raf;

    const width = track.scrollWidth / 2;

    const animate = () => {
      if (!paused) {
        pos -= 1.2;

        if (Math.abs(pos) >= width) {
          pos = 0;
        }

        track.style.transform = `translateX(${pos}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [paused]);

  /* ================= UI ================= */

  return (
    <section className="py-14 bg-white overflow-hidden">

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Brands
        </h2>
      </div>

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-4">

        <div
          ref={containerRef}
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-6 w-max py-5"
            style={{ willChange: "transform" }}
          >
            {[...brands, ...brands].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="min-w-[150px] sm:min-w-[170px]"
              >
                {/* Card */}
                <div
                  className="
                    bg-[#F0F1F3] 
                    rounded-xl 
                    border 
                    border-gray-200
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                    p-4
                    flex
                    items-center
                    justify-center
                    hover:border-gray-800
                  "
                >
                  {/* Circle */}
                  <div
                    className="
                      w-24 
                      h-24 
                      rounded-full 
                      bg-white
                      flex 
                      items-center 
                      justify-center
                      border-white
                      shadow-xl
                    "
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

