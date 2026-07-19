"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: "1.5rem",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
          maxWidth: "1200px",
          zIndex: 1000,
          borderRadius: "12px",
          background: "rgba(20, 20, 20, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid #2A2A2A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 2.5rem",
        }}
      >
        {/* Part A: Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Link href="/" className="text-white font-bold text-xl tracking-wide">
            Aintrix
          </Link>
        </div>

        {/* Part B: Center Links */}
        <div className="hidden md:flex justify-center items-center" style={{ gap: "1.5rem" }}>
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
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Link
            href="/contact"
            className="hidden md:inline-flex"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 1.5rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}
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
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease", marginTop: "1rem" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
