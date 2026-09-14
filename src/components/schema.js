import Head from "next/head";

export const SITE_URL = "https://healthsquare.in";

// Single source of truth for NAP + hours. Keep in sync with the Google Business Profile.
export const BUSINESS = {
  name: "Health Square",
  phone: "+91-7403330888",
  email: "info@healthsquare.in",
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Vinayak Tower, 22, Ground Floor, Biswa Nagar, New Sanganer Road, Opp. Metro Pillar No. 75",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302019",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.8839801,
    longitude: 75.7677403,
  },
  openingHours: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "16:00",
    },
  ],
  areaServed: { "@type": "City", name: "Jaipur" },
  sameAs: [
    "https://www.facebook.com/healthsquarejaipur",
    "https://www.instagram.com/healthsquarejaipur/",
  ],
};

const ORG_ID = `${SITE_URL}/#organization`;
const DENTIST_ID = `${SITE_URL}/#dentist`;
const PHARMACY_ID = `${SITE_URL}/#pharmacy`;
const PERSON_ID = `${SITE_URL}/#dr-sonal-agarwal`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: BUSINESS.logo },
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  address: BUSINESS.address,
  sameAs: BUSINESS.sameAs,
};

const localBusinessBase = {
  image: BUSINESS.logo,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: BUSINESS.address,
  geo: BUSINESS.geo,
  openingHoursSpecification: BUSINESS.openingHours,
  areaServed: BUSINESS.areaServed,
  parentOrganization: { "@id": ORG_ID },
  sameAs: BUSINESS.sameAs,
};

export const dentistSchema = {
  "@type": "Dentist",
  "@id": DENTIST_ID,
  name: "Health Square Dental Clinic",
  url: `${SITE_URL}/services`,
  ...localBusinessBase,
  employee: { "@id": PERSON_ID },
};

export const pharmacySchema = {
  "@type": "Pharmacy",
  "@id": PHARMACY_ID,
  name: "Health Square Pharmacy",
  url: `${SITE_URL}/pharmacy`,
  ...localBusinessBase,
};

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Dr. Sonal Agarwal",
  honorificPrefix: "Dr.",
  jobTitle: "Dentist",
  image: `${SITE_URL}/images/profile.jpg`,
  worksFor: { "@id": DENTIST_ID },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Rajasthan University of Health Sciences (RUHS)",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Bachelor of Dental Surgery (BDS)",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Rajasthan University of Health Sciences (RUHS)",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Fellowship in Aesthetic and Cosmetic Dentistry, New Delhi",
    },
  ],
};

export function faqSchema(faqs = []) {
  const items = faqs.filter(
    (f) => typeof f.question === "string" && typeof f.answer === "string"
  );
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// items: [{ name, path }] — Home is prepended automatically.
export function breadcrumbSchema(items = []) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export default function JsonLd({ id, data }) {
  const graph = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!graph.length) return null;
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
  return (
    <Head>
      <script
        key={`jsonld-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    </Head>
  );
}
