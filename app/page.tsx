"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./components/ScrollReveal";
import TextReveal from "./components/TextReveal";
import ScrollProgress from "./components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const timelineNodes = [
  { year: "2020", label: "Research Begins" },
  { year: "2021", label: "Fast Forward Brand" },
  { year: "2022", label: "Patent Acquisition" },
  { year: "2023", label: "AI Research" },
  { year: "2024", label: "RYZE Established" },
  { year: "2025", label: "Aintrix Global Incorporated" },
];

const metrics = [
  { value: "5+", label: "Years — Research" },
  { value: "8+", label: "Industries" },
  { value: "25+", label: "Growing Team" },
  { value: "Future Ready", label: "Technology Driven" },
];

const btnStyle = {
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  padding: "0.7rem 2rem",
  borderRadius: "8px",
  border: "1px solid #333333",
  background: "#141414",
  color: "#FFFFFF",
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222",
  transition: "all 0.3s ease",
  cursor: "pointer" as const,
};

const footerCompanyLinks = [
  { label: "About", href: "/about" },
  { label: "Our Ecosystem", href: "/ecosystem" },
  { label: "Research & Innovation", href: "/research" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
  { label: "News & Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const footerTechnicalLinks = [
  { label: "Artificial Intelligence", href: "/ecosystem" },
  { label: "Information Technology", href: "/ecosystem" },
  { label: "Semiconductor Technology", href: "/ecosystem" },
  { label: "Robotics & Automation", href: "/ecosystem" },
];

const footerEcosystemLinks = [
  { label: "Creative Infrastructure - RYZE", href: "/ecosystem" },
  { label: "Fashion & Apparel", href: "/ecosystem" },
  { label: "Logistics & Trade", href: "/ecosystem" },
  { label: "Food Systems", href: "/ecosystem" },
];





export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const inner = el.querySelector(".hero-inner-content");
    const items = inner ? Array.from(inner.children) : [];

    gsap.set(items, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });
    items.forEach((item, i) => {
      tl.to(item, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, i * 0.15);
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ═══════════ SECTION 1 — HERO ═══════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "8rem 2rem 12rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div className="hero-inner-content" style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: "2rem",
            }}
          >
            Engineering Tomorrow.<br />
            <span style={{ color: "#A6A6A6", fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
              Across Technology, Innovation &amp; Sustainable Growth.
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#A6A6A6",
              maxWidth: "650px",
              margin: "0 auto 3rem",
              lineHeight: 1.8,
            }}
          >
            A future-focused multi-sector enterprise building intelligent technologies, creative infrastructure and sustainable businesses.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "3rem" }}>
            <Link href="/ecosystem" style={btnStyle}>Explore Ecosystem</Link>
            <Link href="/contact" style={btnStyle}>Contact Us</Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.4 }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A6A6A6" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </div>
      </section>

      {/* ═══════════ SECTION 2 — ABOUT SNAPSHOT ═══════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "8rem", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="about-snap-grid">
          <div>
            <ScrollReveal>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: "#FFFFFF" }}>
                Who We Are
              </h2>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal delay={0.15}>
              <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#A6A6A6", marginBottom: "2rem" }}>
                Aintrix Global Private Limited is a future-driven multi-sector organization established to create long-term impact through technology, research, innovation and responsible business development. Founded in 2025 after years of research and strategic planning, Aintrix continues building solutions across multiple industries while maintaining a commitment towards sustainability and continuous innovation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link href="/about" style={btnStyle}>Learn More</Link>
            </ScrollReveal>
          </div>
        </div>
        <style>{`
          @media (min-width: 1024px) {
            .about-snap-grid { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; }
          }
        `}</style>
      </section>

      {/* ═══════════ SECTION 3 — OUR ECOSYSTEM (SCROLL-PINNED CAROUSEL) ═══════════ */}
      {(() => {
        const sectors = [
          { id: 1, label: "01 / AI", title: "INTELLIGENT SOLUTIONS", desc: "Deep learning, neural networks, and systems.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80" },
          { id: 2, label: "02 / IT", title: "GLOBAL TECH SUPPORT", desc: "Enterprise infrastructure, cloud platforms, and transformation.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80" },
          { id: 3, label: "03 / RYZE", title: "DESIGN EXPLORATION", desc: "Brand-building through technology, design, and media.", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80" },
          { id: 4, label: "04 / FASHION", title: "APPAREL & DESIGN", desc: "Sustainable fashion innovation merging tech with premium apparel.", img: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=80" },
          { id: 5, label: "05 / SEMI", title: "CHIP INNOVATION", desc: "Advanced chip design, fabrication research, and next-gen architecture.", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80" },
          { id: 6, label: "06 / ROBOTICS", title: "SMART FACTORIES", desc: "Intelligent robotic systems and industrial automation.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80" },
          { id: 7, label: "07 / LOGISTICS", title: "SUPPLY CHAIN", desc: "Efficient supply chain management and cross-border trade.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80" },
          { id: 8, label: "08 / FOOD", title: "SUSTAINABLE HARVEST", desc: "Agricultural technology and resilient food production.", img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80" }
        ];

        function EcosystemCarousel() {
          const [active, setActive] = React.useState(0);
          const trackRef = useRef<HTMLDivElement>(null);

          useEffect(() => {
            const track = trackRef.current;
            if (!track) return;

            const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReduced) return;

            const totalCards = sectors.length;

            const anim = gsap.to(track, {
              scrollTrigger: {
                trigger: track,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                pin: false,
                onUpdate: (self) => {
                  const progress = self.progress;
                  const idx = Math.min(
                    Math.floor(progress * totalCards),
                    totalCards - 1
                  );
                  setActive(idx);
                },
              },
            });

            return () => {
              anim.scrollTrigger?.kill();
              anim.kill();
            };
          }, []);

          const getCardStyle = (index: number): React.CSSProperties => {
            const diff = index - active;
            const n = sectors.length;
            const offset = ((diff + n + n / 2) % n) - n / 2;

            if (offset === 0) {
              return {
                transform: "translateX(0) translateZ(80px) scale(1) rotateY(0deg)",
                zIndex: 10,
                opacity: 1,
                filter: "none",
              };
            }
            const absOff = Math.abs(offset);
            const sign = offset > 0 ? 1 : -1;
            const tx = offset * 230;
            const scale = Math.max(0.52, 1 - absOff * 0.16);
            const rotY = sign * Math.min(absOff * 16, 48);
            const z = -absOff * 70;
            const opacity = Math.max(0.25, 1 - absOff * 0.28);
            return {
              transform: `translateX(${tx}px) translateZ(${z}px) scale(${scale}) rotateY(${rotY}deg)`,
              zIndex: 10 - absOff,
              opacity,
              filter: `brightness(${0.2 + (1 - absOff * 0.16) * 0.35}) saturate(0)`,
            };
          };

          return (
            <>
              <style>{`
                .eco-card {
                  border: 1px solid rgba(255, 255, 255, 0.15) !important;
                  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
                              opacity 0.6s ease,
                              filter 0.6s ease,
                              border-color 0.5s ease !important;
                }
                .eco-card.active-card {
                  border-color: rgba(255, 255, 255, 0.45) !important;
                  box-shadow: 0 0 30px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5) !important;
                }
              `}</style>

              {/* Scroll track: 300vh tall to generate scroll distance */}
              <div ref={trackRef} style={{ height: "300vh", position: "relative", width: "100%" }}>
                {/* Sticky viewport: locks to screen while scrolling through the track */}
                <div style={{
                  position: "sticky",
                  top: 0,
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: "#0a0a0a",
                }}>
                  <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 2rem" }}>
                    <p style={{
                      color: "#555",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.35em",
                      textTransform: "uppercase",
                      marginBottom: "1.25rem",
                    }}>
                      Our Innovative Ecosystem
                    </p>
                    <h2 className="section-heading" style={{ color: "#fff" }}>
                      Eight sectors. One unified vision.
                    </h2>
                  </div>

                  {/* 3D Carousel viewport */}
                  <div
                    style={{
                      perspective: "1200px",
                      perspectiveOrigin: "50% 50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "500px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "340px",
                        height: "460px",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {sectors.map((sector, i) => {
                        const isActive = i === active;
                        return (
                          <div
                            key={sector.id}
                            className={`eco-card${isActive ? " active-card" : ""}`}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "340px",
                              height: "460px",
                              borderRadius: "14px",
                              overflow: "hidden",
                              transformStyle: "preserve-3d",
                              ...getCardStyle(i),
                            }}
                          >
                            {/* Full-bleed background image */}
                            <img
                              src={sector.img}
                              alt={sector.title}
                              draggable={false}
                              style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "saturate(0) contrast(1.1) brightness(0.7)",
                                transition: "filter 0.5s ease, transform 0.6s ease",
                                transform: isActive ? "scale(1.05)" : "scale(1)",
                              }}
                            />

                            {/* Gradient scrim for text contrast */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: isActive
                                  ? "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.65) 100%)"
                                  : "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.7) 100%)",
                                transition: "all 0.6s ease",
                              }}
                            />

                            {/* Text content — visible only on active */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                padding: "2rem 1.75rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                opacity: isActive ? 1 : 0,
                                transition: "opacity 0.45s ease 0.15s",
                              }}
                            >
                              <span style={{
                                color: "rgba(255,255,255,0.45)",
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                              }}>
                                {sector.label}
                              </span>
                              <div>
                                <h3 style={{
                                  color: "#FFFFFF",
                                  fontSize: "1.7rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.05em",
                                  lineHeight: 1.15,
                                  margin: "0 0 0.75rem 0",
                                  textShadow: "0 2px 24px rgba(0,0,0,0.6)",
                                }}>
                                  {sector.title}
                                </h3>
                                <p style={{
                                  color: "rgba(255,255,255,0.6)",
                                  fontSize: "0.85rem",
                                  lineHeight: 1.5,
                                  margin: 0,
                                  fontWeight: 400,
                                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                                }}>
                                  {sector.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dot indicators */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "2.5rem",
                  }}>
                    {sectors.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: i === active ? "2rem" : "0.5rem",
                          height: "0.5rem",
                          borderRadius: "999px",
                          background: i === active ? "#fff" : "rgba(255,255,255,0.2)",
                          transition: "all 0.4s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          );
        }

        return <EcosystemCarousel />;
      })()}

      {/* ═══════════ SECTION 4 — JOURNEY TIMELINE ═══════════ */}
      <section style={{ marginTop: "6rem", marginBottom: "8rem", paddingTop: "6rem", paddingLeft: "2rem", paddingRight: "2rem", background: "transparent" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <ScrollReveal>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A6A6A6", marginBottom: "1.5rem" }}>
              Our Journey
            </p>
          </ScrollReveal>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>
            Milestones that define our trajectory.
          </TextReveal>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="h-timeline">
            <div className="h-timeline-track">
              <div className="h-timeline-nodes">
                {timelineNodes.map((node) => (
                  <div key={node.year} className="h-timeline-node">
                    <div className="h-timeline-dot" />
                    <span className="h-timeline-year">{node.year}</span>
                    <span className="h-timeline-label">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 5 — PHILOSOPHY ═══════════ */}
      <section style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "8rem", padding: "0 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <blockquote
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: "#FFFFFF",
              marginBottom: "2rem",
              fontStyle: "normal",
            }}
          >
            &ldquo;Innovation without discipline cannot achieve sustainable success.&rdquo;
          </blockquote>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#A6A6A6" }}>
            This philosophy drives every decision, every product and every future initiative at Aintrix.
          </p>
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 6 — FEATURED DIVISION ═══════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "8rem", padding: "0 2rem" }}>
        <div
          style={{
            padding: "4rem",
            borderRadius: "16px",
            border: "1px solid #2A2A2A",
            background: "rgba(20, 20, 20, 0.4)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "center",
          }}
          className="featured-grid"
        >
          <div>
            <ScrollReveal>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A6A6A6", marginBottom: "1rem" }}>
                Featured Division
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: "#FFFFFF", marginBottom: "1rem" }}>
                Creative Infrastructure
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#A6A6A6", marginBottom: "2rem" }}>
                RYZE builds brands through technology, design, media and digital ecosystems that enable long-term business growth.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link href="/ecosystem" style={btnStyle}>Explore RYZE</Link>
            </ScrollReveal>
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .featured-grid { grid-template-columns: 1fr !important; padding: 5rem !important; }
          }
        `}</style>
      </section>

      {/* ═══════════ SECTION 7 — RESEARCH & INNOVATION METRICS ═══════════ */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", marginBottom: "8rem", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <ScrollReveal>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A6A6A6", marginBottom: "1.5rem" }}>
              Research &amp; Innovation
            </p>
          </ScrollReveal>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>
            Built on knowledge. Driven by impact.
          </TextReveal>
        </div>
        <div className="metrics-grid" style={{ marginBottom: "3rem" }}>
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={0.05 * i}>
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "12px",
                  border: "1px solid #2A2A2A",
                  background: "rgba(10, 10, 10, 0.3)",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF", display: "block", marginBottom: "0.5rem" }}>
                  {m.value}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#A6A6A6" }}>{m.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <ScrollReveal delay={0.3}>
            <Link href="/research" style={btnStyle}>View Research</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ SECTION 8 — INTERNSHIP PROGRAM ═══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 2rem", textAlign: "center" }}>
        <ScrollReveal>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B7280", marginBottom: "1.5rem" }}>
            AINTRIX GLOBAL PRIVATE LIMITED
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, color: "#FFFFFF", marginBottom: "1.5rem" }}>
            Build Your Career Before Graduation.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#A6A6A6", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            Students work on real projects under experienced professionals while gaining practical exposure across technology, branding, software development and innovation.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Link href="/internships" style={btnStyle}>Apply Now</Link>
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 9 — FOOTER ═══════════ */}
      <style>{`
        .site-footer {
          display: block !important;
          clear: both !important;
          position: relative !important;
          z-index: 50 !important;
          width: 100% !important;
          margin-top: 6rem !important;
        }
        .footer-grid-5col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .footer-grid-5col { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (min-width: 1024px) {
          .footer-grid-5col { grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 4rem; }
        }
      `}</style>
      <footer className="site-footer" style={{ backgroundColor: "#545454", borderTop: "1px solid #1F1F1F" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div className="footer-grid-5col">
            {/* Column 1: Brand Info */}
            <div>
              <Link href="/" style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.08em", color: "#FFFFFF", textDecoration: "none", marginBottom: "1rem", display: "block" }}>
                AINTRIX GLOBAL
              </Link>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#A6A6A6", marginBottom: "1.5rem", maxWidth: "300px" }}>
                A future-focused multi-sector enterprise building intelligent technologies, creative infrastructure and sustainable businesses.
              </p>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Company</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerCompanyLinks.map((l) => (
                  <li key={l.href} style={{ marginBottom: "0.8rem" }}>
                    <Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerLegalLinks.map((l) => (
                  <li key={l.href} style={{ marginBottom: "0.8rem" }}>
                    <Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Technical */}
            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Technical</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerTechnicalLinks.map((l, i) => (
                  <li key={i} style={{ marginBottom: "0.8rem" }}>
                    <Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Ecosystem */}
            <div>
              <h4 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1.25rem" }}>Ecosystem</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {footerEcosystemLinks.map((l, i) => (
                  <li key={i} style={{ marginBottom: "0.8rem" }}>
                    <Link href={l.href} style={{ fontSize: "0.85rem", color: "#A6A6A6", textDecoration: "none", transition: "color 0.3s", lineHeight: 1.5 }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid #1F1F1F", fontSize: "0.75rem", color: "#555", textAlign: "center" }}>
            &copy; 2026 Aintrix Global Private Limited. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
