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
 */
export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <section className="relative bg-gradient-to-b from-[#f8fbff] to-white py-10 md:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="inline-block bg-[#1F4C7A] text-white text-2xl sm:text-3xl font-extrabold px-6 py-2 rounded-md mb-8 sm:mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const question = sanitizeFaqHtml(faq?.question || "");
            const answer = sanitizeFaqHtml(faq?.answer || "");
            if (!question) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="bg-white rounded-2xl border border-[#E4F0FF] shadow-sm hover:shadow-md transition"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left font-semibold text-slate-900"
                  >
                    <span
                      className="[&_a]:text-[#0E76CD] [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: unwrapOuterP(question),
                      }}
                    />
                    <FiChevronDown
                      className={`shrink-0 text-[#03AB68] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>
                </h3>

                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  initial={false}
                  animate={
                    open
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-[#F1F6FF]"
                >
                  <div
                    className="px-5 sm:px-6 py-4 text-slate-700 prose prose-slate max-w-none [&_p]:m-0 [&_a]:text-[#0E76CD] [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
