import Image from "next/image";
import Seo from '@/src/components/seo'
import JsonLd, { breadcrumbSchema } from "@/src/components/schema";
import SectionOne from '@/src/components/products/sectionone'
import SectionTwo from '@/src/components/products/sectiontwo'
import ShopByConcern from '@/src/components/products/shopbyconcern'
import OurProducts from '@/src/components/products/ourproduct'
import FeatureBrands from '@/src/components/products/featurebrands'
import FeaturedSwiper from "@/src/components/products/swiper"



export default function Home() {
  return (
      <>
      <Seo
        title="Health & Wellness Products in Jaipur | Health Square Pharmacy"
        description="Shop pharmacy, vitamins, fitness, and wellness products at Health Square ,Jaipur’s trusted pharmacy with fast, reliable doorstep delivery."
        currentUrl="https://healthsquare.in/products"
        />
      <JsonLd id="page" data={breadcrumbSchema([{ name: "Pharmacy", path: "/pharmacy" }, { name: "Health Products", path: "/products" }])} />
       <main>
  {/* <SectionOne /> */}
  <SectionTwo />
  <FeatureBrands />
  <OurProducts />
  <ShopByConcern />
  {/* <FeaturedSwiper /> */}
      
      
    </main>
     </>
  );
}
