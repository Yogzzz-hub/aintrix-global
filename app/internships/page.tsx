"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../components/ScrollReveal";
import TextReveal from "../components/TextReveal";
import ScrollProgress from "../components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const btnStyle = { display: "inline-flex" as const, alignItems: "center" as const, justifyContent: "center" as const, padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease", cursor: "pointer" as const };

const inputStyle = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #2A2A2A", background: "#0a0a0a", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", transition: "border-color 0.3s ease" };

const pillars = [
  { title: "Real Projects", description: "Students work on active, real-world multi-sector initiatives under experienced professionals.", icon: "◈" },
  { title: "Mentorship", description: "Direct alignment and learning paths with industry experts across AI, robotics, software, and branding.", icon: "◇" },
  { title: "Incentives", description: "Certificates and formal Recommendation Letters awarded upon successful completion of the program.", icon: "△" },
];

const steps = [
  { step: "01", title: "Submit Application", description: "Fill out the application form with your details, area of interest, and resume." },
  { step: "02", title: "Review & Shortlist", description: "Our team reviews applications and shortlists candidates based on fit and potential." },
  { step: "03", title: "Interview", description: "Shortlisted candidates attend a brief interview to discuss goals and alignment." },
  { step: "04", title: "Onboarding", description: "Selected students are onboarded, assigned mentors, and placed on active projects." },
];

const faqs = [
  { question: "What is the internship duration?", answer: "Internships typically run for 8–12 weeks, with flexible start dates depending on project availability and your academic schedule." },
  { question: "Who is eligible to apply?", answer: "We welcome students and recent graduates from all disciplines — computer science, engineering, design, business, and related fields." },
  { question: "Which sectors can I intern in?", answer: "We offer internships across all core sectors: Artificial Intelligence, Information Technology, Creative Infrastructure (RYZE), Fashion & Apparel, Semiconductor Technology, Robotics & Automation, Logistics & Trade, and Food Systems." },
  { question: "Is this a paid internship?", answer: "Compensation varies by role and sector. Many positions include stipends, and all interns receive certificates and recommendation letters upon completion." },
  { question: "Can I work remotely?", answer: "Select roles offer remote or hybrid flexibility. On-site opportunities are available at our Bangalore headquarters." },
  { question: "What will I gain from this experience?", answer: "Hands-on project experience, mentorship from industry professionals, a certificate of completion, a formal recommendation letter, and potential full-time opportunities." },
];

export default function InternshipsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const items = el.querySelectorAll(".intern-hero-item");
    gsap.set(items, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.3 });
    items.forEach((item, i) => {
      tl.to(item, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, i * 0.15);
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p className="intern-hero-item" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A6A6A6", marginBottom: "2rem" }}>Internships</p>
          <h1 className="intern-hero-item" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "#FFFFFF", marginBottom: "1.5rem" }}>
            Internships
          </h1>
          <p className="intern-hero-item" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#FFFFFF", letterSpacing: "0.02em", marginBottom: "2rem" }}>
            Learn. Build. Innovate.
          </p>
          <p className="intern-hero-item" style={{ fontSize: "1rem", color: "#A6A6A6", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto" }}>
            Gain real-world experience across technology, innovation, and sustainable business development.
          </p>
        </div>
      </section>

      {/* ═══════════ WHY JOIN ═══════════ */}
      <section style={{ padding: "0 2rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Why Join Aintrix</TextReveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="pillars-grid">
          {pillars.map((p) => (
            <ScrollReveal key={p.title} delay={0.1}>
              <div style={{ padding: "2.5rem", borderRadius: "8px", border: "1px solid #2A2A2A", background: "rgba(10,10,10,0.5)", height: "100%" }}>
                <span style={{ fontSize: "1.5rem", color: "#A6A6A6", marginBottom: "1.25rem", display: "block" }}>{p.icon}</span>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#A6A6A6", lineHeight: 1.7 }}>{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ APPLICATION PROCESS ═══════════ */}
      <section style={{ padding: "0 2rem 8rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Application Process</TextReveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="steps-grid">
          {steps.map((s) => (
            <ScrollReveal key={s.step} delay={0.1}>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "2rem", borderRadius: "8px", border: "1px solid #2A2A2A", background: "rgba(10,10,10,0.5)" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#333", flexShrink: 0, lineHeight: 1 }}>{s.step}</span>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#A6A6A6", lineHeight: 1.7 }}>{s.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section style={{ padding: "0 2rem 8rem", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Frequently Asked Questions</TextReveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={0.05 * i}>
              <div style={{ borderBottom: "1px solid #2A2A2A" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", background: "transparent", border: "none", color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", textAlign: "left" }}
                >
                  {faq.question}
                  <span style={{ fontSize: "1.25rem", color: "#666", transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? "200px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontSize: "0.875rem", color: "#A6A6A6", lineHeight: 1.7, paddingBottom: "1.25rem" }}>{faq.answer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ APPLY FORM ═══════════ */}
      <section style={{ padding: "0 2rem 8rem", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Start Your Journey With Us</TextReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Full Name</label>
              <input type="text" placeholder="Your full name" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = "#444"} onBlur={(e) => e.currentTarget.style.borderColor = "#2A2A2A"} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Email</label>
              <input type="email" placeholder="you@university.edu" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = "#444"} onBlur={(e) => e.currentTarget.style.borderColor = "#2A2A2A"} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>University / College</label>
              <input type="text" placeholder="Your institution" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = "#444"} onBlur={(e) => e.currentTarget.style.borderColor = "#2A2A2A"} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Area of Interest</label>
              <select style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }} onFocus={(e) => e.currentTarget.style.borderColor = "#444"} onBlur={(e) => e.currentTarget.style.borderColor = "#2A2A2A"}>
                <option value="">Select a sector</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="it">Information Technology</option>
                <option value="ryze">Creative Infrastructure (RYZE)</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="semiconductor">Semiconductor Technology</option>
                <option value="robotics">Robotics & Automation</option>
                <option value="logistics">Logistics & Trade</option>
                <option value="food">Food Systems</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Resume / Portfolio Link</label>
              <input type="url" placeholder="https://your-portfolio.com" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = "#444"} onBlur={(e) => e.currentTarget.style.borderColor = "#2A2A2A"} />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <button type="submit" style={{ ...btnStyle, width: "100%" }}>Submit Application</button>
            </div>
          </form>
        </ScrollReveal>
      </section>

      {/* Responsive overrides */}
      <style>{`
        @media (min-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .section-heading { font-size: 1.75rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; color: #FFFFFF; }
        @media (min-width: 1024px) { .section-heading { font-size: 2.25rem; } }
        select option { background: #0a0a0a; color: #FFFFFF; }
      `}</style>
    </>
  );
}
