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
import JsonLd, { dentistSchema, pharmacySchema, personSchema } from "@/src/components/schema";


export default function Home() {
  return (
    <>
    {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QSHJ2W6SH3"></Script>
      <Script id="gtag-init">
       {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-QSHJ2W6SH3')`}
      </Script>
      <Seo
        title="Health Square Jaipur | Dental Clinic & Pharmacy in Biswa Nagar"
        description="Health Square, Biswa Nagar, Jaipur: a dental clinic led by Dr. Sonal Agarwal and an RGHS-empanelled pharmacy with home delivery. Call 7403330888."
        currentUrl="https://healthsquare.in"
        />
      <JsonLd id="page" data={[dentistSchema, pharmacySchema, personSchema]} />
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
