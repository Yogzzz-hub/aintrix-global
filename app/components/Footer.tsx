"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Research", href: "/research" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const technicalLinks = [
  { label: "Artificial Intelligence", href: "/ecosystem" },
  { label: "Information Technology", href: "/ecosystem" },
  { label: "Semiconductor Technology", href: "/ecosystem" },
  { label: "Robotics & Automation", href: "/ecosystem" },
];

const ecosystemLinks = [
  { label: "Creative Infrastructure (RYZE)", href: "/ecosystem" },
  { label: "Fashion & Apparel", href: "/ecosystem" },
  { label: "Logistics & Trade", href: "/ecosystem" },
  { label: "Food Systems", href: "/ecosystem" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const columns = el.querySelectorAll("[data-ft-col]");
    if (prefersReduced) { gsap.set(columns, { opacity: 1, y: 0 }); return; }
    gsap.set(columns, { opacity: 0, y: 20 });
    const anim = gsap.to(columns, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
    return () => { anim.scrollTrigger?.kill(); anim.kill(); };
  }, []);

  return (
    <footer ref={ref} style={{ backgroundColor: "#1A1A1A", borderTop: "1px solid #2A2A2A" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>

        {/* 5-Column Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "4rem" }} className="footer-grid-responsive">

          {/* Column 1: Brand */}
          <div data-ft-col style={{ display: "flex", flexDirection: "column" }}>
            <Link href="/" style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.08em", color: "#FFFFFF", textDecoration: "none", marginBottom: "1rem", display: "block" }}>
              AINTRIX GLOBAL
            </Link>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#A6A6A6", marginBottom: "1.5rem", maxWidth: "300px" }}>
              A future-focused multi-sector enterprise building intelligent technologies, creative infrastructure and sustainable businesses.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1px solid #333", background: "transparent", color: "#A6A6A6", fontSize: "0.65rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                  {s.label === "LinkedIn" ? "in" : s.label === "X" ? "X" : "yt"}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div data-ft-col style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {companyLinks.map((l) => (
                <li key={l.href}><Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div data-ft-col style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {legalLinks.map((l) => (
                <li key={l.href}><Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Technical */}
          <div data-ft-col style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Technical</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {technicalLinks.map((l, i) => (
                <li key={i}><Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 5: Ecosystem */}
          <div data-ft-col style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Ecosystem</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {ecosystemLinks.map((l, i) => (
                <li key={i}><Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid #2A2A2A", fontSize: "0.75rem", color: "#555", textAlign: "center" }}>
          &copy; 2026 Aintrix Global Private Limited. All rights reserved.
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 1023px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 639px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
