import Image from "next/image";
import Seo from '@/src/components/seo'
import ContactForm from "@/src/components/contactus/formsection"
import HealthSquareFacilities from "@/src/components/contactus/healthsquarefacilities"
import JsonLd, { dentistSchema, pharmacySchema, breadcrumbSchema } from "@/src/components/schema";


export default function Contact() {
  return (
      <>
      <Seo
  title="Contact Us | Health Square Dental Clinic & Pharmacy in Jaipur"
  description="Reach out to Health Square Dental Clinic and Pharmacy in Jaipur. Call, visit, or message us for appointments, dental treatments, and pharmacy support."
  currentUrl="https://healthsquare.in/contact"
/>
      <JsonLd id="page" data={[dentistSchema, pharmacySchema, breadcrumbSchema([{ name: "Contact", path: "/contact" }])]} />

       <main>
      <ContactForm/>
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#005fa3] mb-4">
            Visit Health Square in Jaipur
          </h2>
          <address className="not-italic text-gray-700 leading-relaxed">
            <strong>Health Square</strong>
            <br />
            Vinayak Tower, 22, Ground Floor, Biswa Nagar,
            <br />
            New Sanganer Road, Opp. Metro Pillar No. 75,
            <br />
            Jaipur, Rajasthan 302019, India
            <br />
            Phone: <a href="tel:+917403330888" className="text-[#0070C9] hover:underline">+91 74033 30888</a>
            <br />
            Email: <a href="mailto:info@healthsquare.in" className="text-[#0070C9] hover:underline">info@healthsquare.in</a>
          </address>
          <h3 className="text-lg font-semibold text-[#005fa3] mt-6 mb-2">Opening Hours</h3>
          <p className="text-gray-700">
            Monday – Saturday: 7 AM – 11 PM
            <br />
            Sunday: 11 AM – 4 PM
          </p>
        </div>
        <iframe
          title="Health Square location on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.614948628238!2d75.76515446066838!3d26.883972126567006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5491152ed97%3A0xf73eaf4b91e0e1f3!2sHealth%20Square!5e0!3m2!1sen!2sin!4v1762840582398!5m2!1sen!2sin"
          className="lg:col-span-2 h-[360px] w-full rounded-2xl border-0 shadow-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <HealthSquareFacilities/>
      
      
    </main>
     </>
  );
}