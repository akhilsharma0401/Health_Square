// "use client";
// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const brands = [
//   {  img: "/images/products/featuredbrand/log-01.png",  },
//   {  img: "/images/products/featuredbrand/log-02.png",  },
//   { img: "/images/products/featuredbrand/log-03.png",  },
//   {  img: "/images/products/featuredbrand/log-04.png",   },
//   {  img: "/images/products/featuredbrand/log-05.png",   },
//   { img: "/images/products/featuredbrand/log-06.png",  },
//   { img: "/images/products/featuredbrand/log-07.png",  },
//   { img: "/images/products/featuredbrand/log-08.png",  },
  
// ];

// export default function FeaturedBrand() {
//   const trackRef = useRef(null);
//   const containerRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     let animationId;
//     let position = 0;
//     let totalWidth = track.scrollWidth / 2; // half track width

//     const scroll = () => {
//       if (!isPaused && !isDragging) {
//         position -= 0.6;
//         // When one full loop is gone, reset seamlessly
//         if (Math.abs(position) >= totalWidth) {
//           position = 0;
//         }
//         track.style.transform = `translateX(${position}px)`;
//       }
//       animationId = requestAnimationFrame(scroll);
//     };

//     animationId = requestAnimationFrame(scroll);
//     return () => cancelAnimationFrame(animationId);
//   }, [isPaused, isDragging]);


//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleWheel = (e) => {
//       e.preventDefault();
//       setIsPaused(true);
//       clearTimeout(container._wheelTimeout);
//       container._wheelTimeout = setTimeout(() => setIsPaused(false), 800);
//     };

//     container.addEventListener("wheel", handleWheel, { passive: false });
//     return () => container.removeEventListener("wheel", handleWheel);
//   }, []);


//   const handleMouseDown = (e) => {
//     const container = containerRef.current;
//     if (!container) return;
//     setIsDragging(true);
//     container.style.cursor = "grabbing";
//     setStartX(e.pageX - container.offsetLeft);
//     setScrollLeft(container.scrollLeft);
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     setIsPaused(false);
//     if (containerRef.current) containerRef.current.style.cursor = "grab";
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setIsPaused(false);
//     if (containerRef.current) containerRef.current.style.cursor = "grab";
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const container = containerRef.current;
//     const x = e.pageX - container.offsetLeft;
//     const walk = (x - startX) * 1.5;
//     container.scrollLeft = scrollLeft - walk;
//   };

//   return (
//     <section
//       className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
      
//     >
//        <div className="text-center mb-10">
//         <h2 className="text-4xl font-bold text-gray-900">Featured Brands</h2>
//         <p className="text-gray-500 mt-2 text-base">
//           Choose your health priority and explore expert care
//         </p>
//       </div>
//       <div className="max-w-7xl mx-auto px-4 ">
        

//         <div
//           ref={containerRef}
//           className="relative overflow-hidden cursor-grab select-none"
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//         >
//           <div
//             ref={trackRef}
//             className="flex gap-8 w-max transition-transform duration-500 ease-linear"
//             style={{ willChange: "transform" }}
//           >
//             {[...brands, ...brands].map((brand, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 className="relative min-w-[200px] sm:min-w-[260px] h-[190px] "
//               >
//                 <Image
//                   src={brand.img}
//                   alt={brand.name}
//                   fill
//                   className="object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

//                 {/* <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
//                   <h3 className="text-lg font-bold">{brand.name}</h3>
//                   <p className="text-sm opacity-90">{brand.desc}</p>
//                   <span className="inline-block bg-blue-500 text-xs px-3 py-1 mt-2 rounded-full">
//                     {brand.tag}
//                   </span>
//                 </div> */}
//               </motion.div>
//             ))}
//           </div>

//           {/* <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
//           <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none"></div> */}
//         </div>
//       </div>
//     </section>
//   );
// }






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

