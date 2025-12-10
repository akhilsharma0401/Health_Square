"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "How do I order medicines online from Health Square Pharmacy?",
    answer:
      "Ordering is easy. Give us a call or connect with us on WhatsApp, share your requirements & address, and allow us to fulfil your order! We will shortly deliver it to your doorstep.",
  },
  {
    question: "Is online medicine delivery safe?",
    answer:
      "Absolutely! We ensure that all medicines and products sold through our platform are thoroughly inspected for authenticity and quality. Our delivery team follows strict safety protocols to guarantee the best service.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including cash on delivery, credit/debit cards, and mobile payment options like UPI. You can choose the payment method that is most convenient for you.",
  },
  {
    question: "Do you offer express delivery?",
    answer:
      "Yes, we provide express delivery in select areas of Jaipur. Depending on your location, your order can be delivered in as little as 1 hour.",
  },
  {
    question: "How can I check the availability of a specific product?",
    answer:
      "You can check the availability of specific products by visiting our website or calling us directly at +91 74033 30888. Our staff will provide you with the latest information on stock availability.",
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
        {/* <p className="text-base font-bold text-gray-800 mb-2">Our FAQ</p> */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-8">
         Frequently Asked Questions about Pharmacy in Jaipur (FAQs)
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

              {/* Smooth Collapsible Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : -5,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
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
  className="hidden lg:flex justify-center self-start"
>
  <div className="relative w-full max-w-md h-[500px] rounded-2xl overflow-hidden shadow-lg">
    <Image
      src="/images/pharmacy/pharmacyfaq.png"
      alt="FAQ illustration"
      fill
      className="object-cover rounded-2xl"
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority
    />
  </div>
</motion.div>
    </motion.section>
  );
}