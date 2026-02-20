import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#03254C] via-[#052E5E] to-[#041C32] text-white w-full">
      <div className="w-full h-[2px] bg-gradient-to-r from-[#00C6FF] via-[#0072FF] to-[#00C6FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col justify-start">
          <Link href="/" className="mb-3">
            <Image
              src="/images/footerlogo.png"
              alt="Health Square Logo"
              width={180}
              height={60}
              priority
              quality={90}
              sizes="180px"
              className="object-contain w-[180px] h-auto"
            />
          </Link>

          <p className="text-gray-300 text-sm leading-relaxed">
            Health Square is a modern dental clinic and pharmacy equipped with
            world-class technology. We ensure premium care, expert consultations,
            and home delivery of medical supplies from{" "}
            <span className="text-[#00A859] font-semibold">7 AM – 11 PM</span>.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#00A859]">
            Contact Info
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-[#00A859] mt-1 flex-shrink-0" />
              <span>
                Vinayak Tower, 22, Ground Floor, Biswa Nagar, New Sanganer Road,
                Opp. Metro Pillar no. 75, Jaipur, Rajasthan - 302019
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-[#00A859]" />
              <span>
                <Link
                  href="tel:7403330888"
                  className="hover:underline font-medium"
                >
                  7403330888
                </Link>{" "}
                {" "}
                
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-[#00A859]" />
              <Link
                href="mailto:info@healthsquare.in"
                className="hover:underline break-all sm:break-normal"
              >
                info@healthsquare.in
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#00A859]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Dental Care Services", path: "/services" },
              { name: "Pharmacy", path: "/pharmacy" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center gap-2 hover:text-[#00A859] transition-all duration-300"
                >
                  <span className="text-[#00A859]">➜</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-[#00A859]">
            Stay Updated
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Subscribe to our newsletter for health tips, offers, and updates.
          </p>

          <form className="w-full flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 w-full bg-white/10 border border-white/20 text-white 
                         placeholder-gray-400 rounded-full px-4 py-2 text-sm 
                         focus:outline-none focus:border-[#00A859]"
            />
            <button
              type="submit"
              className="bg-[#00A859] hover:bg-[#0E76CD] text-white px-5 py-2 rounded-full 
                         text-sm font-semibold transition-all duration-300 hover:scale-105 
                         w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-3">
            {[
              {
                icon: <FaFacebookF />,
                color: "#1877F2",
                link: "https://www.facebook.com/healthsquarejaipur",
              },
              {
                icon: <FaInstagram />,
                color: "#E4405F",
                link: "https://www.instagram.com/healthsquarejaipur/",
              },
              {
                icon: <FaWhatsapp />,
                color: "#25D366",
                link: "https://wa.me/7403330888",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 
                           hover:scale-110 transition-all duration-300"
                style={{ color: "white" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = s.color)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)")
                }
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-4 py-3 text-center text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} Health Square — All Rights Reserved |
        Powered by{" "}
        <Link
          href="https://proactivedigital.in"
          className="text-[#00A859] hover:underline"
        >
          Proactive Professional Services Pvt Ltd
        </Link>
      </div>
    </footer>
  );
}
