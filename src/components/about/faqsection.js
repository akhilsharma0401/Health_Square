"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "How do I order medicines?",
    answer:
      "You can avail of our home delivery service to order all your medical supplies from our pharmacy in Jaipur by calling us at +91 7403330888.",
  },
  {
    question: "Is this a 24/7 pharmacy?",
    answer:
      "The Health Square Pharmacy is open from 7 AM to 11 PM every day. That’s 7 AM to 11 PM, seven days a week, twelve months a year.",
  },
  {
    question: "Is Health Square child-friendly?",
    answer:
      "Health Square offers specialized child dental care services and our team of medical professionals is well-versed in working with children with care and compassion while keeping them as calm as possible.",
  },
  {
    question: "Are the Dentists at Health Square qualified and experienced?",
    answer:
      "Our head dentist, Dr. Sonal Agarwal is certified, well-qualified, and has almost a decade of experience in performing Health Square’s full range of dental procedures.",
  },
  {
    question: "Where is Health Square located?",
    answer:
      "Health Square is located at 22, Ground Floor, Biswa Nagar, Opp. Metro Pillar No. 75, New Sanganer Road, Jaipur, Rajasthan, India – 302019",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
    >
      <div>
        {/* <p className="text-base font-bold text-gray-800 mb-2">Our FAQ</p> */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="mt-1"
                >
                  <Plus className="text-blue-500 w-6 h-6 flex-shrink-0" />
                </motion.div>

                <p className="font-medium text-lg text-gray-800 leading-relaxed">
                  {faq.question}
                </p>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : -5,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="overflow-hidden pl-8"
              >
                <div className="mt-3">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="hidden lg:flex justify-center self-start"
      >
        <div className="relative w-full max-w-md h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/about/aboutfaq.jpg"
            alt="FAQ illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
