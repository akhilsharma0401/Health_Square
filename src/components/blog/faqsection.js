"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { sanitizeFaqHtml, unwrapOuterP } from "@/src/utils/sanitizeHtml";

/**
 * Accordion FAQ section for a blog post, driven entirely by the `faqs`
 * array from the API — no hardcoded questions/answers. Renders nothing if
 * `faqs` is missing/empty. Question and answer are HTML from the CMS (may
 * contain <a> links), rendered as-is so links stay intact and clickable.
 *
 * Styling matches the existing service-page FAQ accordion exactly (same
 * section wrapper, card, and chevron design) for visual consistency
 * across the site.
 */
export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  const items = faqs.filter((faq) => sanitizeFaqHtml(faq?.question || ""));
  if (items.length === 0) return null;

  return (
    <section className="relative">
      <div className="mx-auto mb-10 h-6 w-40 rounded-b-[999px] bg-gradient-to-r from-[#03AB68]/40 via-[#0E76CD]/40 to-[#03AB68]/40" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#F0F7FF] via-white to-[#F0FFF7] rounded-3xl shadow-2xl border border-[#DDEBFF] p-8 md:p-10"
      >
        <h2 className="text-3xl font-extrabold text-[#0E76CD] text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((faq, i) => (
            <FAQItem
              key={i}
              i={i}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              question={sanitizeFaqHtml(faq?.question || "")}
              answer={sanitizeFaqHtml(faq?.answer || "")}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FAQItem({ i, openIndex, setOpenIndex, question, answer }) {
  const open = openIndex === i;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-[#E4F0FF] shadow-sm hover:shadow-md transition"
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpenIndex(open ? null : i)}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-gray-900"
        >
          <span
            className="[&_a]:text-[#0E76CD] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: unwrapOuterP(question) }}
          />
          <FiChevronDown
            className={`shrink-0 text-[#03AB68] transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <motion.div
        id={`faq-panel-${i}`}
        role="region"
        initial={false}
        animate={
          open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-[#F1F6FF]"
      >
        <div
          className="px-6 py-4 text-gray-700 [&_p]:m-0 [&_a]:text-[#0E76CD] [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </motion.div>
    </motion.div>
  );
}
