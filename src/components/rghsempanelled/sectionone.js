
import React from 'react'
import { GiHeartPlus } from "react-icons/gi";
import Image from "next/image";
import Link from 'next/link';



const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-100 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 ">

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
               <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                <span className="">RGHS Pharmacy:</span>
                <br />
               <span className="">Complete Guide to Card, </span>
                <span className="">Benefits & HealthSquare Services</span>
              </h1>
            </div>

            <div>
              <Link href="/services">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-400 cursor-pointer text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                SEE OUR SERVICES
              </button>
              </Link>
            </div>

            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg relative max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Confident
              </h2>
              <p className="text-gray-600 leading-relaxed text-base font-medium">
               Rajasthan Government Health Scheme (RGHS) is a landmark initiative to extend affordable and quality medical care to state government staff, pensioners, and dependents. Members are eligible for cashless treatment, reduced medicine prices, and empaneled hospitals and pharmacies with an RGHS card.
              </p>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-200 via-white to-blue-200 w-20 h-20 rounded-full flex items-center justify-center shadow-xl">
              
                <GiHeartPlus className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full lg:w-1/2 relative">
            <div className="relative">
              <div className=" rounded-3xl pt-8">
               <Image
                  src="/doc.png"
                  alt="Dental Care - Tooth Illustration"
                  width={800}     
                  height={600}      
                  className="w-full h-auto object-contain"
                  priority        
                />
              </div>

              <div className="absolute top-1/3 -left-12 z-20 animate-pulse">
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl flex items-center gap-2">
                  <span className="text-blue-600 font-semibold text-sm">Best Quality Medicines</span>
                </div>
              </div>

              <div className="absolute bottom-1/4 -left-12 z-20 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl flex items-center gap-2">
                  <span className="text-blue-600 font-semibold text-sm">Fast Services</span>
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                  </svg>
                </div>
              </div>


<div className="absolute top-1/4 -right-12 z-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
  <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl flex items-center gap-2">
    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 11.75A1.25 1.25 0 107.75 13 1.25 1.25 0 009 11.75M15 11.75A1.25 1.25 0 1013.75 13 1.25 1.25 0 0015 11.75M12 2A10 10 0 1022 12 10 10 0 0012 2M12 20a8 8 0 118-8 8 8 0 01-8 8M12 17.5a5.51 5.51 0 01-4.6-2.47.5.5 0 01.86-.51A4.5 4.5 0 0012 16.5a4.5 4.5 0 003.74-2 .5.5 0 01.86.51A5.51 5.51 0 0112 17.5z"/>
    </svg>
    <span className="text-blue-600 font-semibold text-sm">Happy Patients</span>
  </div>
</div>

<div className="absolute bottom-1/3 -right-12 z-20 animate-pulse" style={{ animationDelay: '1.5s' }}>
  <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl flex items-center gap-2">
    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
    <span className="text-blue-600 font-semibold text-sm">Expert Care</span>
  </div>
</div>


              <div className="absolute top-10 right-10 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-20 right-16 w-4 h-4 bg-cyan-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 right-8 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page