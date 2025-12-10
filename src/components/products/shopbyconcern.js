"use client";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ShopByConcern() {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const [zoomState, setZoomState] = useState({
    activeIndex: null,
    x: 50,
    y: 50,
  });

  const concerns = [
    { name: "Dibaties care ", img: "/images/products/shopbyconcern/dibatiescare.png" },
    { name: "Oral care ", img: "/images/products/shopbyconcern/oralcare.png" },
    { name: "Derma care", img: "/images/products/shopbyconcern/dermacare.png" },
    { name: "joint care ", img: "/images/products/shopbyconcern/jointcare.png" },
    { name: "heart care", img: "/images/products/shopbyconcern/heartcare.png" },
  ];

  const loopedConcerns = [...concerns, ...concerns];

  // Detect card width
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 32);
    }
  }, []);

  // Start from center
  useEffect(() => {
    const container = scrollRef.current;
    if (container && cardWidth) {
      const halfWidth = (loopedConcerns.length / 2) * cardWidth;
      container.scrollLeft = halfWidth;
    }
  }, [cardWidth]);

  // ⭐ FIXED INFINITE SCROLL LOGIC
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container || !cardWidth) return;

    const move = direction === "left" ? -cardWidth : cardWidth;
    const halfWidth = (loopedConcerns.length / 2) * cardWidth;

    container.scrollBy({ left: move, behavior: "smooth" });

    setTimeout(() => {
      let sl = container.scrollLeft;

      // If user reaches second half → instantly shift back
      if (sl >= halfWidth) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = sl - halfWidth;
        container.style.scrollBehavior = "smooth";
      }

      // If user reaches before start → jump forward
      if (sl < 0) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = sl + halfWidth;
        container.style.scrollBehavior = "smooth";
      }
    }, 320);
  };

  const handleZoomMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomState({ activeIndex: index, x, y });
  };

  const handleZoomLeave = () => {
    setZoomState({ activeIndex: null, x: 50, y: 50 });
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Shop by Concern</h2>
        <p className="text-gray-500 mt-2 text-base">
          Choose your health priority and explore expert care
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center px-10">

        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 hover:bg-green-50 shadow-md p-3 rounded-full z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* CARDS WRAPPER */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden scroll-smooth 
          [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        >
          {loopedConcerns.map((item, i) => (
            <div
              key={i}
              ref={i === 0 ? cardRef : null}
              className="relative flex flex-col items-center 
              min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
            >
              <div
                className="relative w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 
                flex items-center justify-center bg-white border border-[#E6EBF4] 
                rounded-2xl overflow-hidden cursor-zoom-in"
                onMouseMove={(e) => handleZoomMove(e, i)}
                onMouseLeave={handleZoomLeave}
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className={`object-contain ${
                    zoomState.activeIndex === i ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-150`}
                />

                {zoomState.activeIndex === i && (
                  <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.img})`,
                      backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
                      backgroundSize: "260%",
                    }}
                  />
                )}
              </div>

              <p className="text-gray-800 mt-4 font-semibold text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-300 
          hover:bg-green-50 shadow-md p-3 rounded-full z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
