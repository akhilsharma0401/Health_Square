import Image from "next/image";
import Link from "next/link";

export default function AppointmentBanner() {
  return (
    <section className="relative bg-[#0057B7] text-white h-[380px] flex items-center justify-center overflow-hidden">
      {/* Left Hex Pattern */}
      <div className="absolute left-0 bottom-0 w-[260px] md:w-[340px] opacity-60">
        <Image
          src="/images/lefthex.png"
          alt="Left Hex Pattern"
          width={340}
          height={340}
          className="object-contain"
          priority
        />
      </div>

      {/* Right Hex Pattern */}
      <div className="absolute right-0 top-0 w-[260px] md:w-[340px] opacity-60">
        <Image
          src="/images/righthex.png"
          alt="Right Hex Pattern"
          width={340}
          height={340}
          className="object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Schedule a personal or virtual medical appointment
        </h2>
         <Link href="/appointment" >
        <button className="bg-[#22D3A6] hover:bg-[#1CC096] text-[#0057B7] font-semibold px-6 py-3 rounded-full cursor-pointer shadow-md transition-all">
          Book an Appointment
        </button>
         </Link>
      </div>
    </section>
  );
}
