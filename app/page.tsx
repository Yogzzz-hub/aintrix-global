"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./components/ScrollReveal";
import TextReveal from "./components/TextReveal";
import ImageReveal from "./components/ImageReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import ScrollProgress from "./components/ScrollProgress";
import Parallax from "./components/Parallax";
import StaggerReveal from "./components/StaggerReveal";

gsap.registerPlugin(ScrollTrigger);

const ecosystemCards = [
  { title: "Aintrix Core", description: "Our central innovation engine driving research, product development, and strategic partnerships across global markets.", icon: "⬡" },
  { title: "Research Lab", description: "Dedicated research division focused on AI, quantum computing, and emerging technologies with real-world applications.", icon: "◈" },
  { title: "Global Ventures", description: "Strategic investments and partnerships spanning technology, sustainability, and infrastructure worldwide.", icon: "◇" },
  { title: "Talent Academy", description: "Next-generation internship and career programs cultivating future leaders in technology and innovation.", icon: "△" },
];

const timeline = [
  { year: "2019", title: "Foundation", description: "Aintrix Global Private Limited established in Bangalore, India." },
  { year: "2020", title: "Research Launch", description: "Opened dedicated research division for AI and quantum computing." },
  { year: "2021", title: "Global Expansion", description: "Expanded operations across Asia-Pacific and European markets." },
  { year: "2022", title: "Ecosystem Growth", description: "Launched the Aintrix Ecosystem with four core divisions." },
  { year: "2023", title: "Innovation Award", description: "Recognized for breakthrough contributions to applied AI research." },
  { year: "2024", title: "Next Chapter", description: "Scaling operations and deepening strategic global partnerships." },
];

