"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import dynamic from "next/dynamic";


const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);
import arrowAnimation from "@/src/animation/arrowright.json";
import {
  FaSmile,
  FaTooth,
  FaChild,
  FaTeethOpen,
  FaUserMd,
  FaCrown,
  FaSyringe,
  FaHandScissors,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Dental Care Services",
      path: "/services",
      submenu: [
        {
          name: "Smile Design",
          path: "/services/smile-design",
          icon: <FaSmile />,
        },
        {
          name: "Root Canal Treatment",
          path: "/services/advanced-root-canal-treatment",
          icon: <FaTooth />,
        },
        {
          name: "Child Dental Care",
          path: "/services/child-dental-care",
          icon: <FaChild />,
        },
        {
          name: "Teeth Whitening",
          path: "/services/teeth-whitening",
          icon: <FaTeethOpen />,
        },
        {
          name: "Full Mouth Rehab",
          path: "/services/full-mouth-rehabilitation",
          icon: <FaUserMd />,
        },
        {
          name: "Veneers & Crown",
          path: "/services/veneers-and-crown",
          icon: <FaCrown />,
        },
        {
          name: "Tooth Implant",
          path: "/services/tooth-implant",
          icon: <FaSyringe />,
        },
        {
          name: "Tooth Extraction",
          path: "/services/tooth-extraction",
          icon: <FaHandScissors />,
        },
      ],
    },
    { name: "Pharmacy", path: "/pharmacy" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 w-full z-40">
        <div
          className={`text-gray-100 text-sm transition-all duration-500 ease-in-out ${
            isScrolled
              ? "-translate-y-full opacity-0"
              : "bg-gradient-to-r from-[#0E76CD] to-[#00A859] text-white translate-y-0 opacity-100"
          }`}
        >
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between text-center md:text-left py-2 md:py-2 space-y-2 md:space-y-0 gap-2 overflow-hidden">
            {/* Left Section */}
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-start text-[11px] sm:text-xs md:text-sm gap-1 sm:gap-3 leading-tight">
              <div className="flex flex-wrap justify-center items-center gap-x-1">
                <span>Call Us Today!</span>
                <Link
                  href="tel:7403330888"
                  className="hover:underline font-medium"
                >
                  7403330888
                </Link>
                <span>,</span>
                <Link
                  href="tel:7403330777"
                  className="hover:underline font-medium"
                >
                  7403330777
                </Link>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1">
                <FaEnvelope className="text-white text-[15px]" />
                <Link
                  href="mailto:info@healthsquare.in"
                  className="hover:underline break-all sm:break-normal"
                >
                  info@healthsquare.in
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-white text-xs sm:text-sm mt-1 md:mt-0">
              <span className="hidden sm:inline">Follow us:</span>
              <Link
                href="https://www.facebook.com/healthsquarejaipur"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-[#0E79D0] transition-colors text-[15px]" />
              </Link>
              <Link
                href="https://www.instagram.com/healthsquarejaipur/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-[#0E79D0] transition-colors text-[15px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`w-full  bg-white sticky top-0 z-50 transition-all md:mt-10 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between px-1 sm:px-3 lg:px-4 h-[110px]">
          <div className="flex items-center">
            <Link href="/" className="relative shrink-0 z-50">
              <Image
                src="/images/logo.png"
                alt="Health Square Logo"
                width={286}
                height={83}
                priority
                quality={90}
                className="object-contain w-[286px] h-[100px] transition-transform duration-200 hover:scale-105"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center ml-3 mr-10">
            <ul className="flex items-center bg-[#E8F4FF] rounded-full px-8 py-2 space-x-6 xl:space-x-10 relative">
              {menu.map((item) => (
                <li key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-1 cursor-pointer text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                          pathname.startsWith(item.path)
                            ? "text-[#00A859]"
                            : "text-[#0E76CD] hover:text-[#00A859]"
                        }`}
                      >
                        {item.name}
                        <FiChevronDown className="mt-[2px]" />
                      </Link>

                      <div className="absolute left-0 top-full mt-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-[500px] z-40">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.submenu.map((sub) => (
                            <Link
                              key={`submenu-${sub.name}`}
                              href={sub.path}
                              className="group/item flex items-center gap-3 px-3 py-2 rounded-md text-[#0E76CD] text-sm font-medium hover:bg-[#0E76CD] transition-all duration-200"
                            >
                              <span className="text-[#00A859] text-base transition-all duration-200 group-hover/item:text-white">
                                {sub.icon}
                              </span>
                              <span className="transition-all duration-200 group-hover/item:text-white">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                        pathname === item.path
                          ? "text-[#00A859]"
                          : "text-[#0E76CD] hover:text-[#00A859]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/appointment"
              className="relative overflow-hidden bg-[#0E76CD] text-white font-semibold px-6 py-2 rounded-full uppercase tracking-wide text-sm shadow-md transition-all duration-500 ease-in-out group inline-block"
            >
              <button className="relative flex items-center cursor-pointer gap-2 z-10 transition-colors duration-500 ease-in-out">
                <span>Book Appointment</span>
                <Player
                  autoplay
                  loop
                  src={arrowAnimation}
                  className="w-6 h-6 filter invert brightness-0 saturate-0"
                />
              </button>
              <span className="absolute inset-0 bg-[#00A859] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="block lg:hidden text-[#0E76CD] text-3xl focus:outline-none z-50"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`lg:hidden bg-white border-t border-gray-200 shadow-md transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
            {menu.map((item) => (
              <div key={item.name} className="w-full">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setSubOpen((prev) =>
                          prev === item.name ? "" : item.name
                        )
                      }
                      className="flex items-center justify-between w-full text-[#0E76CD] font-medium hover:text-[#00A859] transition-all duration-300"
                    >
                      <Link href={item.path} onClick={() => setOpen(false)}>
                        {item.name}
                      </Link>
                      <FiChevronDown
                        className={`transition-transform duration-300 ${
                          subOpen === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {subOpen === item.name && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 pl-2 mt-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={`mob-sub-${sub.name}`}
                            href={sub.path}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 py-1 text-sm text-[#0E76CD] hover:text-[#00A859] transition-all duration-200"
                          >
                            <span className="text-[#00A859]">{sub.icon}</span>
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="text-[#0E76CD] font-medium hover:text-[#00A859] transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="bg-[#0E76CD] text-white px-6 py-2 rounded-full font-medium hover:bg-[#00A859] transition-all duration-300 mt-3"
            >
              Book Appointment →
            </Link>
            
          </div>
        </div>
      </header>
    </>
  );
}
