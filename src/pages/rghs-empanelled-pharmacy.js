import Image from "next/image";
import Seo from '@/src/components/seo'
import SectionOne from "@/src/components/rghsempanelled/sectionone"
import SectionTwo from "@/src/components/rghsempanelled/sectiontwo"
import RghsFaq from "@/src/components/rghsempanelled/rghsfaq"


export default function Rghs() {
  return (
      <>
      <Seo
        title="RGHS Explained: Card, Benefits & Free Medicines"
        description="Know everything about the Rajasthan Government Health Scheme (RGHS), card benefits, cashless medicines, and HealthSquare RGHS Pharmacy services."/>
       <main>
      <SectionOne/>
      <SectionTwo/>
        <RghsFaq/>
    
      
      
    </main>
     </>
  );
}
