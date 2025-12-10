"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Health Insurance Proposal UI",
      desc: "Multi-step KYC, dynamic validations, add-ons & premium calc.",
      tech: ["Next.js", "React", "Tailwind"],
      live: "https://vercel.com/gulshangehlot097s-projects",
      img: "/images/projects/health.png",
    },
    {
      id: 2,
      title: "E-commerce Mini Store",
      desc: "Fast product catalog with cart & checkout.",
      tech: ["React", "Node.js", "MongoDB"],
      live: "#",
      img: "/images/projects/store.png",
    },
    {
      id: 3,
      title: "Custom Dashboard",
      desc: "Realtime charts & admin actions for business apps.",
      tech: ["Next.js", "Recharts", "Tailwind"],
      live: "#",
      img: "/images/projects/dashboard.png",
    },
  ];

  const skills = [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Framer Motion",
    "REST / GraphQL",
    "Git",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 antialiased">

      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-300 flex items-center justify-center text-white font-extrabold shadow-md">
            GG
          </div>
          <div>
            <h1 className="text-lg font-semibold">Gulshan Gehlot</h1>
            <p className="text-xs text-slate-500">Full Stack • Multi-tech Developer</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-slate-100 transition">
            <FaLinkedin className="text-slate-600" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-slate-100 transition">
            <FaGithub className="text-slate-600" />
          </a>
          <a href="mailto:gulshan@gmail.com" className="p-2 rounded-md hover:bg-slate-100 transition">
            <FaEnvelope className="text-slate-600" />
          </a>
        </div>
      </nav>


      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
          >
            I build clean, scalable web apps <span className="text-indigo-600">that convert</span>.
          </motion.h2>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-lg text-slate-600 max-w-xl"
          >
            Full‑stack developer — React, Next.js, Node.js. I craft polished, production-ready interfaces
            with reliable backends. Available for freelance and contract work.
          </motion.p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="mailto:gulshan@gmail.com"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-[1.02] transition"
            >
              Hire Me
            </a>
            <a
              href="https://vercel.com/gulshangehlot097s-projects"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 border border-slate-100 rounded-full hover:bg-slate-50 transition"
            >
              View Projects
            </a>
          </div>

 
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((s) => (
              <motion.span key={s} whileHover={{ scale: 1.03 }} className="px-3 py-1 rounded-full bg-white/70 border border-slate-100 text-sm shadow-sm">
                {s}
              </motion.span>
            ))}
          </div>
        </div>


        <div className="w-full max-w-md flex-1">
          <div className="relative bg-white/60 backdrop-blur-md border border-slate-100 rounded-2xl p-6 shadow-lg">
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-60 bg-gradient-to-tr from-indigo-50 to-cyan-50" />
            <div className="relative h-72 w-full rounded-xl overflow-hidden border border-white/40">
              <Image src="/images/hero/hero-light.png" alt="hero" fill className="object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <div>
                <div className="font-medium">Creative Full‑Stack</div>
                <div className="text-xs text-slate-500">React • Next.js • Node</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-indigo-600">Available</div>
                <div className="text-xs text-slate-500">Freelance / Contract</div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-slate-900">What I build</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Business Websites",
              desc: "Responsive, SEO friendly websites for businesses.",
            },
            { title: "E‑commerce", desc: "Fast stores with cart & secure checkout." },
            { title: "Custom Web Apps", desc: "SaaS dashboards & admin panels." },
          ].map((s) => (
            <motion.div key={s.title} whileHover={{ y: -6 }} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-lg font-semibold mb-2 text-slate-900">{s.title}</div>
              <div className="text-sm text-slate-600">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-slate-900">Featured Projects</h3>
          <a href="https://vercel.com/gulshangehlot097s-projects" target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline">
            See all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.a
              key={p.id}
              href={p.live}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              className="group block bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-100 shadow-md"
            >
              <div className="relative h-44 w-full bg-gradient-to-br from-white to-slate-50">
                <Image src={p.img} alt={p.title} fill className="object-cover" />
              </div>

              <div className="p-4">
                <div className="font-semibold text-lg text-slate-900">{p.title}</div>
                <div className="text-sm text-slate-600 mt-2">{p.desc}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs bg-white/70 px-2 py-1 rounded-full border border-slate-100">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

 
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-slate-900">About Me</h3>
            <p className="text-slate-600">I build production ready applications end to end. From pixel-perfect frontends to reliable backends. I love solving problems and shipping features quickly.</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li>• Delivered multiple projects to clients</li>
              <li>• Expert in React & Next.js</li>
              <li>• Comfortable with both SQL & NoSQL</li>
            </ul>

            <div className="mt-6 flex gap-4">
              <a href="mailto:gulshan@gmail.com" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold">Contact</a>
              <a href="https://vercel.com/gulshangehlot097s-projects" className="px-4 py-2 border border-slate-100 rounded-md">Live Projects</a>
            </div>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50 border border-slate-100">
            <Image src="/images/about/me-light.png" alt="me" fill className="object-cover" />
          </div>
        </div>
      </section>

    
      <footer className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100 shadow-sm">
         <div>
  <div className="font-semibold text-lg text-slate-900">Let&apos;s build something</div>
  <div className="text-sm text-slate-600 mt-2">
    Email: <a href="mailto:gulshan@gmail.com" className="text-indigo-600">gulshan@gmail.com</a> • 
    WhatsApp: <a href="tel:8559944976" className="text-indigo-600">8559944976</a>
  </div>
</div>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/918559944976" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-full text-white">
              <FaWhatsapp /> <span>Message on WhatsApp</span>
            </a>
            <a href="/Gulshan_Gehlot_Resume.pdf" className="px-4 py-2 border border-slate-100 rounded-md">Download CV</a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Gulshan Gehlot. All rights reserved.</div>
      </footer>
    </main>
  );
}
