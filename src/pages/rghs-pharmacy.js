import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "../components/rghs/herosection";
import RGHSFAQ from "../components/rghs/rghsfaq";
import { HiClock } from "react-icons/hi";
import { Ri24HoursFill } from "react-icons/ri";
import { MapPin, Phone, Mail } from "lucide-react";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(260px,0.8fr)] gap-10">
        <div className="space-y-10 text-gray-800 leading-relaxed">
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 md:p-7"
          >
            <p>
              Rajasthan Government Health Scheme (RGHS) is a landmark initiative
              to extend affordable and quality medical care to state government
              staff, pensioners, and dependents. Members are eligible for
              cashless treatment, reduced medicine prices, and impanelled
              hospitals and pharmacies with an RGHS card.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-800 mb-3">
              1. What is RGHS (Rajasthan Government Health Scheme)?
            </h2>
            <p>
              Rajasthan Government Health Scheme (RGHS) is formulated to provide
              medical safety for state government employees and pensioners. It
              brings all the healthcare facilities under a single umbrella,
              including hospitalization, treatment, diagnostics, and pharmacy
              coverage.
            </p>
            <p className="mt-3">
              The scheme is cashless and paperless, with direct settlement
              between hospitals/pharmacies and the state. This renders RGHS
              medicines cashless and treatment entirely hassle-free for the
              beneficiaries.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-white border border-blue-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-3">
              2. How to Apply for an RGHS Card
            </h2>
            <p>
              An RGHS card is necessary to enjoy the benefits under the scheme.
              It&apos;s an ID card and offers access to all the impanelled
              services.
            </p>
            <p className="mt-3 font-medium">Step-by-Step Process:</p>
            <p className="mt-2">
              If you’re a government employee or pensioner in Rajasthan, getting
              your RGHS (Rajasthan Government Health Scheme) card is the first
              step toward accessing free and cashless medical treatment. To
              begin, head over to the official RGHS portal online. From there,
              you’ll need to log in using your SIPF ID if you’re a current
              employee, or your Pensioner ID if you’ve retired. After you log
              in, you will be required to enter your individual details,
              including those of your family members or dependents who are also
              covered under the scheme. Next, you will need to upload a few
              crucial documents, such as your proof of identity and either an
              employment certificate or pension document, based on your
              category. Once all of this is submitted, the application is
              processed by the relevant government department. If all is well,
              your RGHS card will be sanctioned—you can then download and print
              the card from the portal itself. It should be noted that this card
              is not merely a gesture. It&apos;s also compulsory for accessing
              cashless medical care, whether you&apos;re collecting free
              medicines from an RGHS-listed shop or availing treatment from an
              impanelled hospital. Without it, you won&apos;t be able to take
              advantage of the entire gamut of services the scheme provides, so
              ensure you keep it handy and safe.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-600/5 via-emerald-50 to-blue-100 border border-emerald-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-3">
              3. RGHS for Pensioners
            </h2>
            <p>
              The scheme is particularly useful for pensioners, who tend to have
              greater medical requirements after retirement.
            </p>
            <p className="mt-3">
              One of the biggest advantages of the Rajasthan Government Health
              Scheme (RGHS) is its focus on cashless and stress-free healthcare,
              especially for government employees and pensioners. With the RGHS
              card, beneficiaries can access medicines free of cost from any
              empanelled RGHS pharmacy across the state. In addition to
              medicines, the scheme also covers free or heavily subsidised
              diagnostic tests, helping reduce out-of-pocket expenses for
              routine and emergency health checkups. Another important feature
              of RGHS is that it doesn’t just benefit the cardholder—it also
              covers spouses, dependent children, and even parents, ensuring the
              whole family is protected. For senior citizens and pensioners,
              this means peace of mind during retirement, with fewer worries
              about rising medical costs. To make healthcare even more
              convenient, HealthSquare Pharmacy—a trusted name in RGHS
              services—offers home delivery of medicines, transparent digital
              billing, and easy access to RGHS-approved drugs. This makes it
              easier for pensioners and others to receive their prescribed
              medicines without visiting the pharmacy in person, saving time and
              effort while ensuring continued treatment.
            </p>
            <p className="mt-3 font-semibold text-emerald-700">
              More Description For Pensioners - Click Here
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-white border border-emerald-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-3">
              4. Benefits of the RGHS Scheme
            </h2>
            <p>
              The RGHS scheme&apos;s advantages are extensive and encompass
              overall healthcare coverage.
            </p>
            <p className="mt-3">
              The Rajasthan Government Health Scheme (RGHS) offers a wide range
              of health benefits that make medical care more accessible and
              stress-free for government employees, pensioners, and their
              families. One of the key features is cashless hospitalization at
              any RGHS-empanelled hospital, allowing patients to receive
              treatment without the burden of upfront payments. In addition, the
              scheme ensures cashless access to prescribed medicines from
              authorized pharmacies, including HealthSquare Pharmacy—a trusted
              name in RGHS services. HealthSquare Pharmacy not only provides a
              wide range of RGHS-covered medicines but also offers home delivery
              and clear digital billing, making it incredibly convenient,
              especially for elderly patients and pensioners. The RGHS card
              covers both OPD (Outpatient Department) and IPD (Inpatient
              Department) services, so beneficiaries are covered for everything
              from regular doctor visits to hospital admissions. It also
              includes essential diagnostic services, such as lab tests and
              scans, further reducing out-of-pocket expenses. Another major
              advantage is the inclusion of dependents, with spouse, children,
              and parents all eligible for coverage under a single card. For any
              questions or support, RGHS provides a dedicated toll-free
              helpline, ensuring help is always just a phone call away. With
              service providers like HealthSquare Pharmacy working alongside the
              RGHS scheme, accessing quality healthcare has never been easier or
              more efficient.
            </p>
            <p className="mt-3">
              These RGHS scheme benefits ensure that both employees and
              pensioners receive the best medical care without financial burden.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-50 to-blue-50 border border-blue-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-3">
              5. RGHS Pharmacy Services
            </h2>
            <p>
              An RGHS pharmacy is a government-approved pharmacy that is
              eligible to dispense medicines under the scheme. HealthSquare is
              an RGHS empanelled pharmacy, and hence, beneficiaries can access:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Authentic RGHS medicines (branded and generic).</li>
              <li>Cashless billing under the scheme.</li>
              <li>
                Doorstep delivery of medicine for pensioners and employees.
              </li>
              <li>RGHS card query support.</li>
            </ul>
            <p className="mt-3">
              With HealthSquare as your reliable RGHS pharmacy, there is no risk
              of fake medications or billing problems— everything is completely
              verified and transparent.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-white border border-emerald-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-3">
              6. HealthSquare: An RGHS Verified Pharmacy
            </h2>
            <p>
              HealthSquare Pharmacy is a proud RGHS-verified pharmacy, offering
              100% authentic medicines and full commitment to the RGHS Health
              Scheme.
            </p>
            <p className="mt-3 font-medium">Why HealthSquare?</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                Officially verified by the Rajasthan Government Health Scheme.
              </li>
              <li>Seamless, cashless access to RGHS medicines.</li>
              <li>Doorstep delivery of emergency and routine medicines.</li>
              <li>
                Transparent billing, zero hidden costs.24/7 support and
                guidance.
              </li>
            </ul>
            <p className="mt-3">
              Joining HealthSquare helps you make the most of your RGHS card
              benefits.
            </p>
            <p className="mt-1">
              By choosing HealthSquare, you ensure your RGHS card benefits are
              fully utilized.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-600/5 via-emerald-50 to-blue-100 border border-blue-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-3">
              7. RGHS Medicines: Cashless and Accessible
            </h2>
            <p>
              Access to RGHS medicines cashless is one of the largest strengths
              of the scheme. The beneficiaries just have to present their RGHS
              card at an empanelled pharmacy such as HealthSquare, and medicines
              are delivered without actual payment.
            </p>
            <p className="mt-3">
              This center is particularly useful for those patients who need
              long-term medication, e.g., those having diabetes, hypertension,
              or heart disease.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-white border border-emerald-100 p-6 md:p-7"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-blue-900 mb-3">
              8. RGHS Toll-Free Number and Support
            </h2>
            <p>
              To provide a smooth and supportive experience to all its
              beneficiaries, the Rajasthan Government Health Scheme (RGHS)
              provides a special toll-free helpline number — 181. This helpline
              is an important contact for anyone in need of help with
              RGHS-related services. Whether you wish to inquire about your RGHS
              card status, verify empanelled hospitals or chemists, or require
              assistance concerning medication or billing issues, by dialing
              181, you in touch with trained representatives who can assist you.
            </p>
            <p className="mt-3">
              The helpline is also a good means through which you can keep
              yourself updated on newly added benefits under the scheme, as well
              as ongoing information. To this government support, HealthSquare
              Pharmacy adds its own customer helpdesk, specifically tailored to
              help patients navigate the use of RGHS cards, medication
              assistance, and clear billing services. From answering queries
              regarding covered medication to assisting pensioners in their
              entitlements, HealthSquare makes sure that each customer not only
              receives their prescribed care but also the assistance they
              require to utilize the scheme conveniently and confidently.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-100 p-6 md:p-7 space-y-5"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-3">
                9. Additional Benefits with HealthSquare Pharmacy
              </h2>
              <p>
                Apart from the scheme, HealthSquare goes the extra mile to
                assist RGHS beneficiaries:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Urgent medicine priority delivery.</li>
                <li>
                  Advice for new pensioners regarding RGHS for pensioners.
                </li>
                <li>Guidance for new pensioners about RGHS for pensioners.</li>
                <li>
                  Direct communication with the scheme for smooth claim
                  settlement.
                </li>
                <li>
                  Continuous updates about changes in the RGHS health scheme.
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-200">
              <h3 className="text-lg md:text-2xl font-semibold text-emerald-900 mb-3">
                Conclusion
              </h3>
              <p>
                The Rajasthan Government Health Scheme (RGHS) is a comprehensive
                healthcare plan that ensures cashless treatment, discounted
                medicines, and stress-free healthcare services for government
                employees and pensioners.
              </p>
              <p className="mt-3">
                By registering for an RGHS card and choosing an RGHS empanelled
                pharmacy like HealthSquare, you get complete access to RGHS
                medicines cashless, transparent billing, doorstep delivery, and
                reliable support.
              </p>
              <p className="mt-3">
                Whether you are an employee or exploring RGHS for pensioners,
                HealthSquare is here to provide you with trusted and verified
                healthcare support.
              </p>
              <p className="mt-3 font-semibold text-emerald-900">
                Your health is our priority, and with RGHS + HealthSquare,
                you’re always in safe hands.
              </p>
            </div>
          </motion.section>
        </div>

        <aside className="space-y-6 lg:space-y-8 lg:sticky lg:top-24 h-fit">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-emerald-500 to-blue-600 text-white p-6 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <span className="flex gap-3">
              <HiClock className="text-xl mt-1 animate-spin" />
              <h3 className="text-xl font-semibold mb-4 relative z-10">
                Store Timings
              </h3>
            </span>
            <ul className="space-y-2 text-sm tracking-wide relative z-10">
              <li className="flex justify-between">
                <span>Mon – Fri:</span>
                <span>7 AM – 11 PM</span>
              </li>

              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>11:00 AM – 4:00 PM</span>
              </li>
            </ul>
            
             <div className="h-px my-4 bg-white/20" />
             <div className="space-y-3 text-sm">
              <span className="flex gap-3">
              <Ri24HoursFill className="text-xl mt-1 " />
              <h3 className="text-xl font-semibold relative z-10">
               Visit Us Anytime
              </h3>
            </span>
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 mt-1 text-white/90" />
        <p className="leading-relaxed">
          <strong>Health Square</strong><br />
          Vinayak Tower, 22, Ground Floor, Biswa Nagar,<br />
          New Sanganer Road, Opp. Metro Pillar No. 75,<br />
          Jaipur, Rajasthan – 302019
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Phone className="w-5 h-5 text-white/90" />
        <p className="">
        <Link href="tel:7403330888" passHref>
          <span className="hover:underline cursor-pointer">7403330888</span>
        </Link>
        ,{" "}
        <Link href="tel:7403330777" passHref>
          <span className="hover:underline cursor-pointer">7403330777</span>
        </Link>
      </p>
      </div>

      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-white/90" />
        <Link href="mailto:info@healthsquare.in" passHref>
          <span className="hover:underline cursor-pointer">
            info@healthsquare.in
          </span>
        </Link>
      </div>
    </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4"
          >
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3">
              <Image
                src="/rghs-02.png"
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </aside>
        
      </main>


      <RGHSFAQ />
    </>
  );
}
