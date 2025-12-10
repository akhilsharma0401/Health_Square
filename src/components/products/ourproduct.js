"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  FaBaby,
  FaBriefcaseMedical,
  FaStethoscope,
  FaBath,
  FaPumpSoap,
  FaShieldAlt,
  FaBandAid,
  FaTooth,
  FaSprayCan,
  FaHeartbeat,
  FaSun,
} from "react-icons/fa";

import { Code } from "lucide-react";

const categories = [
  { id: "skin-care", name: "Skin Care", icon: <FaBath /> },
  { id: "body-care", name: "Body Care", icon: <FaPumpSoap /> },
  { id: "hair-care", name: "Hair Care", icon: <FaHeartbeat /> }, 
  { id: "hygiene", name: "Personal Hygiene", icon: <FaShieldAlt /> },
  { id: "perfume", name: "Deodorants & Perfumes", icon: <FaSprayCan /> },
  { id: "oral-care", name: "Oral Care", icon: <FaTooth /> },
  { id: "beauty", name: "Sunscreen & Beauty Essentials", icon: <FaSun /> },
  { id: "baby-care", name: "Baby Care", icon: <FaBaby /> },
  { id: "orthopedic", name: "Orthopedic Supports & Brace", icon: <FaBriefcaseMedical /> },
  { id: "medical-devices", name: "Cough And Cold", icon: <FaStethoscope /> },
  { id: "heart-care", name: "Dibeties Care", icon: <FaHeartbeat /> },
];


const products = {
  "skin-care": [
    {
      title: "Best Face Wash & Brightening Products",
      img: "/images/products/skincare/face-wash.jpg",
      desc: "At our pharmacy, we offer a complete range of dermatologist-recommended face care products .“Discover gentle yet effective face washes that remove dirt, oil, pollutants and impurities without harming your skin barrier. We stock trusted brands like Himalaya, Ponds, Garnier, Clean & Clear, Nivea, Everyuth, and Dove—suitable for all skin types, including oily, dry, and sensitive.”",
    },
   
  ],
  "body-care": [
    {
      title: "Premium Body Lotions for All Skin Types.",
      img: "/images/products/bodycare/body-lotion.jpg",
      desc: "Discover a wide range of dermatologist-recommended body lotions at Health Square Pharmacy. From deep nourishment to long-lasting hydration, we offer trusted brands like Nivea, Vaseline, and Biotique to keep your skin soft, smooth, and healthy every day.Whether you need intense moisture, aloe hydration, brightening care, or she butter nourishment, you’ll find the perfect lotion for your skin type—all at affordable prices.Now available in-store at Health Square Pharmacy! Your one-stop destination for genuine skincare and personal care essentials",
    }
    
  ],
  "baby-care": [
    {
      title: "Premium Body Lotions for All Skin Types.",
      img: "/images/products/babycare/baby-lotion.jpg",
      desc: "Discover a wide range of dermatologist-recommended body lotions at Health Square Pharmacy. From deep nourishment to long-lasting hydration, we offer trusted brands like Nivea, Vaseline, and Biotique to keep your skin soft, smooth, and healthy every day.Whether you need intense moisture, aloe hydration, brightening care, or she butter nourishment, you’ll find the perfect lotion for your skin type—all at affordable prices.Now available in-store at Health Square Pharmacy! Your one-stop destination for genuine skincare and personal care essentials",
    }
    
  ],
"hair-care": [
  {
    title: "Hair Care Essentials",
    img: "/images/products/haircare/hair-care.png",
    desc: `Nourish, strengthen, and revive your hair with our wide collection of <strong>top-brand shampoos and oils.</strong> Whether you need deep hydration, natural nourishment, or expert damage repair, we have the perfect products for every hair type.

Choose from trusted brands like <strong> Dove, Bajaj Almond Drops, Garnier Fructis, Patanjali, Navratna, Dabur Amla, Sunsilk, L’Oréal Paris </strong> and more!
      `

  }
],

"hygiene": [
  {
    title: "Essential Personal Care & Hygiene",
    img: "/images/products/hygiene/hygiene-one.png",
    desc: `Stay protected and refreshed every day with our wide range of <strong> top-quality personal care & hygiene essentials. </strong> From gentle<strong> body washes</strong> and<strong>intimate hygiene washes</strong>  to <strong> trusted antiseptic liquids, liquid handwashes, and premium shaving products</strong> , we offer everything you need for complete daily care.

Shop trusted brands like <strong> Dettol, Savlon, Dove, VWash, Gillette </strong> and more — all in one place!
      `

  }
],
"perfume": [
     {
      title: "Top Deodorants & Body Sprays for Long-Lasting Freshness.",
      img: "/images/products/perfume/body-spray.png",
      desc: "Stay confident and fresh all day with our premium collection of deodorants, body sprays, and fragrance mists, now available at Health Square Pharmacy.Choose from leading brands like Nivea, Old Spice, Denver, Beardo, and Godrej Aer—perfect for both men and women. Whether you prefer 48-hour sweat protection, smooth pearl-finish deodorants, or luxurious long-lasting fragrances, we have something for every lifestyle.Shop at Health Square Pharmacy for 100% authentic, dermatologically safe, and long-lasting deodorants.",
    },
],
"oral-care": [
     {
      title: "Oral Care Essentials",
      img: "/images/products/oralcare/dabur-product.png",
      desc: "Maintain a healthy smile with our range of trusted oral care products, including toothpastes, toothbrushes, mouthwashes, floss, and gum care solutions. Choose from leading brands to support fresh breath, cavity protection, and strong oral hygiene—perfect for everyday dental care.",
    },
],
"beauty": [
     {
      title: "Sun Protection Essentials",
      img: "/images/products/beauty/sun-protection.png",
      desc: "Stay protected under the sun with our premium range of SPF 50+ sunscreens, now available at Health Square Pharmacy.We offer trusted brands like Garnier, Biotique, Everyuth, and Pond’s, specially formulated to shield your skin from harmful UVA & UVB rays.Whether you need cooling sunscreen, matte-finish sunblock, hydrating lotion, or brightening SPF creams, we have the perfect option for every skin type.",
    },
],
"orthopedic": [
     {
      title: "Orthopedic Support Essentials",
      img: "/images/products/orthopedic/orthopedic-one.png",
      desc: "At Health Square Pharmacy, we offer a complete range of trusted orthopedic support products to help you recover faster and live pain-free. From cervical collars to arm slings, abdominal binders, posture correctors, and shoulder immobilizers, our collection is designed to provide stability, comfort, and medical-grade support.Whether it’s injury recovery, post-surgery care, or daily support, we’ve got the right product for every need—recommended by physiotherapists and doctors.",
    },
],
"medical-devices": [
     {
      title: "Cough & Cold Relief",
      img: "/images/products/coughcold/coughcold.png",
      desc: "Find fast and effective relief with our range of trusted cough and cold brands including Baidyanath, Cipla Cofsils, Dabur Honitus, Benadryl, and Himalaya. From herbal remedies to fast-acting cough syrups, our pharmacy offers safe, reliable products to soothe sore throat, control cough, ease congestion, and support quicker recovery for the whole family.",
    },
],
"heart-care": [
     {
      title: "Heart & Wellness Supplements",
      img: "/images/products/heartcare/heart-care.png",
      desc: "We offer a trusted range of herbal, homeopathic, and nutrition-based capsules to support heart health, blood sugar balance, cholesterol control, and overall wellness. Choose from leading brands like Himalaya, Garlic Pearls, SBL, Tata 1mg Tejasya, HK Vitals, and Paleo India — all available at our pharmacy for your daily health needs.",
    },
],

};

