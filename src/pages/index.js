import Image from "next/image";
import Seo from '@/src/components/seo'
import HeroSection from "@/src/components/home/herosection"
import HeroTwo from "@/src/components/home/herotwo"
import ServicesSection from "@/src/components/home/servicessection"
import RghsSection from "@/src/components/home/rghssection"
import StoreTimings from "@/src/components/home/stortime"
import HealthServicesSection from "@/src/components/home/healthservices"
import DentalSpecialist from "@/src/components/home/dentalspecialist"
import AppointmentBanner from "@/src/components/home/appointmentbanner"
import DentalServices from "@/src/components/home/dentalservices"
import Script from "next/script";


export default function Home() {
  return (
    <>
    {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QSHJ2W6SH3"></Script>
      <Script>
       {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-QSHJ2W6SH3')`}
      </Script>
      <Seo
        title="Best dentist in jaipur | #1 Dental clinic jaipur | Pharmacy near me"
        description="Looking for the best dentist in jaipur ? Healthsquare clinic is the #1 dental clinic in jaipur to treat all dental problems. Call us to schedule a visit today!" 
        />
      <main>
        <HeroTwo />
        {/* <HeroSection/> */}

        <ServicesSection />
        <RghsSection />
        <StoreTimings />
        <HealthServicesSection />
        <DentalServices />
        <AppointmentBanner />
        <DentalSpecialist />
      </main>
    </>
  );
}