const stats = [
  { label: "Team Members", target: 250, suffix: "+" },
  { label: "Research Papers", target: 120, suffix: "+" },
  { label: "Global Partners", target: 45, suffix: "" },
  { label: "Countries", target: 18, suffix: "" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const label = el.querySelector(".hero-label");
    const title = el.querySelector(".hero-title");
    const subtitle = el.querySelector(".hero-subtitle");
    const cta = el.querySelector(".hero-cta");

    gsap.set([label, title, subtitle, cta], { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(label, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(title, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(cta, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const line = container.querySelector(".timeline-line");
    const items = container.querySelectorAll(".timeline-item");

    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: container, start: "top 70%", end: "bottom 70%", scrub: 1 },
      });
    }

    if (items.length) {
      gsap.fromTo(items, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 75%", toggleActions: "play none none none" },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />

        <div className="max-w-[680px] mx-auto text-center relative z-10 px-8">
          <p className="hero-label text-[11px] font-medium tracking-[0.25em] uppercase text-secondary-text mb-8">
            Private Limited
          </p>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] text-primary-text mb-8">
            Aintrix
            <br />
            Global
          </h1>
          <p className="hero-subtitle text-base sm:text-lg text-secondary-text max-w-[440px] mx-auto leading-[1.8] mb-12">
            Shaping the future through innovation, research, and strategic global partnerships.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}>
              Explore
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}>
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.2em] uppercase text-secondary-text">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════ ABOUT ═══════════════════════════════════════ */}
      <section className="section-spacer">
        <div className="section-container">
          <div className="about-grid">
            <div>
              <ScrollReveal>
                <p className="section-label">About Us</p>
              </ScrollReveal>
              <TextReveal as="h2" className="section-heading" stagger={0.04}>
                Building the future through deliberate innovation and strategic vision.
              </TextReveal>
            </div>
            <div>
              <ScrollReveal delay={0.2}>
                <p className="section-body mb-6">
                  Aintrix Global Private Limited is a technology and innovation company headquartered in Bangalore, India. We operate at the intersection of research, technology, and global strategy to shape the next generation of transformative solutions.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <p className="section-body mb-8">
                  Our work spans artificial intelligence, quantum computing, sustainable technology, and global partnerships — all driven by a commitment to meaningful, lasting impact.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <Link href="/about" className="section-link">
                  Learn more about us<span className="ml-2">→</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ ECOSYSTEM ═══════════════════════════════════════ */}
      <section className="section-spacer">
        <Parallax speed={0.15}>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px]" />
        </Parallax>
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="section-label">Our Ecosystem</p>
            </ScrollReveal>
            <TextReveal as="h2" className="section-heading max-w-[600px] mx-auto" stagger={0.04}>
              Four divisions. One unified vision for global innovation.
            </TextReveal>
          </div>
          <StaggerReveal className="ecosystem-grid" stagger={0.12}>
            {ecosystemCards.map((card) => (
              <div key={card.title} className="group relative p-8 rounded-2xl border border-[#2A2A2A] bg-[#0a0a0a]/50 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:-translate-y-1">
                <span className="text-xl text-secondary-text mb-5 block transition-colors duration-300 group-hover:text-white/60">{card.icon}</span>
                <h3 className="text-base font-semibold text-primary-text mb-2">{card.title}</h3>
                <p className="text-sm text-secondary-text leading-[1.7]">{card.description}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ RESEARCH ═══════════════════════════════════════ */}
      <section className="section-spacer overflow-hidden">
        <Parallax speed={0.1}>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px]" />
        </Parallax>
        <div className="section-container relative z-10">
          <div className="two-col-grid">
            <div>
              <ScrollReveal>
                <p className="section-label">Research & Innovation</p>
              </ScrollReveal>
              <TextReveal as="h2" className="section-heading mb-8" stagger={0.04}>
                Pioneering the technologies that will define the next decade.
              </TextReveal>
              <ScrollReveal delay={0.3}>
                <p className="section-body mb-8">
                  Our research division operates at the frontier of artificial intelligence, quantum computing, and advanced materials science. We publish in leading journals and collaborate with top institutions worldwide.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.45}>
                <Link href="/research" className="section-link">
                  View our research<span className="ml-2">→</span>
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
                  alt="Research laboratory"
                  className="rounded-2xl"
                  wrapperClassName="rounded-2xl aspect-[4/3] bg-[#111]"
                />
                <div className="absolute -inset-[1px] rounded-2xl border border-white/[0.05] -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ STATISTICS ═══════════════════════════════════════ */}
      <section className="section-spacer">
        <div className="section-container">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="section-label">By the Numbers</p>
            </ScrollReveal>
            <TextReveal as="h2" className="section-heading max-w-[500px] mx-auto" stagger={0.04}>
              Impact measured in milestones.
            </TextReveal>
          </div>
          <StaggerReveal className="stats-grid" stagger={0.1}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-6 py-10 rounded-2xl border border-[#2A2A2A]/50 bg-[#0a0a0a]/30">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2} className="text-3xl font-bold text-primary-text block mb-3" />
                <span className="text-sm text-secondary-text">{stat.label}</span>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ INTERNSHIPS ═══════════════════════════════════════ */}
      <section className="section-spacer overflow-hidden">
        <Parallax speed={0.1}>
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] -translate-y-1/2" />
        </Parallax>
        <div className="section-container relative z-10">
          <div className="two-col-grid">
            <ScrollReveal delay={0.1}>
              <div className="relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  className="rounded-2xl"
                  wrapperClassName="rounded-2xl aspect-[4/3] bg-[#111]"
                />
                <div className="absolute -inset-[1px] rounded-2xl border border-white/[0.05] -z-10" />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <p className="section-label">Internships</p>
              </ScrollReveal>
              <TextReveal as="h2" className="section-heading mb-8" stagger={0.04}>
                Launch your career at the frontier of innovation.
              </TextReveal>
              <ScrollReveal delay={0.3}>
                <p className="section-body mb-8">
                  Our internship programs offer hands-on experience across AI research, software engineering, product design, and global strategy. Work alongside senior leaders on projects that shape real outcomes.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.45}>
                <Link href="/internships" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}>
                  View open positions
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TIMELINE ═══════════════════════════════════════ */}
      <section className="section-spacer">
        <div className="section-container">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="section-label">Our Journey</p>
            </ScrollReveal>
            <TextReveal as="h2" className="section-heading max-w-[500px] mx-auto" stagger={0.04}>
              Milestones that define our trajectory.
            </TextReveal>
          </div>

          <div ref={timelineRef} className="timeline">
            <div className="timeline-track">
              <div className="timeline-line-inner" />
            </div>
            <div className="timeline-items">
              {timeline.map((item, i) => (
                <div key={item.year} className={`timeline-item ${i % 2 === 0 ? "timeline-left" : "timeline-right"}`}>
                  <div className="timeline-dot" />
                  <div className={`timeline-content ${i % 2 === 0 ? "timeline-content-left" : "timeline-content-right"}`}>
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary-text">{item.year}</span>
                    <h3 className="text-base font-semibold text-primary-text mt-2 mb-1">{item.title}</h3>
                    <p className="text-sm text-secondary-text leading-[1.7]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ CTA ═══════════════════════════════════════ */}
      <section className="cta-spacer">
        <div className="section-container">
          <div className="cta-inner">
            <TextReveal as="h2" className="section-heading mb-6" stagger={0.04}>
              Ready to shape the future with us?
            </TextReveal>
            <ScrollReveal delay={0.3}>
              <p className="section-body mb-10">
                Whether you are a researcher, a partner, or a future team member — we would love to hear from you.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.45}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}>
                  Get in Touch
                </Link>
                <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.7rem 2rem", borderRadius: "8px", border: "1px solid #333333", background: "#141414", color: "#FFFFFF", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none", boxShadow: "4px 4px 12px #050505, -4px -4px 12px #222222", transition: "all 0.3s ease" }}>
                  View Careers
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
