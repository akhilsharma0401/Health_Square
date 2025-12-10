import Image from "next/image";
import Seo from '@/src/components/seo'
import ContactForm from "@/src/components/contactus/formsection"
import HealthSquareFacilities from "@/src/components/contactus/healthsquarefacilities"


export default function Contact() {
  return (
      <>
      <Seo
  title="Contact Us | Health Square Dental Clinic & Pharmacy in Jaipur"
  description="Reach out to Health Square Dental Clinic and Pharmacy in Jaipur. Call, visit, or message us for appointments, dental treatments, and pharmacy support."
/>

       <main>
      <ContactForm/>
      <HealthSquareFacilities/>
      
      
    </main>
     </>
  );
}