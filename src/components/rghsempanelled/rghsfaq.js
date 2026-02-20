"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-4">
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(1)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                What is RGHS (Rajasthan Government Health Scheme)?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 1 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 1 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p className="">
                  Rajasthan Government Health Scheme (RGHS) is formulated to
                  provide medical safety for state government employees and
                  pensioners. It brings all the healthcare facilities under a
                  single umbrella, including hospitalisation, treatment,
                  diagnostics, and pharmacy coverage. The scheme is cashless and
                  paperless, with direct settlement between hospitals/pharmacies
                  and the state. This renders RGHS medicines cashless and
                  treatment entirely hassle-free for the beneficiaries.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(2)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                How to Apply for an RGHS Card?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 2 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 2 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p className="mb-3">
                  RGHS card is necessary to enjoy the benefits under the scheme.
                  It’s an ID card and offers access to all the empanelled
                  services
                </p>

                <p className="mb-3 font-semibold text-gray-800 text-lg">
                  Step-by-Step Process:
                </p>

                <p>
                  If you’re a government employee or pensioner in Rajasthan,
                  getting your RGHS (Rajasthan Government Health Scheme) card is
                  the first step toward accessing free and cashless medical
                  treatment. To begin, head over to the official RGHS portal
                  online. From there, you’ll need to log in using your SIPF ID
                  if you’re a current employee, or your Pensioner ID if you’ve
                  retired. After you log in, you will be required to enter your
                  individual details, including those of your family members or
                  dependents who are also covered under the scheme. Next, you
                  will need to upload a few crucial documents, such as your
                  proof of identity and either an employment certificate or
                  pension document, based on your category. Once all of this is
                  submitted, the application is processed by verification by the
                  relevant government department. If all is well, your RGHS card
                  will be sanctioned—you can then download and print the card
                  from the portal itself. It should be noted that this card is
                  not merely a gesture. It’s also compulsory for accessing
                  cashless medical care, whether you’re collecting free
                  medicines from an RGHS-listed shop or availing treatment from
                  an empanelled hospital. Without it, you won’t be able to take
                  advantage of the entire gamut of services the scheme provides,
                  so ensure you keep it handy and safe.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(3)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                How RGHS benefits pensioners?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 3 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 3 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p className="mb-3">
                  The scheme is particularly useful for pensioners, who tend to
                  have greater medical requirements after retirement.{" "}
                </p>

                <p className="mb-3 font-semibold text-gray-700 text-base">
                  Key Benefits for Pensioners:
                </p>

                <p>
                  One of the biggest advantages of the Rajasthan Government
                  Health Scheme (RGHS) is its focus on cashless and stress-free
                  healthcare, especially for pensioners. With the RGHS card,
                  beneficiaries can access medicines free of cost from any
                  empanelled RGHS pharmacy such as Health Square across the
                  state. In addition to medicines, the scheme also covers free
                  or heavily subsidised diagnostic tests, helping reduce
                  out-of-pocket expenses for routine and emergency health
                  check-ups. For senior citizens and pensioners, this means
                  peace of mind during retirement, with fewer worries about
                  rising medical costs. To make healthcare even more convenient,
                  Health Square Pharmacy—a trusted pharmacy in Jaipur in
                  providing RGHS benefits—offers home delivery of medicines,
                  transparent digital billing and easy access to RGHS-approved
                  medications. This makes it easier for pensioners and others to
                  receive their prescribed medicines without visiting the
                  pharmacy in person, saving time and effort while ensuring
                  continued treatment.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(4)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                What are the benefits of RGHS scheme?{" "}
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 4 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 4 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p>
                  The Rajasthan Government Health Scheme (RGHS) offers a wide
                  range of health benefits that make medical care more
                  accessible and stress-free for government employees,
                  pensioners, and their families. One of the key features is
                  cashless hospitalization at any RGHS-empanelled hospital,
                  allowing patients to receive treatment without the burden of
                  upfront payments. In addition, the scheme ensures cashless
                  access to prescribed medicines from RGHS authorized pharmacy.
                  The RGHS card covers both OPD (Outpatient Department) and IPD
                  (Inpatient Department) services, so beneficiaries are covered
                  for everything from regular doctor visits to hospital
                  admissions. It also includes essential diagnostic services,
                  such as lab tests and scans, further reducing out-of-pocket
                  expenses. Another major advantage is the inclusion of
                  dependents, with spouse, children, and parents all eligible
                  for coverage under a single card. With pharmacies like Health
                  Square, working alongside the RGHS scheme and accessing
                  quality healthcare has never been easier or more efficient.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(5)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                How Health Square offers RGHS benefits to patients?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 5 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 5 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p>
                  Health Square Pharmacy not only provides a wide range of
                  RGHS-covered medicines but also offers home delivery of
                  medicines and cashless billing process, making it incredibly
                  convenient, especially for government employees, elderly
                  patients and pensioners.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(6)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                What services does Health Square provide under RGHS?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 6 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 6 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p className="mb-3">
                  Health Square is an RGHS empanelled pharmacy in Jaipur that is
                  eligible to dispense medicines and cashless billing under the
                  scheme. At Health Square, beneficiaries can access:{" "}
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Authentic RGHS medicines (branded and generic).</li>
                  <li>Cashless billing under the scheme.</li>
                  <li>
                    Doorstep delivery of medicines and health care products.
                  </li>
                  <li>
                    No risk of unauthorized medicines and billing problems.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(7)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                Why should I choose Health Square to get medicines under RGHS
                scheme?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 7 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 7 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p className="mb-3">
                  Health Square Pharmacy is a proud RGHS-verified pharmacy,
                  offering 100% authentic medicines and full commitment to the
                  RGHS Health Scheme.{" "}
                </p>

                <p className="mb-3">You should choose Health Square because:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    It is officially verified by the Rajasthan Government Health
                    Scheme.
                  </li>
                  <li>Seamless, cashless access to RGHS medicines.</li>
                  <li>Doorstep delivery of emergency and routine medicines.</li>
                  <li>
                    Transparent billing, zero hidden costs. 24/7 support and
                    guidance.
                  </li>
                  <li>
                    Health Square helps you make the most of your RGHS card
                    benefits.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(8)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                What is RGHS Toll-Free Support Number?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 8 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 8 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p>
                  To provide a smooth and supportive experience to all its
                  beneficiaries, the Rajasthan Government Health Scheme (RGHS)
                  provides a special toll-free helpline number — 181. The
                  helpline is also a good means through which you can keep
                  yourself updated on newly added benefits under the scheme, as
                  well as ongoing information.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleQuestion(9)}
              className="w-full flex justify-between items-center py-5 text-left hover:opacity-70 transition-opacity"
            >
              <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                How do I contact Health Square for RGHS Support?
              </span>
              <Plus
                className={`flex-shrink-0 w-6 h-6 text-gray-600 transition-transform duration-300 ${
                  openQuestion === 9 ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-600 ease-in-out ${
                openQuestion === 9 ? "max-h-96 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-gray-600 md:text-base text-sm">
                <p>
                  To contact Health Square, simply dial these numbers:
                  +917403330888. You can also drop an email to
                  info@healthsquare.in mentioning your inquiry or visit our
                  store located at 22, Ground Floor, Biswa Nagar, Opp. Metro
                  Pillar No. 75, New Sanganer Road, Jaipur – 302019.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg: mt-16">
          <p>
            <span className="font-bold text-red-600 text-lg">Note: </span>All
            information has been sourced from
            <Link
              href="https://rghs.rajasthan.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold"
            >
              {" "}
              official RGHS website.
            </Link>{" "}
            Please visit the official website to get latest update about the
            scheme.
          </p>
        </div>
      </div>
    </div>
  );
}
