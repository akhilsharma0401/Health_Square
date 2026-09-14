import Image from "next/image";
import Seo from '@/src/components/seo'
import SectionOne from '@/src/components/pharmacy/sectionone'
// import SectionTwo from '@/src/components/pharmacy/sectiontwo'
import WhyChooseUs from '@/src/components/pharmacy/whychoose'
import QuestionsSection from '@/src/components/pharmacy/anymoresection'
import HealthSquareFacilities from "@/src/components/contactus/healthsquarefacilities"
import PharmaFaq, { faqs as pharmacyFaqs } from '@/src/components/pharmacy/faqsection'
import JsonLd, { pharmacySchema, faqSchema, breadcrumbSchema } from "@/src/components/schema";
import ServicesSection from '@/src/components/pharmacy/services'




export default function Pharmacy() {
  return (
      <>
    <Seo
  title="Pharmacy in Jaipur with Home Delivery | Health Square Pharmacy"
  description="Health Square Pharmacy, Biswa Nagar, Jaipur: genuine medicines, healthcare products and home delivery. Open Mon–Sat 7 AM–11 PM, Sun 11 AM–4 PM."
  currentUrl="https://healthsquare.in/pharmacy"
/>
      <JsonLd id="page" data={[pharmacySchema, faqSchema(pharmacyFaqs), breadcrumbSchema([{ name: "Pharmacy", path: "/pharmacy" }])]} />

       <main>
     <SectionOne/>
    
     {/* <SectionTwo/>   */}
      <ServicesSection/>
     <WhyChooseUs/>  
     <QuestionsSection/>  
     <HealthSquareFacilities/>  
     <PharmaFaq/>

      
      
    </main>
     </>
  );
}
