// import Lottie from "lottie-react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ErrorAnimation from "@/src/animation/404alt.json";
import Link from "next/link";

export default function Custom404() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#f4fcff] via-[#f8fffc] to-white overflow-hidden px-4 sm:px-6 py-12 sm:py-16">

      <div className="absolute -top-24 -left-24 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-28 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] bg-green-300/20 rounded-full blur-3xl animate-pulse"></div>


      <div className="absolute top-[10%] right-[12%] w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-blue-200/40 animate-bounce-slow"></div>
      <div className="absolute bottom-[12%] left-[10%] w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-green-200/40 animate-bounce-slow"></div>


      <div className="relative z-10 w-full max-w-[92%] sm:max-w-md lg:max-w-lg bg-white/70 backdrop-blur-xl shadow-[0_8px_50px_rgba(0,0,0,0.08)] border border-white/40 rounded-3xl p-6 sm:p-10 md:p-12 text-center">
        <Lottie animationData={ErrorAnimation} loop className="" />

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 ">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 mt-3 leading-relaxed max-w-md mx-auto text-sm sm:text-base">
          Looks like this page went for a quick health check-up 🩺 Let’s bring
          you back to where everything feels just right.
        </p>

  
        <Link
          href="/"
          className="mt-8 inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-full text-white font-semibold text-base sm:text-lg bg-gradient-to-r from-[#007bff] to-[#00b864] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Back to Home 🏡
        </Link>
      </div>

     
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="currentColor"
          className="text-[#e8f9ff] w-full h-auto"
        >
          <path d="M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
