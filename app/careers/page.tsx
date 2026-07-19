"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../components/ScrollReveal";
import TextReveal from "../components/TextReveal";
import ScrollProgress from "../components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { num: "01", title: "Remote-First Culture", description: "Work from anywhere in the world. We trust outcomes, not office hours." },
  { num: "02", title: "Learning & Development", description: "Annual stipend for courses, conferences, and professional development." },
  { num: "03", title: "Health & Wellness", description: "Comprehensive health insurance and mental wellness support for you and your family." },
  { num: "04", title: "Equity & Ownership", description: "Early employees receive equity in the company as we scale globally." },
  { num: "05", title: "Flexible Hours", description: "Design your own schedule. We care about results, not rigid timelines." },
  { num: "06", title: "Global Team", description: "Collaborate with talented people across 12+ countries and time zones." },
];

const positions = [
  {
    id: 1,
    num: "01",
    title: "AI Research Engineer",
    dept: "Artificial Intelligence",
    location: "Bangalore",
    employment: "Full Time",
    description: "Build next-generation AI systems, LLMs and intelligent automation.",
    responsibilities: ["Design and train large language models", "Optimize inference pipelines for production", "Contribute to open-source AI frameworks"],
    requirements: ["Strong foundation in deep learning and NLP", "Experience with PyTorch or JAX", "Published research is a plus"],
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    num: "02",
    title: "Full Stack Developer",
    dept: "Information Technology",
    location: "Remote / Hybrid",
    employment: "Full Time",
    description: "Build scalable cloud platforms using Next.js, FastAPI, and Supabase.",
    responsibilities: ["Architect end-to-end web applications", "Build and maintain REST & GraphQL APIs", "Deploy and monitor microservices"],
    requirements: ["Proficiency in TypeScript, React, and Node.js", "Experience with cloud infrastructure (AWS/GCP)", "Strong system design skills"],
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    num: "03",
    title: "Robotics Systems Engineer",
    dept: "Robotics & Automation",
    location: "Bangalore",
    employment: "Full Time",
    description: "Design autonomous robotics systems powered by AI and Computer Vision.",
    responsibilities: ["Develop motion planning algorithms", "Integrate sensor fusion pipelines", "Prototype autonomous navigation systems"],
    requirements: ["Experience with ROS2 and C++/Python", "Background in control systems or mechatronics", "Hands-on robotics project experience"],
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    num: "04",
    title: "Product Designer",
    dept: "Creative Infrastructure",
    location: "Remote",
    employment: "Full Time",
    description: "Design intuitive digital experiences used by thousands.",
    responsibilities: ["Create high-fidelity prototypes and design systems", "Conduct user research and usability testing", "Collaborate closely with engineering teams"],
    requirements: ["Strong portfolio showcasing UI/UX work", "Proficiency in Figma and modern design tools", "Understanding of前端 fundamentals is a plus"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80&auto=format&fit=crop",
  },
];

const steps = [
  { step: "01", title: "Application Review", description: "Our team reviews your application and portfolio within 5 business days." },
  { step: "02", title: "Technical Evaluation", description: "A focused assessment or take-home challenge relevant to the role." },
  { step: "03", title: "Culture Fit Conversation", description: "A casual conversation with team leads to align on values and vision." },
  { step: "04", title: "Offer & Onboarding", description: "Receive your offer and begin a structured onboarding with your team." },
];

const perks = [
  { title: "Internship Certificate", desc: "Official completion certificate" },
  { title: "Recommendation Letter", desc: "Based on performance" },
  { title: "Expert Mentorship", desc: "Learn from experienced professionals" },
  { title: "Real Industry Projects", desc: "Hands-on practical experience" },
];

export default function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const positionsWrapperRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = () => {
    setSubmitStatus("loading");
    setTimeout(() => setSubmitStatus("success"), 2200);
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const inner = el.querySelector(".hero-inner-content");
    const items = inner ? Array.from(inner.children) : [];
    gsap.set(items, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.3 });
    items.forEach((item, i) => {
      tl.to(item, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, i * 0.15);
    });

    return () => { tl.kill(); };
  }, []);

  // GSAP ScrollTrigger horizontal scroll for Open Positions
  useEffect(() => {
    const wrapper = positionsWrapperRef.current;
    const track = cardsTrackRef.current;
    const progress = progressRef.current;
    if (!wrapper || !track || !progress) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = track.querySelectorAll(".job-card");
    const totalCards = cards.length;

    // Calculate the total scroll distance
    const getScrollDistance = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth);
    };

    // Set initial positions of cards (inactive state)
    cards.forEach((card, i) => {
      if (i !== 0) {
        gsap.set(card, { opacity: 0.3, scale: 0.85, filter: "brightness(0.4)" });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${Math.abs(getScrollDistance()) * 1.5}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress_val = self.progress;
          // Update progress bar width
          progress.style.width = `${progress_val * 100}%`;
          // Calculate active index
          const idx = Math.min(Math.floor(progress_val * totalCards), totalCards - 1);
          setActiveIdx(idx);
        },
      },
    });

    // Animate the track horizontally
    tl.to(track, {
      x: getScrollDistance,
      ease: "none",
    }, 0);

    // Animate each card as it enters center
    cards.forEach((card, i) => {
      const cardStart = i / totalCards;
      const cardEnd = (i + 1) / totalCards;

      // Scale up and brighten the active card
      tl.to(card, {
        opacity: 1,
        scale: 1,
        filter: "brightness(1)",
        ease: "power2.out",
        duration: 0.1,
      }, cardStart);

      // Dim the card after it passes
      tl.to(card, {
        opacity: 0.3,
        scale: 0.85,
        filter: "brightness(0.4)",
        ease: "power2.in",
        duration: 0.1,
      }, cardEnd);
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* ═══════════ HERO ═══════════ */}
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
          padding: "8rem 2rem 6rem",
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

        <div className="hero-inner-content" style={{ position: "relative", zIndex: 10, maxWidth: "700px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: "2.5rem",
            }}
          >
            AINTRIX GLOBAL PRIVATE LIMITED
          </p>
          <h1
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "#FFFFFF",
              marginBottom: "2rem",
            }}
          >
            Life at Aintrix
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
            A future-focused multi-sector enterprise building intelligent technologies, creative infrastructure, and sustainable businesses across eight dynamic sectors.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2rem", marginBottom: "3rem" }}>
            <a
              href="#positions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
              }}
            >
              View Open Roles
            </a>
            <a
              href="#apply"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
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
              }}
            >
              Apply Now
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", pointerEvents: "none" }}>
          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#6B7280", fontWeight: 500 }}>
            Scroll
          </span>
          <div style={{ width: "1px", height: "3rem", background: "linear-gradient(to bottom, #6B7280, transparent)" }}></div>
        </div>
      </section>

      {/* ═══════════ WORK CULTURE ═══════════ */}
      <section style={{ background: "#0F0F0F", padding: "8rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <TextReveal as="h2" className="section-heading" stagger={0.04}>Work Culture & Benefits</TextReveal>
            <p style={{ fontSize: "0.95rem", color: "#A6A6A6", marginTop: "1rem", lineHeight: 1.7 }}>
              Built for people who build the future.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="careers-culture-grid">
            {pillars.map((p, idx) => (
              <ScrollReveal key={p.title} delay={0.05 * idx}>
                <div className="showcase-card" style={{ background: "#111111", borderRadius: "24px", border: "1px solid #2A2A2A", padding: "2rem", display: "flex", flexDirection: "row", alignItems: "stretch", gap: "1.5rem", position: "relative", overflow: "hidden", transition: "all 0.4s ease", cursor: "default", minHeight: "200px" }}>
                  {/* Left content */}
                  <div style={{ flex: "0 0 60%", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          {idx === 0 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
                          {idx === 1 && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>}
                          {idx === 2 && <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>}
                          {idx === 3 && <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>}
                          {idx === 4 && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                          {idx === 5 && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.1em", fontWeight: 500 }}>{p.num}</span>
                    </div>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem", lineHeight: 1.2 }}>{p.title}</h3>
                    <div style={{ width: "32px", height: "1px", background: "#2A2A2A", marginBottom: "0.75rem" }} />
                    <p style={{ fontSize: "0.8rem", color: "#A6A6A6", lineHeight: 1.7 }}>{p.description}</p>
                  </div>

                  {/* Right illustration */}
                  <div style={{ flex: "0 0 40%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div className="showcase-illustration" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.5s ease" }}>
                      {idx % 3 === 0 && (
                        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "130px", height: "130px", border: "1px solid rgba(255,255,255,0.12)", transform: "rotateX(20deg) rotateY(30deg)", transformStyle: "preserve-3d", position: "relative" }}>
                            <div style={{ position: "absolute", inset: "18px", border: "1px solid rgba(255,255,255,0.06)" }} />
                            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "1px solid rgba(255,255,255,0.08)", transform: "translateZ(35px)" }} />
                          </div>
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="float-particle" style={{ position: "absolute", width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", top: `${20 + i * 15}%`, left: `${15 + i * 18}%`, animationDelay: `${i * 0.6}s` }} />
                          ))}
                        </div>
                      )}
                      {idx % 3 === 1 && (
                        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "150px", height: "150px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <div style={{ position: "absolute", inset: "10px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
                            <div style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", width: "70px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.08)" }} />
                            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
                              <div style={{ width: "16px", height: "36px", borderRadius: "8px 8px 2px 2px", background: "rgba(255,255,255,0.1)" }} />
                              <div style={{ width: "16px", height: "46px", borderRadius: "8px 8px 2px 2px", background: "rgba(255,255,255,0.15)" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      {idx % 3 === 2 && (
                        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: "120px", height: "85px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                              <div style={{ width: "55px", height: "2px", background: "rgba(255,255,255,0.1)" }} />
                              <div style={{ width: "35px", height: "2px", background: "rgba(255,255,255,0.06)" }} />
                              <div style={{ position: "absolute", top: "7px", right: "7px", width: "16px", height: "16px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                              </div>
                            </div>
                            <div style={{ width: "90px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.06)", marginTop: "8px" }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN POSITIONS ═══════════ */}
      <div ref={positionsWrapperRef} className="relative" style={{ height: "100vh" }}>
        <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex">

          {/* ─── LEFT PANEL (Fixed) ─── */}
          <div className="relative z-10 w-full lg:w-[35%] h-full flex flex-col justify-center px-8 md:px-12 lg:px-16 shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4 block">
              Careers
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white uppercase leading-[0.85] tracking-tight mb-6">
              Open<br />Positions
            </h2>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed mb-12">
              Join our mission to build intelligent technologies that shape the future.
            </p>

            {/* Mouse scroll icon */}
            <div className="flex items-center gap-3 mt-auto mb-12">
              <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
                <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
              </div>
              <span className="text-[10px] text-white/30 uppercase tracking-widest">
                Scroll to explore opportunities
              </span>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const idx = Math.max(0, activeIdx - 1);
                  const wrapper = positionsWrapperRef.current;
                  if (wrapper) {
                    const st = ScrollTrigger.getAll().find(s => s.trigger === wrapper);
                    if (st) {
                      const target = st.start + ((st.end - st.start) * (idx / positions.length));
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }
                  }
                }}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const idx = Math.min(positions.length - 1, activeIdx + 1);
                  const wrapper = positionsWrapperRef.current;
                  if (wrapper) {
                    const st = ScrollTrigger.getAll().find(s => s.trigger === wrapper);
                    if (st) {
                      const target = st.start + ((st.end - st.start) * ((idx + 1) / positions.length));
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }
                  }
                }}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── RIGHT PANEL (Horizontal Cards Track) ─── */}
          <div
            ref={cardsTrackRef}
            className="flex items-center gap-8 h-full pr-16 lg:pr-24 will-change-transform"
            style={{ paddingLeft: "2rem" }}
          >
            {positions.map((pos) => (
              <div
                key={pos.id}
                className="job-card shrink-0 relative w-[340px] md:w-[380px] h-[580px] md:h-[620px] rounded-3xl overflow-hidden border border-white/[0.08] cursor-pointer group"
                style={{
                  background: "linear-gradient(180deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
                  flexShrink: 0,
                }}
              >
                {/* Card image */}
                <div className="absolute inset-0">
                  <img
                    src={pos.img}
                    alt={pos.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                </div>

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-7">
                  {/* Top: Index & Dept */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-white/25 tracking-wider">
                      {pos.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 px-3 py-1 rounded-full border border-white/10">
                      {pos.dept}
                    </span>
                  </div>

                  {/* Bottom: Detail content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      {pos.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-5">
                      {pos.description}
                    </p>

                    {/* Meta tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="text-[10px] text-white/40 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                        {pos.location}
                      </span>
                      <span className="text-[10px] text-white/40 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                        {pos.employment}
                      </span>
                    </div>

                    {/* View Details button */}
                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors group/btn"
                    >
                      View Details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ─── PROGRESS BAR ─── */}
          <div className="absolute bottom-8 left-[35%] right-16 lg:right-24 z-20">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-white/30 tracking-wider">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute top-0 left-0 h-full bg-white/50 transition-none"
                  style={{ width: "0%" }}
                />
              </div>
              <span className="text-[10px] font-mono text-white/30 tracking-wider">
                {String(positions.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ HIRING PROCESS ═══════════ */}
      <section className="section-container" style={{ paddingBottom: "8rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Hiring Process</TextReveal>
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

      {/* ═══════════ APPLICATION FORM ═══════════ */}
      <section id="apply" style={{ maxWidth: "82.5rem", margin: "0 auto", padding: "0 1.5rem", paddingBottom: "8rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <TextReveal as="h2" className="section-heading" stagger={0.04}>Join the Team</TextReveal>
          <p style={{ fontSize: "0.95rem", color: "#A6A6A6", marginTop: "1rem", lineHeight: 1.7 }}>
            Tell us about yourself and we&apos;ll get back to you.
          </p>
        </div>

        <ScrollReveal delay={0.15}>
          <div style={{ background: "#111111", borderRadius: "24px", border: "1px solid #2A2A2A", display: "flex", flexDirection: "row", overflow: "hidden" }} className="app-panel">

            {/* ─── LEFT: Benefits ─── */}
            <div style={{ flex: "0 0 35%", padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #2A2A2A" }} className="app-benefits">
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "2rem" }}>Why Apply?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { icon: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>, title: "Real Industry Projects", desc: "Work on live AI, software, robotics, and research initiatives." },
                    { icon: <><circle cx="9" cy="7" r="3" /><path d="M9 13c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z" /><circle cx="17" cy="7" r="3" /><path d="M17 13c-.7 0-1.4.1-2 .3" /><path d="M21 17c0-1.5-1.5-3-4-3.7" /></>, title: "Expert Mentorship", desc: "Learn directly from experienced engineers and researchers." },
                    { icon: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>, title: "Certificates", desc: "Receive official internship completion certificates." },
                    { icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>, title: "Career Growth", desc: "Build your portfolio and improve your career opportunities." },
                  ].map((b) => (
                    <div key={b.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.25rem" }}>{b.title}</h4>
                        <p style={{ fontSize: "0.8rem", color: "#A6A6A6", lineHeight: 1.6 }}>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Illustration */}
              <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", height: "140px", position: "relative" }}>
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ width: "70px", height: "3px", borderRadius: "1px", background: "rgba(255,255,255,0.03)", marginTop: "3px" }} />
                  <div style={{ position: "absolute", bottom: "8px", width: "60px", height: "60px", border: "1px solid rgba(255,255,255,0.1)", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "30px", height: "30px", border: "1px solid rgba(255,255,255,0.06)" }} />
                  </div>
                  <div style={{ position: "absolute", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", bottom: "-10px" }} />
                </div>
              </div>
            </div>

            {/* ─── RIGHT: Form ─── */}
            <div style={{ flex: "0 0 65%", padding: "3rem" }} className="app-form">
              <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Row: Name + Email */}
                <div style={{ display: "flex", gap: "1rem" }} className="app-form-row">
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Full Name</label>
                    <div style={{ position: "relative" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} className="field-icon"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                      <input type="text" placeholder="Your full name" className="app-input" style={{ width: "100%", height: "56px", padding: "0 1rem 0 2.75rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s" }} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Email</label>
                    <div style={{ position: "relative" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} className="field-icon"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      <input type="email" placeholder="you@company.com" className="app-input" style={{ width: "100%", height: "56px", padding: "0 1rem 0 2.75rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s" }} />
                    </div>
                  </div>
                </div>

                {/* Row: Role + Location */}
                <div style={{ display: "flex", gap: "1rem" }} className="app-form-row">
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Role of Interest</label>
                    <div style={{ position: "relative" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} className="field-icon"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                      <select className="app-input" style={{ width: "100%", height: "56px", padding: "0 1rem 0 2.75rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", appearance: "none" as const, cursor: "pointer", transition: "border-color 0.3s, box-shadow 0.3s" }}>
                        <option value="">Select a role</option>
                        <option value="ai-research">Core AI Research Engineer</option>
                        <option value="fullstack">Full-Stack Developer</option>
                        <option value="robotics">Robotics Systems Engineer</option>
                        <option value="design">Product Designer</option>
                        <option value="devops">DevOps Engineer</option>
                        <option value="ml">Machine Learning Engineer</option>
                      </select>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Preferred Location</label>
                    <div style={{ position: "relative" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} className="field-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      <select className="app-input" style={{ width: "100%", height: "56px", padding: "0 1rem 0 2.75rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", appearance: "none" as const, cursor: "pointer", transition: "border-color 0.3s, box-shadow 0.3s" }}>
                        <option value="">Select a location</option>
                        <option value="remote">Remote</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                {/* Upload Resume */}
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Upload Resume</label>
                  <div style={{ border: "1px dashed #2A2A2A", borderRadius: "14px", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer", transition: "border-color 0.3s" }} className="app-upload">
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#FFFFFF", fontWeight: 500, marginBottom: "0.15rem" }}>Upload Resume</p>
                      <p style={{ fontSize: "0.75rem", color: "#666" }}>Supported: PDF, DOC, DOCX — Max 5 MB</p>
                    </div>
                  </div>
                </div>

                {/* Portfolio Link */}
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Portfolio Link <span style={{ color: "#444", fontWeight: 400 }}>(optional)</span></label>
                  <div style={{ position: "relative" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} className="field-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                    <input type="url" placeholder="https://your-portfolio.com" className="app-input" style={{ width: "100%", height: "56px", padding: "0 1rem 0 2.75rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", transition: "border-color 0.3s, box-shadow 0.3s" }} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginBottom: "0.5rem" }}>Message <span style={{ color: "#444", fontWeight: 400 }}>(optional)</span></label>
                  <textarea placeholder="Tell us why you'd be a great fit..." className="app-input" style={{ width: "100%", minHeight: "100px", padding: "1rem", borderRadius: "14px", border: "1px solid #2A2A2A", background: "#0B0B0B", color: "#FFFFFF", fontSize: "0.875rem", outline: "none", resize: "vertical", fontFamily: "inherit", transition: "border-color 0.3s, box-shadow 0.3s" }} />
                </div>

                {/* Submit Button */}
                <div style={{ marginTop: "0.25rem" }}>
                  <button
                    type="submit"
                    disabled={submitStatus !== "idle"}
                    onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                    className="app-submit"
                    style={{
                      width: "100%", height: "56px", borderRadius: "14px", border: "none",
                      background: submitStatus === "success" ? "#FFFFFF" : submitStatus === "loading" ? "#1a1a1a" : "#FFFFFF",
                      color: submitStatus === "loading" ? "#A6A6A6" : "#000000",
                      fontSize: "0.95rem", fontWeight: 600, cursor: submitStatus !== "idle" ? "default" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      transition: "all 0.4s ease",
                    }}
                  >
                    {submitStatus === "idle" && (
                      <>Submit Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></>
                    )}
                    {submitStatus === "loading" && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span className="app-spinner" style={{ width: "18px", height: "18px", border: "2px solid #333", borderTopColor: "#A6A6A6", borderRadius: "50%" }} />
                        Submitting Application...
                      </span>
                    )}
                    {submitStatus === "success" && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="checkmark-icon"><polyline points="20 6 9 17 4 12" /></svg>
                        Application Submitted
                      </span>
                    )}
                  </button>
                </div>

                {/* Perks Strip */}
                <div className="perks-strip" style={{ background: "#0F0F0F", borderRadius: "16px", border: "1px solid #2A2A2A", padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginTop: "0.75rem", transition: "border-color 0.2s, transform 0.2s" }}>
                  {perks.map((perk) => (
                    <div key={perk.title} className="perk-item" style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", transition: "transform 0.2s" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      <div>
                        <p style={{ fontSize: "0.8rem", color: "#FFFFFF", fontWeight: 600, lineHeight: 1.4 }}>{perk.title}</p>
                        <p style={{ fontSize: "0.7rem", color: "#666", lineHeight: 1.4 }}>{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Card */}
                {submitStatus === "success" && (
                  <div className="success-card" style={{ background: "#111111", borderRadius: "18px", border: "1px solid #2A2A2A", padding: "2rem", marginTop: "1rem", textAlign: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: "2px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }} className="success-check-ring">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-checkmark"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>Application Submitted Successfully</h4>
                    <p style={{ fontSize: "0.875rem", color: "#A6A6A6", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                      Thank you for your interest in joining Aintrix.
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#A6A6A6", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                      Our recruitment team will review your application and contact you if you&apos;re shortlisted.
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#666" }}>
                      Expected review time: <span style={{ color: "#A6A6A6", fontWeight: 600 }}>3–5 business days</span>.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                      <Link href="/" style={{ padding: "0.6rem 1.5rem", borderRadius: "10px", border: "1px solid #2A2A2A", background: "transparent", color: "#FFFFFF", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease" }}>Return to Homepage</Link>
                      <Link href="/about" style={{ padding: "0.6rem 1.5rem", borderRadius: "10px", border: "1px solid #2A2A2A", background: "transparent", color: "#A6A6A6", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease" }}>Explore Aintrix</Link>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ RESPONSIVE & ANIMATIONS ═══════════ */}
      <style>{`
        @media (min-width: 768px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .perks-strip { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1024px) {
          .careers-culture-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .perks-strip { grid-template-columns: repeat(4, 1fr) !important; gap: 1rem !important; }
        }
        @media (max-width: 1023px) {
          .app-panel { flex-direction: column !important; }
          .app-benefits { border-right: none !important; border-bottom: 1px solid #2A2A2A !important; }
          .app-form-row { flex-direction: column !important; }
        }
        select option { background: #0a0a0a; color: #FFFFFF; }

        /* Job card */
        .job-card {
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .job-card:hover {
          border-color: rgba(255,255,255,0.15) !important;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) !important;
        }

        /* Hide scrollbar for horizontal card track */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Showcase card hover */
        .showcase-card:hover {
          border-color: #444 !important;
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .showcase-card:hover .showcase-illustration {
          transform: scale(1.03);
        }

        /* Form input focus */
        .app-input:focus {
          border-color: #555 !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.04) !important;
        }
        .app-input:focus ~ .field-icon,
        .app-input:focus + .field-icon {
          stroke: #FFFFFF;
        }

        /* Upload hover */
        .app-upload:hover {
          border-color: #444 !important;
        }

        /* Submit hover */
        .app-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,255,255,0.1);
        }

        /* Spinner */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .app-spinner {
          animation: spin 0.8s linear infinite;
        }

        /* Perks strip */
        .perks-strip {
          transition: border-color 0.2s, transform 0.2s;
        }
        .perks-strip:hover {
          border-color: #444;
          transform: translateY(-2px);
        }

        /* Success checkmark */
        @keyframes successPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-checkmark {
          animation: successPop 0.5s ease forwards;
        }
        .success-check-ring {
          animation: successPop 0.4s ease forwards;
        }

        /* Success card fade in */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-card {
          animation: fadeUp 0.5s ease forwards;
        }

        /* Float particles */
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-12px) scale(1.3); opacity: 0.5; }
        }
        .float-particle {
          animation: floatUp 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
