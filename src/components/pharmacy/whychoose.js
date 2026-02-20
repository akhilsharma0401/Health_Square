"use client";
import React from "react";
import { IoBagAdd } from "react-icons/io5";
import { IoIosRibbon } from "react-icons/io";
import { BsPersonAdd } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    icon: <IoBagAdd className="w-6 h-6 text-blue-500" />,
    title: "Wide Range Of Products",
    text: "From personal care to health and nutrition, we have everything you need in one place.",
  },
  {
    icon: <IoIosRibbon className="w-6 h-6 text-purple-500" />,
    title: "More Top-Quality Brands",
    text: "We stock medicines and healthcare products from leading brands to ensure you get the best.",
  },
  {
    icon: <BsPersonAdd className="w-6 h-6 text-red-500" />,
    title: "Expert Staff",
    text: "Unlike big drug stores with changing staff, our pharma specialists have years of experience in serving patients.",
  },
  {
    icon: <TbTruckDelivery className="w-6 h-6 text-green-500" />,
    title: "Home Delivery",
    text: "Utilize our prompt and reliable home delivery service for all your regular medicinal needs.",
  },
  {
    icon: <FaAddressCard className="w-6 h-6 text-orange-500" />,
    title: "RGHS Empanelled",
    text: "Get authentic medicines with cashless billing under Rajasthan Government Health Scheme (RGHS).",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-200 py-10 md:py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a2b52]">
          Why Choose Health Square Pharmacy ?
        </h2>

        <div className="h-0.5 w-64 bg-[#0a2b52] mx-auto mt-4 rounded"></div>

        <p className="text-gray-800 text-center max-w-2xl mx-auto mt-4 text-lg">
          With Health Square, you get more than just a pharmacy. Here are the
          biggest benefits.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side - Cards */}
        <div>
          <div className="flex flex-col space-y-5">
            {cards.map((card, index) => {
              const cardDiv = (
                <div className="flex items-start bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-full">
                    {card.icon}
                  </div>

                  <div className="ml-4">
                    <h3
                      className={`text-lg font-semibold text-[#0a2b52] ${
                        card.title === "RGHS Empanelled"
                          ? "group-hover:underline"
                          : ""
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-gray-500 text-sm mt-1 ${
                        card.title === "RGHS Empanelled"
                          ? "group-hover:underline"
                          : ""
                      }`}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              );

              // Wrap only RGHS card
              return card.title === "RGHS Empanelled" ? (
                <Link href="/rghs-pharmacy" key={index} className="block ">
                  {cardDiv}
                </Link>
              ) : (
                <div key={index}>{cardDiv}</div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block">
          <div className="relative">
            <Image
              src="/images/pharmacy/pharmacy-01.png"
              alt="Dental Team"
              width={900}
              height={900}
              className="w-full h-[650px] object-cover rounded-tl-[100px] rounded-tr-2xl rounded-br-[100px] shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
