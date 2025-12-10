"use client";
import { useEffect, useState,useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Scale, ArrowUp } from "lucide-react";
import Link from "next/link";
import Seo from "@/src/components/seo";

const MotionLink = motion(Link);

function CookieBanner() {
  const KEY = "cookie_consent_v1";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 bottom-5 z-50 mx-auto max-w-3xl rounded-2xl border border-white/50 bg-white/70 backdrop-blur-lg shadow-lg p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-sm text-slate-700"
    >
      <p>
        We use cookies to improve your experience. By using our site, you agree
        to our{" "}
        <Link href="#cookies" className="underline text-blue-600">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            localStorage.setItem(KEY, "yes");
            setShow(false);
          }}
          className="rounded-xl bg-[#0C78D1] text-white px-4 py-1.5 font-medium shadow-sm hover:shadow transition"
        >
          Accept
        </motion.button>
        <MotionLink
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-xl border border-slate-300 px-4 py-1.5 font-medium hover:bg-slate-50 transition"
        >
          Manage
        </MotionLink>
      </div>
    </motion.div>
  );
}

function ScrollSection({ children, ...props }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export default function TermsAndConditions() {
  const lastUpdated = "01 March 2022";
  const [activeId, setActiveId] = useState("overview");

const sections = useMemo(
  () => [
    { id: "overview", label: "Overview" },
    { id: "cookies", label: "Cookies" },
    { id: "license", label: "License" },
    { id: "hyperlinking", label: "Hyperlinking to Our Content" },
    { id: "iframes", label: "iFrames" },
    { id: "liability", label: "Content Liability" },
    { id: "privacy", label: "Your Privacy" },
    { id: "rights", label: "Reservation of Rights" },
    { id: "removal", label: "Removal of Links" },
    { id: "disclaimer", label: "Disclaimer" },
  ],
  []
);







  return (
    <>
  <Seo
  title="Terms & Conditions | Health Square Jaipur – Dental Clinic & Pharmacy"
  description="Read the Terms & Conditions for using Health Square Jaipur’s website and services. Learn about appointments, payments, privacy, and RGHS cashless policies for our dental clinic and pharmacy."
  keywords="Health Square Jaipur terms and conditions, dental clinic policy, pharmacy policy Jaipur, RGHS terms, Health Square privacy policy, clinic rules Jaipur"
/>

      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-gradient-to-br from-[#E6F8FF] via-white to-[#F0FFF8] overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[10%] h-72 w-72 bg-[#00B4D8]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] h-96 w-96 bg-[#34D399]/20 blur-3xl rounded-full" />
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-20">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-lg border border-white/60 shadow-lg p-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E0F7FA]/40 to-[#E6FFFA]/30" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-slate-200 px-3 py-1 text-xs text-slate-600 shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#00B4D8] to-[#34D399]" />
                Trusted Healthcare Partner
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 ">
                Terms & Conditions
              </h1>
              <p className="mt-3 max-w-2xl text-slate-700 leading-relaxed">
                By accessing or using www.healthsquare.in, you agree to these
                Terms and Conditions. Please read them carefully.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-700">
                  Last Updated: {lastUpdated}
                </span>
                <Link
                  href="#overview"
                  className="rounded-full bg-[#0C78D1] text-white px-4 py-1.5 hover:shadow-md transition"
                >
                  Start Reading
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="w-full max-w-md grid grid-cols-2 gap-3">
                <CardLink
                  href="#license"
                  icon={<FileText />}
                  title="Usage & IP"
                  desc="Rights & Restrictions"
                />
                <CardLink
                  href="#liability"
                  icon={<Scale />}
                  title="Liability"
                  desc="Limits & Disclaimers"
                />
              </div>
            </div>
          </div>
        </motion.header>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10">
          <aside className="hidden lg:block sticky top-28 self-start">
            <nav className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 shadow-sm p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-slate-500 font-medium">
                On this page
              </div>
              <ul className="space-y-1 text-sm">
                {sections.map((s) => (
                  <MotionLink
                    key={s.id}
                    href={`#${s.id}`}
                    whileHover={{ x: 3 }}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition ${
                      activeId === s.id
                        ? "bg-gradient-to-r from-[#E0F7FA] to-[#E6FFFA] text-slate-900 font-medium"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        activeId === s.id ? "bg-[#00B4D8]" : "bg-slate-300"
                      }`}
                    />
                    {s.label}
                  </MotionLink>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="relative space-y-10">
            <ScrollSection id="overview" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Overview
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Welcome to www.healthsquare.in! These terms and conditions
                outline the rules and regulations for the use of Health Square’s
                Website, located at https://www.healthsquare.in. By accessing
                this website, you accept these terms and conditions in full.
                Do not continue to use www.healthsquare.in if you do not agree
                with all the terms and conditions stated on this page.
              </p>
            </ScrollSection>

            <ScrollSection id="cookies" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Cookies
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We employ the use of cookies. By accessing www.healthsquare.in,
                you agreed to use cookies in agreement with Health Square’s
                Privacy Policy. Cookies help us enhance functionality and
                provide a better browsing experience.
              </p>
            </ScrollSection>

            <ScrollSection id="license" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3 ">
                License
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Unless otherwise stated, Health Square and/or its licensors own
                the intellectual property rights for all material on
                www.healthsquare.in. You may access this for personal use subject
                to restrictions in these terms.
              </p>
              <ul className="list-disc ml-6 text-slate-700">
                <li>Republish material from www.healthsquare.in</li>
                <li>Sell, rent or sub-license material</li>
                <li>Reproduce or redistribute content without permission</li>
              </ul>
            </ScrollSection>

            <ScrollSection id="hyperlinking" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Hyperlinking to Our Content
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Certain organizations such as government agencies, search
                engines, and news outlets may link to our site without prior
                approval. Other organizations must seek approval before linking.
              </p>
            </ScrollSection>

            <ScrollSection id="iframes" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                iFrames
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Without prior approval and written permission, you may not create
                frames around our webpages that alter the visual presentation or
                appearance of our Website.
              </p>
            </ScrollSection>

            <ScrollSection id="liability" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Content Liability
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We are not responsible for any content appearing on your website.
                You agree to defend us against all claims arising from your site.
                No links should appear that are libelous, obscene, or violate
                third-party rights.
              </p>
            </ScrollSection>

            <ScrollSection id="privacy" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Your Privacy
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Please read our <Link href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link> to
                understand how we collect, use, and protect your information.
              </p>
            </ScrollSection>

            <ScrollSection id="rights" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3 ">
                Reservation of Rights
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to request removal of links or modify these
                terms at any time. By continuing to link to our site, you agree
                to follow these terms.
              </p>
            </ScrollSection>

            <ScrollSection id="removal" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Removal of Links
              </h2>
              <p className="text-slate-700 leading-relaxed">
                If any link on our website is found offensive, please contact us.
                We may consider removal requests but are not obligated to act or
                reply directly.
              </p>
            </ScrollSection>

            <ScrollSection id="disclaimer" className="rounded-3xl bg-white/80 backdrop-blur border border-white/50 shadow p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Disclaimer
              </h2>
              <p className="text-slate-700 leading-relaxed">
                To the maximum extent permitted by law, we exclude all
                representations, warranties, and conditions relating to our
                website and its use. As long as the website and its information
                are provided free of charge, we will not be liable for any loss
                or damage of any nature.
              </p>
            </ScrollSection>

            <MotionLink
              href="#overview"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-[#0C78D1] text-white px-4 py-2 shadow-lg hover:shadow-xl transition"
            >
              <ArrowUp className="h-4 w-4" />
              Top
            </MotionLink>
          </article>
        </div>

        <CookieBanner />
      </main>
    </>
  );
}

function CardLink({ href, icon, title, desc }) {
  return (
    <MotionLink
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group rounded-2xl border border-white/60 bg-white/70 backdrop-blur shadow-sm hover:shadow-md p-4 transition"
    >
      <div className="text-[#00B4D8] group-hover:text-[#34D399]">{icon}</div>
      <div className="mt-1 text-sm font-medium text-slate-800">{title}</div>
      <p className="text-xs text-slate-500">{desc}</p>
    </MotionLink>
  );
}
