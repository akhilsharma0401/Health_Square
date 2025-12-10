import Image from "next/image";
import Seo from '@/src/components/seo'
import SectionOne from '@/src/components/pharmacy/sectionone'
// import SectionTwo from '@/src/components/pharmacy/sectiontwo'
import WhyChooseUs from '@/src/components/pharmacy/whychoose'
import QuestionsSection from '@/src/components/pharmacy/anymoresection'
import HealthSquareFacilities from "@/src/components/contactus/healthsquarefacilities"
import PharmaFaq from '@/src/components/pharmacy/faqsection'
import ServicesSection from '@/src/components/pharmacy/services'




export default function Pharmacy() {
  return (
      <>
    <Seo
  title="Pharmacy | Dental Clinic & Health Services in Jaipur | Health Square"
  description="Get all your dental and pharmacy needs under one roof at Health Square Jaipur. Trusted medicines, expert care, and complete wellness solutions."
/>

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
