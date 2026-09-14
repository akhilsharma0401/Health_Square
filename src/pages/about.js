import Image from "next/image";
import Seo from '@/src/components/seo'
import FirstAbout from '@/src/components/about/aboutfirstsection'
import SectionTwo from '@/src/components/about/sectiontwo'
import SectionThree from '@/src/components/about/sectionthree'
import AppointmentSection from "@/src/components/about/appointmentsection"
import WhyChoose from "@/src/components/about/whychoosesecond"
import AboutFaq, { faqs as aboutFaqs } from "@/src/components/about/faqsection"
import JsonLd, { dentistSchema, pharmacySchema, personSchema, faqSchema, breadcrumbSchema } from "@/src/components/schema";






export default function About() {
  return (
    <>
      <Seo
        title="About Health Square | Dental Clinic & Pharmacy in Jaipur"
        description="Learn more about Health Square — Jaipur’s trusted dental clinic and pharmacy offering expert care, quality medicines, and complete health solutions."
        currentUrl="https://healthsquare.in/about"
        />
      <JsonLd
        id="page"
        data={[dentistSchema, pharmacySchema, personSchema, faqSchema(aboutFaqs), breadcrumbSchema([{ name: "About", path: "/about" }])]}
      />
      <main>
        <FirstAbout/>
        <SectionTwo/>
        <SectionThree/>
        <WhyChoose/>
        <AppointmentSection/>  
        <AboutFaq/>
      </main>
    </>
  );
}
