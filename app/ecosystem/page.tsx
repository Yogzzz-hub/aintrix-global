"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   DATA — All 9 Sectors
   ═══════════════════════════════════════════════════════ */

const sectors = [
  {
    id: "ai",
    tag: "01",
    title: "Artificial Intelligence",
    tagline: "Intelligence engineered for production, not demonstration.",
    overview:
      "Our AI division builds machine learning systems that operate at scale — from natural language processing and computer vision to predictive analytics and autonomous decision-making. Every model is designed to integrate into existing enterprise workflows, not exist as a standalone experiment.",
    objectives: [
      "Ship production-grade ML systems across language, vision, and prediction domains",
      "Reduce deployment friction for enterprise AI adoption by 60%",
      "Maintain sub-100ms inference latency on all real-time applications",
    ],
    futurePlans: [
      "Launch proprietary foundation models optimized for Indian enterprise contexts",
      "Expand into edge AI for manufacturing and logistics floors",
      "Open-source our inference optimization toolkit",
    ],
    services: [
      "Custom LLM Development",
      "Computer Vision Systems",
      "Predictive Analytics Platforms",
      "MLOps & Model Deployment",
      "AI Consulting & Strategy",
    ],
  },
  {
    id: "it",
    tag: "02",
    title: "Information Technology",
    tagline: "Enterprise infrastructure that funds every research bet we make.",
    overview:
      "Our IT services division builds and maintains the production systems that power enterprise operations — from cloud architecture and DevOps to cybersecurity and application modernization. This is the revenue engine that has funded Aintrix's expansion into every other division.",
    objectives: [
      "Deliver 99.99% uptime across all managed infrastructure contracts",
      "Reduce client operational costs through automation and modernization",
      "Maintain SOC 2 Type II compliance across all service lines",
    ],
    futurePlans: [
      "Launch a managed AI-ops platform for proactive infrastructure management",
      "Expand cloud-native migration services for legacy enterprise systems",
      "Build a dedicated cybersecurity operations center (SOC)",
    ],
    services: [
      "Cloud Architecture & Migration",
      "DevOps & Infrastructure Automation",
      "Cybersecurity & Compliance",
      "Application Modernization",
      "Managed IT Services",
    ],
  },
  {
    id: "ryze",
    tag: "03",
    title: "Creative Infrastructure",
    tagline: "RYZE — Where brand identity meets engineering precision.",
    overview:
      "RYZE is Aintrix's creative infrastructure division, building the visual and experiential systems that brands need to exist meaningfully in digital and physical spaces. From UI/UX engineering and motion design to brand systems and spatial computing, RYZE treats creativity as an engineering discipline.",
    objectives: [
      "Establish RYZE as the benchmark for design-engineering integration",
      "Deliver brand systems that scale across 10+ touchpoints without degradation",
      "Maintain a design-to-code pipeline under 48 hours for standard components",
    ],
    futurePlans: [
      "Launch a spatial computing lab for AR/VR brand experiences",
      "Build a proprietary design system framework for enterprise clients",
      "Expand into generative design for product and packaging",
    ],
    services: [
      "Brand Identity Systems",
      "UI/UX Engineering",
      "Motion Design & Animation",
      "Spatial Computing (AR/VR)",
      "Design System Architecture",
    ],
  },
  {
    id: "fashion",
    tag: "04",
    title: "Fashion",
    tagline: "Material science applied to the world's most personal industry.",
    overview:
      "Aintrix Fashion applies systems engineering to design, materials, and manufacturing. We build the technology stack behind modern fashion brands — from 3D garment simulation and supply chain optimization to sustainable material research and direct-to-consumer infrastructure.",
    objectives: [
      "Reduce garment development cycles from 12 weeks to 4 weeks",
      "Cut material waste by 40% through precision cutting and AI-driven demand forecasting",
      "Build the technology backbone for 20+ fashion brands by 2027",
    ],
    futurePlans: [
      "Launch a sustainable materials R&D lab focused on bio-fabricated textiles",
      "Deploy AI-powered trend forecasting for seasonal collections",
      "Build an end-to-end platform connecting design, manufacturing, and retail",
    ],
    services: [
      "3D Garment Simulation",
      "Supply Chain Optimization",
      "Sustainable Material Research",
      "DTC Platform Development",
      "Fashion-Tech Consulting",
    ],
  },
  {
    id: "semiconductor",
    tag: "05",
    title: "Semiconductor Technology",
    tagline: "The physics of computation, engineered at the chip level.",
    overview:
      "Our semiconductor division works at the intersection of hardware design and system optimization — from custom ASIC development and FPGA prototyping to thermal management and signal integrity analysis. We build the silicon foundations that our AI and robotics divisions depend on.",
    objectives: [
      "Deliver custom chip designs with 30% power efficiency improvements",
      "Establish a FPGA prototyping lab for rapid hardware iteration",
      "Build signal integrity tooling for high-frequency applications",
    ],
    futurePlans: [
      "Launch a chip design accelerator for Indian hardware startups",
      "Develop proprietary thermal management solutions for edge computing",
      "Expand into RISC-V based custom processor design",
    ],
    services: [
      "Custom ASIC Design",
      "FPGA Prototyping",
      "Thermal Management Systems",
      "Signal Integrity Analysis",
      "Hardware-Software Co-Design",
    ],
  },
  {
    id: "robotics",
    tag: "06",
    title: "Robotics",
    tagline: "Physical automation engineered alongside our AI stack.",
    overview:
      "Aintrix Robotics builds autonomous systems for warehouses, manufacturing floors, and logistics environments. Our units are designed to retrofit into existing infrastructure — no facility redesign required. Every robot shares the same AI backbone as our software divisions.",
    objectives: [
      "Deploy autonomous navigation units in 50+ facilities by 2026",
      "Achieve 99.7% navigation accuracy in unstructured environments",
      "Reduce warehouse labor costs by 35% through human-robot collaboration",
    ],
    futurePlans: [
      "Launch a fleet management platform for multi-robot coordination",
      "Develop bipedal prototypes for flexible manufacturing environments",
      "Build a simulation-to-deployment pipeline for rapid field deployment",
    ],
    services: [
      "Autonomous Mobile Robots (AMR)",
      "Warehouse Automation Systems",
      "Fleet Management Software",
      "Robotic Process Automation",
      "Custom Robot Development",
    ],
  },
  {
    id: "deeptech",
    tag: "07",
    title: "Deep Technology",
    tagline: "Research that solves problems others haven't defined yet.",
    overview:
      "Our Deep Technology division is the internal research lab where every Aintrix division sends its hardest unsolved problems. We work across quantum computing research, advanced materials science, computational biology, and next-generation networking protocols.",
    objectives: [
      "File 15+ patents annually across quantum, materials, and computational domains",
      "Transition 3+ research projects to production-ready prototypes each year",
      "Publish peer-reviewed research that advances the state of the art",
    ],
    futurePlans: [
      "Establish a quantum computing research group focused on optimization problems",
      "Launch a materials discovery platform using generative AI",
      "Build partnerships with 5+ universities for collaborative research",
    ],
    services: [
      "Quantum Computing Research",
      "Advanced Materials Science",
      "Computational Biology",
      "Network Protocol Development",
      "Research-as-a-Service",
    ],
  },
  {
    id: "logistics",
    tag: "08",
    title: "Logistics",
    tagline: "Supply chain intelligence connecting every product to its destination.",
    overview:
      "Aintrix Logistics builds the software and systems that move physical goods — from demand forecasting and route optimization to warehouse management and last-mile delivery tracking. We treat logistics as an information problem, not just a transportation problem.",
    objectives: [
      "Reduce delivery times by 25% through AI-driven route optimization",
      "Achieve real-time visibility across 100% of supply chain touchpoints",
      "Cut logistics costs by 20% for enterprise clients within 12 months",
    ],
    futurePlans: [
      "Launch a digital twin platform for supply chain simulation",
      "Deploy autonomous last-mile delivery systems in urban environments",
      "Build a blockchain-based provenance tracking system",
    ],
    services: [
      "Route Optimization Systems",
      "Warehouse Management Software",
      "Supply Chain Analytics",
      "Last-Mile Delivery Tracking",
      "Digital Twin Platforms",
    ],
  },
  {
    id: "food",
    tag: "09",
    title: "Food Industry",
    tagline: "Technology applied to humanity's most essential industry.",
    overview:
      "Our Food Industry division brings precision engineering to food production, processing, and distribution. From cold chain monitoring and quality assurance systems to farm-to-fork traceability and automated processing lines, we build the infrastructure that keeps food safe and supply chains efficient.",
    objectives: [
      "Reduce food waste by 30% through precision demand forecasting",
      "Achieve 100% traceability across cold chain logistics",
      "Automate quality inspection for 50+ processing facilities",
    ],
    futurePlans: [
      "Launch an AI-powered food safety monitoring platform",
      "Build vertical farming automation systems",
      "Develop precision agriculture tools for smallholder farmers",
    ],
    services: [
      "Cold Chain Monitoring",
      "Food Safety Systems",
      "Farm-to-Fork Traceability",
      "Processing Line Automation",
      "Agricultural Technology Solutions",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const heroTextVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.15 },
  }),
};

