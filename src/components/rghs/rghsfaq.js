"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "What is RGHS?",
    answer:
      "RGHS (Rajasthan Government Health Scheme) offers cashless treatment, free medicines, and healthcare benefits to state employees and pensioners.",
  },
  {
    question: "How to get an RGHS card?",
    answer:
      "Visit the official RGHS portal, log in with your SIPF or Pensioner ID, fill details, upload documents, and download your RGHS card once approved.",
  },
  {
    question: "What are the benefits of RGHS?",
    answer:
      "Free medicines, cashless hospital treatment, diagnostic tests, and family coverage under one card for employees and pensioners.",
  },
  {
    question: "How does RGHS help pensioners?",
    answer:
      "Pensioners get free medicines, lab tests, and home delivery from HealthSquare Pharmacy, making healthcare easy and affordable.",
  },
  {
    question: "What is an RGHS Pharmacy?",
    answer:
      "An RGHS pharmacy is a government-approved store that provides cashless medicines to RGHS cardholders.",
  },
  {
    question: "Is HealthSquare an RGHS-approved pharmacy?",
    answer:
      "Yes. HealthSquare is an RGHS-verified pharmacy offering genuine medicines, digital billing, and doorstep delivery.",
  },
  {
    question: "How to get free medicines under RGHS?",
    answer:
      "Show your RGHS card at any empanelled pharmacy like HealthSquare to get medicines cashlessly — no payment needed.",
  },
  {
    question: "Does RGHS cover family members?",
    answer:
      "Yes. The RGHS card covers your spouse, dependent children, and parents for treatment and medicines.",
  },
  {
    question: "What is the RGHS helpline number?",
    answer:
      "For any issue, call the RGHS toll-free helpline 181 or contact HealthSquare support for pharmacy-related help.",
  },
  {
    question: "Why choose HealthSquare for RGHS services?",
    answer:
      "HealthSquare Pharmacy provides cashless RGHS medicines, home delivery, and 24/7 support — trusted by thousands in Rajasthan.",
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
      className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
    >
      {/* Left FAQ Content */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
          Frequently Asked Questions about RGHS (FAQs)
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {/* Question Row */}
              <div className="flex items-start gap-3">
                {/* Icon on Left */}
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

              {/* Collapsible Answer */}
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

{/* Right Image */}
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
  viewport={{ once: true }}
  className="hidden lg:flex justify-center self-stretch h-full"
>
  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg mt-10">
    <Image
      src="/images/pharmacy/pharmacyfaq.png"
      alt="FAQ illustration"
      fill
      className="object-contain "
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority
    />
  </div>
</motion.div>


    </motion.section>
  );
}
