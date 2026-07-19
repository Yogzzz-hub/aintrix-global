"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const ibmPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const timelineData = [
  { year: "2020", title: "Founded in a two-room office", desc: "Aintrix registers as a private limited company with a founding team of six engineers and one shared conviction." },
  { year: "2021", title: "First enterprise IT contracts", desc: "Our IT services division ships its first production systems \u2014 the revenue that funded every research bet that followed." },
  { year: "2022", title: "AI Labs opens", desc: "A dedicated applied-research group is formed to move machine learning work into its own funded discipline.", active: true },
  { year: "2023", title: "First robotics prototype", desc: "Aintrix Robotics unveils a warehouse-navigation unit built to be retrofitted into existing logistics floors." },
  { year: "2024", title: "Ecosystem expansion", desc: "Fashion technology and logistics divisions join the group, extending the same discipline into materials and supply chains." },
  { year: "2025", title: "One integrated organization", desc: "Every division now shares infrastructure, research, and talent across six industries." },
];

const ecoNodes = [
  { id: "ai", label: "AI", angle: 0, desc: "Applied machine learning \u2014 from language systems to computer vision, built for production, not demos." },
  { id: "it", label: "IT Services", angle: 60, desc: "Enterprise software and infrastructure that funded Aintrix\u2019s earliest research bets, still growing today." },
  { id: "robotics", label: "Robotics", angle: 120, desc: "Physical automation for warehouses and manufacturing floors, engineered alongside our AI stack." },
  { id: "research", label: "Research", angle: 180, desc: "An internal lab where every division sends its hardest unsolved problems." },
  { id: "fashion", label: "Fashion", angle: 240, desc: "Material science and fashion-tech, applying the same systems discipline to design and manufacturing." },
  { id: "logistics", label: "Logistics", angle: 300, desc: "Supply chain and last-mile systems, connecting every physical product to the people who use it." },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

function orbitPos(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
}

function buildHorizon(svg: SVGSVGElement, opacity: number, glow: number) {
  const ns = "http://www.w3.org/2000/svg";
  const gradId = "g" + Math.random().toString(36).slice(2);

  const grad = document.createElementNS(ns, "linearGradient");
  grad.id = gradId;
  grad.setAttribute("x1", "0");
  grad.setAttribute("y1", "0");
  grad.setAttribute("x2", "0");
  grad.setAttribute("y2", "1");
  grad.innerHTML = `<stop offset="0%" stop-color="#D8DEE4" stop-opacity="${glow}"/><stop offset="100%" stop-color="#D8DEE4" stop-opacity="0"/>`;

  const defs = document.createElementNS(ns, "defs");
  defs.appendChild(grad);
  svg.appendChild(defs);

  const line = document.createElementNS(ns, "line");
  line.setAttribute("x1", "0");
  line.setAttribute("y1", "120");
  line.setAttribute("x2", "1600");
  line.setAttribute("y2", "120");
  line.setAttribute("stroke", "#D8DEE4");
  line.setAttribute("stroke-opacity", String(opacity + 0.1));
  svg.appendChild(line);

  for (let i = 0; i < 13; i++) {
    const x = (i / 12) * 1600;
    const cx = 800;
    const l = document.createElementNS(ns, "line");
    l.setAttribute("x1", String(x));
    l.setAttribute("y1", "500");
    l.setAttribute("x2", String(cx + (x - cx) * 0.08));
    l.setAttribute("y2", "120");
    l.setAttribute("stroke", "#D8DEE4");
    l.setAttribute("stroke-opacity", String(opacity));
    svg.appendChild(l);
  }

  for (let i = 0; i < 6; i++) {
    const y = 120 + Math.pow(i / 5, 1.6) * 380;
    const l = document.createElementNS(ns, "line");
    l.setAttribute("x1", "0");
    l.setAttribute("y1", String(y));
    l.setAttribute("x2", "1600");
    l.setAttribute("y2", String(y));
    l.setAttribute("stroke", "#D8DEE4");
    l.setAttribute("stroke-opacity", String(opacity * 0.6));
    svg.appendChild(l);
  }

  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("width", "1600");
  rect.setAttribute("height", "120");
  rect.setAttribute("fill", `url(#${gradId})`);
  svg.appendChild(rect);
}

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <motion.p
      variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="text-lg md:text-xl text-[#A6A6A6] font-light leading-relaxed max-w-lg"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="inline-block">
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
};