export default function OurProducts() {
  const [active, setActive] = useState("skin-care");

  const activeProduct = products[active]?.[0]; // first product only

  return (
    <section className="py-20 bg-gradient-to-tr from-gray-100 to-gray-200/60" id="our-products">
      <div className="max-w-7xl mx-auto px-4">
        
    
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Products</h2>

     
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${active === cat.id 
                ? "bg-green-600 text-white shadow-lg scale-105" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"}`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

     
        {activeProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center  py-10 p-6 ">

            {/* LEFT — Product Image */}
            <div className="relative w-full h-[350px]  rounded-xl overflow-hidden ">
              <Image
                src={activeProduct.img}
                alt={activeProduct.title}
                fill
                className="object-cover"
              />
            </div>

      
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                {activeProduct.title}
              </h3>

              <p
                className="text-gray-600 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: activeProduct.desc }}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}




// mulitple products Code



// "use client";
// import { useState, useRef } from "react";
// import Image from "next/image";
// import { FaEye } from "react-icons/fa";
// import Modal from "../../components/modal";
// import {
//   FaBaby,
//   FaBriefcaseMedical,
//   FaStethoscope,
//   FaAppleAlt,
//   FaHandHoldingMedical,
//   FaBandAid,
//   FaShieldAlt,
//   FaHeartbeat,
//   FaTooth,
//   FaPumpSoap,
//   FaBath,
//   FaSun,
//   FaSprayCan,
// } from "react-icons/fa";

// const categories 

// const products 

// export default function OurProducts() {
//   const [active, setActive] = useState("skin-care");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const openModal = (item) => {
//     setSelected(item);
//     setModalOpen(true);
//   };

//   const LENS_SIZE = 150;
//   const ZOOM_LEVEL = 2.5;

//   const imgRef = useRef(null);
//   const [lens, setLens] = useState({
//     x: 0,
//     y: 0,
//     show: false,
//     bgX: 0,
//     bgY: 0,
//   });

//   const [renderedSize, setRenderedSize] = useState({ width: 0, height: 0 });

//   const handleZoom = (e) => {
//     const rect = imgRef.current.getBoundingClientRect();

//     const posX = e.clientX - rect.left;
//     const posY = e.clientY - rect.top;

//     const lensX = posX - LENS_SIZE / 2;
//     const lensY = posY - LENS_SIZE / 2;

//     const bgX = posX * ZOOM_LEVEL - LENS_SIZE / 2;
//     const bgY = posY * ZOOM_LEVEL - LENS_SIZE / 2;

//     setLens({
//       x: lensX,
//       y: lensY,
//       bgX,
//       bgY,
//       show: true,
//     });

//     setRenderedSize({
//       width: rect.width,
//       height: rect.height,
//     });
//   };

//   return (
//     <section
//       className="py-20 bg-gradient-to-tr from-gray-100 to-gray-200/60"
//       id="our-products"
//     >
//       <div className="max-w-7xl mx-auto px-4">
//        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Our Products
//         </h2>


//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setActive(cat.id)}
//               className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full text-sm sm:text-base font-medium transition-all 
//                 ${
//                   active === cat.id
//                     ? "bg-green-600 text-white shadow-lg scale-105"
//                     : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"
//                 }`}
//             >
//               <span className="text-lg">{cat.icon}</span>
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//           {(products[active] || []).map((item, index) => (
//             <div
//               key={index}
//               className="relative bg-white rounded-3xl border cursor-pointer border-gray-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all"
//             >
//               <div className="relative w-full h-60 overflow-hidden">
//                 <Image
//                   src={item.img}
//                   alt={item.title}
//                   quality={100}
//                   fill
//                   className="object-cover transition-all duration-[900ms] ease-out group-hover:scale-110"
//                 />

//                 {/* Eye Overlay */}
//              <div
//                 className="absolute inset-0 bg-[#03AA67]/80 backdrop-blur-[2px] flex flex-col items-center justify-center
//                 opacity-0 translate-y-[-100%] group-hover:opacity-100 group-hover:translate-y-0 
//                 transition-all duration-500 ease-in-out"
//               >
//                 <button
//                   onClick={() => openModal(item)}
//                   className="flex flex-col items-center gap-2"
//                 >
//                   <span className="bg-black/90 p-3 rounded-full cursor-pointer shadow-xl hover:scale-125 active:scale-95 transition-transform duration-300">
//                     <FaEye className="text-white text-2xl" />
//                   </span>

//                   <p className="text-white font-semibold tracking-wide cursor-pointer">Learn More</p>
//                 </button>
//               </div>

//               </div>

//               <div className="p-3 text-center space-y-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {item.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={selected?.title}
//         width="max-w-5xl"
//         showConfirmButton={false}
//         showCancelButton={false}
//       >
//         {selected && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div
//               className="relative w-full h-[420px] overflow-hidden cursor-crosshair"
//               onMouseMove={handleZoom}
//               onMouseEnter={() => setLens((prev) => ({ ...prev, show: true }))}
//               onMouseLeave={() => setLens((prev) => ({ ...prev, show: false }))}
//             >
//               <Image
//                 ref={imgRef}
//                 src={selected.img}
//                 alt="Preview"
//                 fill
//                 className="object-cover"
//               />

//               {lens.show && (
//                 <div
//                   className="absolute rounded-full border-2 border-white pointer-events-none shadow-xl"
//                   style={{
//                     top: lens.y,
//                     left: lens.x,
//                     width: LENS_SIZE,
//                     height: LENS_SIZE,
//                     backgroundImage: `url(${selected.img})`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: `${renderedSize.width * ZOOM_LEVEL}px ${
//                       renderedSize.height * ZOOM_LEVEL
//                     }px`,
//                     backgroundPosition: `-${lens.bgX}px -${lens.bgY}px`,
//                   }}
//                 />
//               )}
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-3xl font-semibold text-gray-800">
//                 {selected.title}
//               </h3>
//              <p
//               className="text-gray-600 leading-relaxed text-lg"
//               dangerouslySetInnerHTML={{ __html: selected.desc }}
//             />

//               <p className="text-4xl font-extrabold text-green-600">
//                 {selected.price}
//               </p>

              
//             </div>
//           </div>
//         )}
//       </Modal>
//     </section>
//   );
// }
