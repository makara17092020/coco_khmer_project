"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
    { href: "/whereToFind", label: "Where To Find" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-md font-[Alegreya]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="CocoKhmer Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-extrabold text-[#0C5C4C] tracking-wide">
              CocoKhmer
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="bg-[#0C5C4C] px-10 py-4 rounded-full shadow-lg flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-white text-lg font-medium transition-all duration-300 pb-1 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                    isActive(href)
                      ? "after:scale-x-100"
                      : "hover:after:scale-x-100 text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#0C5C4C] focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/25 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Drawer - Slide from Right */}
            <motion.div
              className="fixed top-0 right-0 w-[70%] h-full bg-[#0C5C4C]/95 z-50 shadow-lg px-6 py-10 backdrop-blur-sm"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>
              <nav className="mt-10 flex flex-col gap-6">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
                      isActive(href)
                        ? "text-white after:scale-x-100"
                        : "text-white/80 hover:text-white hover:after:scale-x-100 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