const sectionFade = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════
   SECTION COMPONENT
   ═══════════════════════════════════════════════════════ */

function SectorSection({
  sector,
  index,
}: {
  sector: (typeof sectors)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="eco-section"
      id={sector.id}
    >
      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionFade}
        className="eco-section-head"
      >
        <span className="eco-tag">{sector.tag}</span>
        <h2 className="eco-section-title">{sector.title}</h2>
        <p className="eco-tagline">{sector.tagline}</p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="eco-divider"
      />

      {/* Content Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="eco-grid"
      >
        {/* Overview */}
        <motion.div variants={staggerItem} className="eco-card eco-card-full">
          <h3 className="eco-card-label">Overview</h3>
          <p className="eco-card-text">{sector.overview}</p>
        </motion.div>

        {/* Objectives */}
        <motion.div variants={staggerItem} className="eco-card">
          <h3 className="eco-card-label">Objectives</h3>
          <ul className="eco-list">
            {sector.objectives.map((item, i) => (
              <li key={i} className="eco-list-item">
                <span className="eco-list-bullet" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Future Plans */}
        <motion.div variants={staggerItem} className="eco-card">
          <h3 className="eco-card-label">Future Plans</h3>
          <ul className="eco-list">
            {sector.futurePlans.map((item, i) => (
              <li key={i} className="eco-list-item">
                <span className="eco-list-bullet" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Related Services */}
        <motion.div variants={staggerItem} className="eco-card eco-card-full">
          <h3 className="eco-card-label">Related Services</h3>
          <div className="eco-services-grid">
            {sector.services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.06)" }}
                className="eco-service-chip"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

function EcosystemPage() {
  return (
    <div className="eco">
      {/* ═══════ HERO ═══════ */}
      <section className="eco-hero">
        <div className="eco-hero-bg" />
        <div className="eco-hero-gradient" />

        <div className="eco-hero-content">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="eco-eyebrow"
          >
            Aintrix Global Private Limited
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="eco-hero-title"
          >
            Building The Future
            <br />
            <span className="eco-hero-accent">Across Industries</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="eco-hero-sub"
          >
            One organization. Nine divisions. One engineering discipline
            underlying all of it.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="eco-scroll-cue"
          >
            <span className="eco-eyebrow">Scroll</span>
            <div className="eco-scroll-line" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTOR NAV (sticky) ═══════ */}
      <nav className="eco-sector-nav">
        <div className="eco-sector-nav-inner">
          {sectors.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="eco-sector-nav-link"
            >
              <span className="eco-sector-nav-tag">{s.tag}</span>
              <span className="eco-sector-nav-label">{s.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* ═══════ SECTOR SECTIONS ═══════ */}
      <div className="eco-sectors">
        {sectors.map((sector, index) => (
          <SectorSection key={sector.id} sector={sector} index={index} />
        ))}
      </div>

      {/* ═══════ CTA ═══════ */}
      <section className="eco-cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="eco-cta-inner"
        >
          <p className="eco-eyebrow">Partner With Us</p>
          <h2 className="eco-cta-title">
            Ready to build something
            <br />
            that lasts?
          </h2>
          <a href="/contact" className="eco-cta-button">
            Start a Conversation
            <span className="eco-cta-arrow">&rarr;</span>
          </a>
          <p className="eco-cta-foot">
            Aintrix Global Private Limited
          </p>
        </motion.div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CSS — Scoped under .eco
   ═══════════════════════════════════════════════════════ */

const css = `
.eco {
  --void: #000000;
  --ink: #0A0A0B;
  --graphite: #111113;
  --steel: #1C1C1F;
  --mist: #3A3A3F;
  --dim: #666666;
  --soft: #A6A6A6;
  --paper: #F5F5F4;
  --white: #FFFFFF;
  --border: #2A2A2A;
  background: var(--void);
  color: var(--paper);
  font-family: var(--font-inter), system-ui, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

.eco ::selection { background: var(--white); color: var(--void); }

/* ─── HERO ─── */
.eco-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--void);
}

.eco-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.03), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,255,255,0.015), transparent);
}

.eco-hero-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--void), transparent);
  pointer-events: none;
}

.eco-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 24px;
}

.eco-eyebrow {
  font-family: var(--font-inter), monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 2rem;
}

.eco-hero-title {
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--white);
  margin-bottom: 1.5rem;
}

.eco-hero-accent {
  color: var(--soft);
}

.eco-hero-sub {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--soft);
  max-width: 520px;
  margin: 0 auto 3rem;
}

.eco-scroll-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.eco-scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--dim), transparent);
  animation: eco-pulse 3s ease-in-out infinite;
}

@keyframes eco-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

/* ─── SECTOR NAV ─── */
.eco-sector-nav {
  position: sticky;
  top: 80px;
  z-index: 40;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
}

.eco-sector-nav-inner {
  display: flex;
  gap: 0;
  overflow-x: auto;
  max-width: 1200px;
  margin: 0 auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.eco-sector-nav-inner::-webkit-scrollbar { display: none; }

.eco-sector-nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.eco-sector-nav-link:hover {
  color: var(--white);
  border-bottom-color: var(--white);
}

.eco-sector-nav-tag {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--dim);
}

.eco-sector-nav-label {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--soft);
}

/* ─── SECTOR SECTIONS ─── */
.eco-sectors {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.eco-section {
  padding: 8rem 0 4rem;
  border-bottom: 1px solid var(--border);
}

.eco-section:last-child {
  border-bottom: none;
}

.eco-section-head {
  margin-bottom: 3rem;
}

.eco-tag {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 1rem;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.eco-section-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--white);
  margin-bottom: 0.75rem;
}

.eco-tagline {
  font-size: 1rem;
  font-weight: 300;
  color: var(--soft);
  max-width: 500px;
}

.eco-divider {
  width: 100%;
  height: 1px;
  background: var(--border);
  transform-origin: left;
  margin-bottom: 3rem;
}

/* ─── CONTENT GRID ─── */
.eco-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .eco-grid {
    grid-template-columns: 1fr;
  }
}

.eco-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  transition: border-color 0.3s ease;
}

.eco-card:hover {
  border-color: rgba(255, 255, 255, 0.1);
}

.eco-card-full {
  grid-column: 1 / -1;
}

.eco-card-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 1rem;
}

.eco-card-text {
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--soft);
}

/* ─── LISTS ─── */
.eco-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.eco-list-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--soft);
}

.eco-list-bullet {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--dim);
  margin-top: 8px;
}

/* ─── SERVICES ─── */
.eco-services-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.eco-service-chip {
  padding: 10px 20px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--soft);
  background: transparent;
  cursor: default;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.eco-service-chip:hover {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.2);
}

/* ─── CTA ─── */
.eco-cta {
  padding: 10rem 24px;
  text-align: center;
}

.eco-cta-inner {
  max-width: 700px;
  margin: 0 auto;
}

.eco-cta-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--white);
  margin-bottom: 2.5rem;
}

.eco-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--paper);
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.3s ease;
}

.eco-cta-button:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.eco-cta-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--paper);
  color: var(--void);
  font-size: 0.85rem;
}

.eco-cta-foot {
  margin-top: 2rem;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--dim);
}
`;

export default function EcosystemPageWithStyles() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <EcosystemPage />
    </>
  );
}
