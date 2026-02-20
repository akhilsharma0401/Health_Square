"use client";
import { servicesData } from "@/src/data/service";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi";
import Seo from "@/src/components/seo";
import Link from "next/link";

export default function ServicePage({ service }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Service not found
      </div>
    );
  }
  console.log(service.title)
  return (
    <>
      <Seo
        title={service.metatitle}
        description={service.metadescription}
      />



      <section className="relative h-[78vh] w-full overflow-hidden">
        <Image
          src={service.banner || "/images/appointment.jpg"}
          alt={service.title}
          fill
          priority
          className="object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0E76CD]/70" />
        {/* floating blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#03AB68]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-96 w-96 rounded-full bg-[#0E76CD]/25 blur-3xl" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl w-full text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-sm">
              {service.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-blue-50 leading-relaxed">
              {service.intro}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 relative overflow-hidden cursor-pointer bg-[#03AB68] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all group"
            >
              <Link href="/appointment">
                <span className="relative z-10">Book Appointment</span>
              </Link>
              <span className="absolute inset-0 -translate-x-full bg-[#0E76CD] transition-transform duration-500 group-hover:translate-x-0" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <main className="relative bg-gradient-to-b from-white/90 to-transparent">


        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-24 space-y-10 md:space-y-24">
          <div className="hidden md:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-[#0E76CD]/20 to-transparent" />

          {mounted &&
            service.sections?.map((sec, i) => {
              const leftSide = i % 2 === 0;
              return (
                <motion.section
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -ml-[10px] h-5 w-5 rounded-full border-4 border-white shadow-lg ${leftSide ? "bg-[#03AB68]" : "bg-[#0E76CD]"
                      }`}
                  />

                  <div
                    className={`order-1 ${leftSide ? "md:order-1" : "md:order-2"
                      }`}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <Image
                        src={sec.image || "/images/appointment.jpg"}
                        alt={sec.heading}
                        width={1200}
                        height={800}
                        className="h-[360px] w-full object-cover transform transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <h3 className="absolute bottom-5 left-5 text-white text-2xl font-semibold drop-shadow">
                        {sec.heading}
                      </h3>
                      <span className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#03AB68]/30 blur-2xl" />
                      <span className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#0E76CD]/30 blur-2xl" />
                    </div>
                  </div>

                  <div
                    className={`order-2 ${leftSide ? "md:order-2" : "md:order-1"
                      }`}
                  >
                    <div className="bg-white/85 backdrop-blur-xl border border-[#B7D9FF]/40 rounded-3xl p-7 md:p-8 shadow-xl hover:shadow-2xl transition">
                      {sec.content && (
                        <p className="text-gray-700 leading-relaxed text-[1.05rem] mb-5">
                          {sec.content}
                        </p>
                      )}

                      {sec.list && (
                        <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
                          {sec.list.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 rounded-2xl border border-[#DCEBFF] bg-gradient-to-r from-[#EAF7FF] to-[#F5FFFA] p-4 hover:translate-x-[2px] transition"
                            >
                              <HiCheckCircle
                                className="text-[#03AB68] mt-1 shrink-0"
                                size={22}
                              />
                              <span className="text-gray-800 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.section>
              );
            })}

          {service.faqs?.length > 0 && (
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
                  {service.faqs.map((faq, i) => (
                    <FAQItem
                      key={i}
                      i={i}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-[#CFE6FF] bg-gradient-to-r from-[#E9FFF5] via-white to-[#EAF4FF] shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to Redesign Your Smile?
                </h3>
                <p className="mt-3 text-gray-700 max-w-xl">
                  Experience world-class dental care with our expert team at
                  Health Square Dental Clinic. Book a consultation today and
                  rediscover your confidence.
                </p>
                <div className="mt-6">
                  <button className="px-8 py-3 cursor-pointer bg-gradient-to-r from-[#03AB68] to-[#0E76CD] text-white font-semibold rounded-full shadow-lg hover:scale-[1.03] transition">
                    Schedule a Consultation
                  </button>
                </div>
              </div>

              <div className="relative min-h-[280px] md:min-h-[340px]">
                <Image
                  src="/images/services/smile/smile-06.png"
                  alt="Dr. Sonal Agarwal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white/50 md:to-white/30" />
              </div>
            </div>

            <span className="pointer-events-none absolute -top-10 right-10 h-24 w-24 rounded-full bg-[#0E76CD]/15 blur-2xl" />
            <span className="pointer-events-none absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-[#03AB68]/15 blur-2xl" />
          </motion.section>
        </div>
      </main>
    </>
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
      <button
        onClick={() => setOpenIndex(open ? null : i)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900"
      >
        <span>{question}</span>
        <FiChevronDown
          className={`text-[#03AB68] transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-[#F1F6FF]"
      >
        <div className="px-6 py-4 text-gray-700">{answer}</div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- SSG ---------- */
export async function getStaticPaths() {
  const paths = servicesData.map((service) => ({
    params: { slug: service.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const service = servicesData.find((s) => s.slug === params.slug);
  return { props: { service: service || null } };
}
