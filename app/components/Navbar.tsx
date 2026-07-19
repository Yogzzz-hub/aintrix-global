"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Ecosystem", href: "/ecosystem" },
  { label: "Research & Innovation", href: "/research" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
  { label: "News & Insights", href: "/news" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-[#0a0a0a]/70 backdrop-blur-2xl border border-[#2A2A2A] rounded-3xl shadow-2xl h-[60px] px-8"
      >
        <div className="flex items-center justify-between h-full">
          {/* Part A: Logo */}
          <div className="flex-1 flex justify-start items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Aintrix"
                width={150}
                height={50}
                className="h-18 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Part B: Center Links */}
          <div className="hidden md:flex justify-center items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#A6A6A6] hover:text-white transition-colors duration-300 text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Part C: Contact CTA */}
          <div className="flex-1 flex justify-end items-center">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-[#2A2A2A] transition-all duration-300"
            >
              Contact
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] w-7"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[1.5px] w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-full bg-white transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium tracking-wide text-secondary-text transition-colors duration-200 hover:text-primary-text"
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-[#2A2A2A] transition-all duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