const CompanyOverview = () => {
  return (
    <section className="w-full flex justify-center py-24 md:py-32 overflow-hidden bg-black">
      <div className="w-full max-w-[1200px] px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center md:text-left"
        >
          <p className="text-[#A6A6A6] text-sm tracking-[0.3em] uppercase mb-4">Company Overview</p>
          <h2 className="text-3xl md:text-4xl text-white font-medium tracking-tight">One discipline.<br/>Many industries.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-32">
          <div className="flex justify-start">
            <motion.img
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
              alt="Engineering Architecture"
              className="w-full max-w-[450px] aspect-[4/3] object-cover rounded-2xl grayscale contrast-125 opacity-80"
            />
          </div>
          <div className="flex justify-start">
            <TypewriterText text="Aintrix began as a small engineering team with an uncomfortable question: why do most technology companies specialize so narrowly that the systems they build never actually talk to each other?" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="flex justify-start md:justify-end order-2 md:order-1">
            <TypewriterText text="So we built differently — one organization, working across artificial intelligence, enterprise IT, robotics, applied research, fashion technology, and logistics, sharing one engineering discipline underneath all of it." />
          </div>
          <div className="flex justify-start md:justify-end order-1 md:order-2">
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
              alt="Robotics and Research"
              className="w-full max-w-[450px] aspect-[4/3] object-cover rounded-2xl grayscale contrast-125 opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   VMP SECTION
   ═══════════════════════════════════════════════════════ */

const vmpData = [
  { id: "vision", tag: "Vision", title: "A world where intelligence is infrastructure.", desc: "We imagine industries that no longer treat software, machines, and data as separate departments \u2014 but as one engineered system, invisible and dependable.", dirX: -80, dirY: 0 },
  { id: "mission", tag: "Mission", title: "Build the systems others depend on, quietly.", desc: "Across AI, IT, robotics, research, fashion, and logistics, our mission is the same: engineer things well enough that people stop noticing them.", dirX: 80, dirY: 0 },
  { id: "philosophy", tag: "Philosophy", title: "\u201CEngineer once. Depend on it forever.\u201D", desc: "Everything we build is judged by one question \u2014 will this still be holding something up in ten years?", dirX: 0, dirY: 80 },
];

export const VMPSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vmpData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = vmpData[currentIndex];

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-24">
      <motion.img
        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop"
        alt="Abstract Flow"
        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center">
        <p className="text-[#A6A6A6] text-xs tracking-[0.3em] uppercase mb-20">Vision &middot; Mission &middot; Philosophy</p>

        <div className="relative min-h-[300px] flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: current.dirX, y: current.dirY }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-full flex flex-col items-center gap-10"
            >
              <p className="text-[#A6A6A6] text-[10px] md:text-xs tracking-[0.2em] uppercase m-0">{current.tag}</p>
              <h3 className="text-xl md:text-3xl text-white font-medium tracking-tight m-0">
                {current.title}
              </h3>
              <p className="text-sm md:text-base text-[#A6A6A6] font-light leading-relaxed max-w-2xl m-0">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {vmpData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentIndex === idx ? "bg-white scale-125" : "bg-[#3A3A3F] hover:bg-[#A6A6A6]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function AboutPage() {
  const horizonChargedRef = useRef<SVGSVGElement>(null);

  const [ecoDesc, setEcoDesc] = useState("");
  const [activeEco, setActiveEco] = useState<string | null>(null);

  /* ─── Horizon SVG grid (future section) ─── */
  useEffect(() => {
    if (horizonChargedRef.current) buildHorizon(horizonChargedRef.current, 0.32, 0.22);
  }, []);

  /* ─── Leadership tilt ─── */
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  };
  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  /* ─── Magnetic button ─── */
  const handleMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const handleMagLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  return (
    <div className={`${bricolage.variable} ${ibmPlex.variable} ap`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative w-full h-screen min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract Dark Texture"
              className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/60 to-black pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <p className="ap-eyebrow" style={{ marginBottom: "2rem" }}>
              Aintrix Global Private Limited
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          >
            <h1
              className="text-5xl md:text-7xl font-semibold tracking-tight"
              style={{ color: "#FFFFFF", lineHeight: 1.1, marginBottom: "2.5rem" }}
            >
              About <span style={{ color: "#A6A6A6" }}>Aintrix</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            <p className="ap-hero-sub">
              We are a collective of engineers, researchers, and builders &mdash;
              designing the intelligence, machines, and infrastructure that quietly
              hold up what comes next.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="ap-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="ap-eyebrow">Scroll</span>
          <div className="ap-scroll-line" />
        </motion.div>
      </section>

      {/* ═══════════════════ OVERVIEW ═══════════════════ */}
      <CompanyOverview />

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <section className="ap-timeline">
        <motion.div
          className="ap-timeline-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="ap-eyebrow">The Journey &mdash; 2020 &rarr; 2025</p>
          <h2 className="ap-timeline-title">
            Five years, built in order.
          </h2>
        </motion.div>
        <div className="ap-track">
          {timelineData.map((item) => (
            <div
              key={item.year}
              className={`ap-tcard ap-glass${item.active ? " active" : ""}`}
            >
              <span className="ap-yr">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ VMP ═══════════════════ */}
      <VMPSection />

      {/* ═══════════════════ LEADERSHIP ═══════════════════ */}
      <section className="ap-leadership">
        <h2 className="ap-bgtext">LEADERSHIP</h2>
        <p className="ap-eyebrow" style={{ position: "relative", zIndex: 1 }}>
          Leadership
        </p>
        <h2 className="ap-leadership-title">
          Two people, one standard.
        </h2>
        <div className="ap-lead-grid">
          {[
            {
              initials: "AM",
              role: "Founder & Chairman",
              name: "Arjun Mehta",
              desc: "Started Aintrix in 2020 with a background in systems engineering. Still reviews architecture decisions on every division\u2019s core products.",
            },
            {
              initials: "PR",
              role: "Chief Executive Officer",
              name: "Priya Raghavan",
              desc: "Joined in 2022 to scale operations across six industries. Focused on keeping every division accountable to the same engineering standard.",
            },
          ].map((person) => (
            <div
              key={person.name}
              className="ap-lcard ap-glass ap-glow"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              style={{ transition: "transform 0.3s ease" }}
            >
              <div className="ap-lcard-photo">
                <span>{person.initials}</span>
              </div>
              <p className="ap-eyebrow">{person.role}</p>
              <h3>{person.name}</h3>
              <p>{person.desc}</p>
            </div>
          ))}
        </div>
      </section>

 

      {/* ═══════════════════ FUTURE ═══════════════════ */}
      <section className="ap-future">
        <p className="ap-eyebrow">Future Vision</p>
        <h2 className="ap-future-title">
          The future is being engineered.
        </h2>
        <div className="ap-future-panel ap-glass ap-glow">
          <p>
            Not predicted. Not hyped. Built &mdash; division by division, system
            by system &mdash; by people who would rather ship something
            dependable than something loud.
          </p>
        </div>
        <div className="ap-horizon-wrap" style={{ height: "45vh" }}>
          <svg
            ref={horizonChargedRef}
            viewBox="0 0 1600 500"
            preserveAspectRatio="xMidYMax slice"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="ap-cta">
        <p className="ap-eyebrow">Get In Touch</p>
        <h2 className="ap-cta-title">Let&apos;s build the future together.</h2>
        <button
          className="ap-magnetic"
          onMouseMove={handleMagMove}
          onMouseLeave={handleMagLeave}
        >
          <span>Start a conversation</span>
          <span className="ap-arrow">&rarr;</span>
        </button>
        <p className="ap-cta-foot">Aintrix Global Private Limited</p>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CSS  (scoped under .ap)
   ═══════════════════════════════════════════════════════ */

const css = `
.ap {
  --void: #0A0A0B;
  --ink: #111113;
  --graphite: #1C1C1F;
  --steel: #3A3A3F;
  --mist: #8A8A90;
  --paper: #F5F5F4;
  --instrument: #D8DEE4;
  --instrumentDim: #8C97A3;
  background: var(--void);
  color: var(--paper);
  font-weight: 300;
  overflow-x: hidden;
  min-height: 100vh;
}
.ap ::selection { background: var(--instrument); color: var(--void); }

.ap section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.ap-eyebrow {
  font-family: var(--font-mono), 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--instrumentDim);
}

.ap-glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
}

.ap-glow {
  box-shadow: 0 0 0 1px rgba(216,222,228,0.08), 0 0 40px rgba(216,222,228,0.06);
}

/* ─── HERO ─── */
.ap-hero-sub {
  position: relative;
  z-index: 2;
  max-width: 520px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #A6A6A6;
}
.ap-scroll-cue {
  position: absolute;
  bottom: 40px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.ap-scroll-line {
  width: 1px;
  height: 56px;
  background: linear-gradient(180deg, #A6A6A6, transparent);
  animation: ap-pulse 4s ease-in-out infinite;
}
@keyframes ap-pulse { 0%,100%{opacity:.25;} 50%{opacity:.8;} }

/* ─── OVERVIEW ─── */
.ap-ov-heading {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 600;
  line-height: 1.15;
}

/* ─── TIMELINE ─── */
.ap-timeline { padding: 8rem 0; }
.ap-timeline-head {
  padding: 0 24px;
  max-width: 1180px;
  margin: 0 auto 3rem;
}
.ap-timeline-title {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 600;
  margin-top: 0.75rem;
}
.ap-track {
  display: flex;
  gap: 1.75rem;
  overflow-x: auto;
  padding: 1rem 10vw 2.5rem;
  scroll-snap-type: x proximity;
}
.ap-track::-webkit-scrollbar { height: 5px; }
.ap-track::-webkit-scrollbar-thumb { background: var(--steel); border-radius: 4px; }
.ap-tcard {
  scroll-snap-align: center;
  flex: 0 0 340px;
  height: 400px;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.4s ease, filter 0.4s ease, opacity 0.4s ease;
  transform: scale(0.92);
  opacity: 0.55;
  filter: blur(1px);
}
.ap-tcard:hover, .ap-tcard.active {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
}
.ap-yr {
  font-family: var(--font-mono), 'IBM Plex Mono', monospace;
  font-size: 3.5rem;
  font-weight: 500;
  color: rgba(216,222,228,0.75);
}
.ap-tcard h3 {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.ap-tcard p {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.55;
  color: var(--mist);
}

/* ─── LEADERSHIP ─── */
.ap-leadership {
  padding: 9rem 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ap-bgtext {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-weight: 800;
  font-size: 20vw;
  color: rgba(255,255,255,0.03);
  white-space: nowrap;
  z-index: 0;
  pointer-events: none;
}
.ap-leadership-title {
  position: relative;
  z-index: 1;
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 600;
  text-align: center;
  margin: 0.75rem 0 4rem;
}
.ap-lead-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1000px;
  width: 100%;
}
.ap-lcard {
  border-radius: 24px;
  padding: 2.5rem;
  cursor: default;
}
.ap-lcard-photo {
  height: 230px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--steel), var(--graphite));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  overflow: hidden;
}
.ap-lcard-photo span {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: rgba(216,222,228,0.3);
}
.ap-lcard h3 {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0.6rem 0;
}
.ap-lcard p {
  font-size: 0.9rem;
  color: var(--mist);
  line-height: 1.6;
}

/* ─── ECOSYSTEM ─── */
.ap-ecosystem {
  padding: 8rem 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ap-eco-title {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 600;
  text-align: center;
  margin: 0.75rem 0 0.75rem;
}
.ap-eco-hint { color: var(--mist); font-size: 0.9rem; margin-bottom: 4rem; }
.ap-orbit {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1/1;
}
.ap-orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.ap-orbit-node {
  position: absolute;
  width: 108px;
  height: 108px;
  margin-left: -54px;
  margin-top: -54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.ap-orbit-node:hover, .ap-orbit-node.active { transform: scale(1.15); }
.ap-orbit-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 130px;
  height: 130px;
  margin-left: -65px;
  margin-top: -65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
}
.ap-eco-desc {
  min-height: 60px;
  max-width: 520px;
  text-align: center;
  color: var(--mist);
  margin-top: 3.5rem;
  font-size: 1rem;
}

/* ─── FUTURE ─── */
.ap-future {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2.5rem;
}
.ap-future-title {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  font-size: clamp(2.4rem, 7vw, 5rem);
  line-height: 1.05;
  max-width: 900px;
  padding: 0 24px;
}
.ap-future-panel {
  max-width: 520px;
  border-radius: 20px;
  padding: 2rem 2.5rem;
  margin: 0 24px;
}
.ap-future-panel p { color: var(--mist); font-size: 1rem; line-height: 1.6; }

/* ─── CTA ─── */
.ap-cta {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  text-align: center;
}
.ap-cta-title {
  font-family: var(--font-display), 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  font-size: clamp(2.2rem, 6vw, 4rem);
  max-width: 820px;
  padding: 0 24px;
}
.ap-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border-radius: 999px;
  border: 1px solid rgba(216,222,228,0.3);
  background: rgba(255,255,255,0.05);
  padding: 20px 40px;
  font-size: 0.95rem;
  color: var(--paper);
  cursor: pointer;
  transition: border-color 0.3s ease;
  font-family: inherit;
}
.ap-magnetic:hover { border-color: rgba(216,222,228,0.7); }
.ap-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--paper);
  color: var(--void);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.ap-cta-foot {
  font-family: var(--font-mono), 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--instrumentDim);
  margin-top: 0.5rem;
}
`;
