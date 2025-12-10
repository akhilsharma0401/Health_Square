"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  {  img: "/images/products/featuredbrand/log-01.png",  },
  {  img: "/images/products/featuredbrand/log-02.png",  },
  { img: "/images/products/featuredbrand/log-03.png",  },
  {  img: "/images/products/featuredbrand/log-04.png",   },
  {  img: "/images/products/featuredbrand/log-05.png",   },
  { img: "/images/products/featuredbrand/log-06.png",  },
  { img: "/images/products/featuredbrand/log-07.png",  },
  { img: "/images/products/featuredbrand/log-08.png",  },
  
];

export default function FeaturedBrand() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    let position = 0;
    let totalWidth = track.scrollWidth / 2; // half track width

    const scroll = () => {
      if (!isPaused && !isDragging) {
        position -= 0.6;
        // When one full loop is gone, reset seamlessly
        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging]);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      setIsPaused(true);
      clearTimeout(container._wheelTimeout);
      container._wheelTimeout = setTimeout(() => setIsPaused(false), 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);


  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    container.style.cursor = "grabbing";
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = containerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      
    >
       <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Featured Brands</h2>
        <p className="text-gray-500 mt-2 text-base">
          Choose your health priority and explore expert care
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 ">
        

        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={trackRef}
            className="flex gap-8 w-max transition-transform duration-500 ease-linear"
            style={{ willChange: "transform" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative min-w-[200px] sm:min-w-[260px] h-[190px] "
              >
                <Image
                  src={brand.img}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                  <h3 className="text-lg font-bold">{brand.name}</h3>
                  <p className="text-sm opacity-90">{brand.desc}</p>
                  <span className="inline-block bg-blue-500 text-xs px-3 py-1 mt-2 rounded-full">
                    {brand.tag}
                  </span>
                </div> */}
              </motion.div>
            ))}
          </div>

          {/* <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div> */}
        </div>
      </div>
    </section>
  );
}
