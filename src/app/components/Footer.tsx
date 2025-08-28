"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Avoid hydration mismatch by checking after mount
  if (!isMounted || pathname.startsWith("/admin")) {
    return null;
  }

  const companyLinks = [
    { href: "/", label: "HOME" },
    { href: "/product", label: "PRODUCT" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
    { href: "/whereToFind", label: "WHERE TO FIND" },
  ];

  return (
    <>
      <footer className="relative bg-green-100 text-black px-5 pt-12 pb-6 overflow-hidden font-[Alegreya]">
        <div
          className="hidden md:block absolute right-0 top-0 h-full w-48 bg-no-repeat bg-contain bg-right opacity-20"
          style={{ backgroundImage: "url('/images/pattern.png')" }}
        ></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 z-10">
          {/* Left Column */}
          <div className="flex-1">
            <Image
              src="/images/logo.png"
              alt="Coco Khmer Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed text-[#0C5C4C]">
              Coco Khmer - we blend tradition with modern innovation, <br />{" "}
              delivering clean pain relief solutions to soothe, relieve, and
              heal.
            </p>
            <p className="mt-3 font-bold text-sm text-[#0C5C4C]">
              MADE IN CAMBODIA
            </p>
          </div>

          <div className="flex-1 flex  sm:flex-row gap-10">
            <div>
              <h3 className="font-bold mb-2 text-[#0C5C4C]">COMPANY</h3>
              <ul className="space-y-1 text-sm">
                {companyLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="relative text-[#0C5C4C] transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-[#0C5C4C] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-[#0C5C4C]">CONTACT US</h3>
              <p className="text-sm hover:text-green-700 cursor-pointer">
                info@cocokhmer.com
              </p>
              <p className="text-sm hover:text-green-700 cursor-pointer">
                +855 12 269 359
              </p>
              <h3 className="font-bold mt-4 mb-2 text-[#0C5C4C]">FOLLOW US</h3>
              <div className="flex space-x-4 text-lg">
                <a href="#" className="hover:text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-pink-600">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-green-600">
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-[#0C5C4C]">VISIT US</h3>
              <p className="text-sm leading-snug text-[#0C5C4C]">
                Coco Khmer Co., Ltd. <br />
                #1529, NR. 2, Chakangre Krom <br />
                Khan Mean Chey, Phnom Penh <br />
                Cambodia
              </p>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-[#0C5C4C] text-center text-sm text-white py-4 font-[Alegreya]">
        <p>© 2025 COCO KHMER®. ALL RIGHTS RESERVED.</p>
      </div>
    </>
  );
}
