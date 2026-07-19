"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

type ContentCategory =
  | "All"
  | "Company"
  | "Research"
  | "Industry"
  | "Product"
  | "Achievement";

interface NewsItem {
  id: number;
  category: ContentCategory;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const categories: ContentCategory[] = [
  "All",
  "Company",
  "Research",
  "Industry",
  "Product",
  "Achievement",
];

const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "Company",
    tag: "Announcement",
    date: "June 2025",
    title: "Aintrix Secures Series A Funding to Expand AI and Robotics Divisions",
    excerpt:
      "Aintrix Global Private Limited has closed a Series A round that will accelerate the development of autonomous systems and production-grade machine learning platforms across six industry verticals.",
    readTime: "4 min read",
  },
  {
    id: 2,
    category: "Research",
    tag: "Research Update",
    date: "May 2025",
    title: "New Paper on Edge-Optimized Transformer Architectures Published",
    excerpt:
      "Our Deep Technology division has published findings on a novel approach to reducing transformer inference latency by 40% without sacrificing accuracy, with applications in real-time manufacturing QA.",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "Industry",
    tag: "Industry Insight",
    date: "May 2025",
    title: "Why Enterprise AI Adoption Fails — And What Actually Works",
    excerpt:
      "Most enterprise AI projects never reach production. We break down the three structural reasons this happens and the deployment methodology that got 90% of our client systems into live environments within 12 weeks.",
    readTime: "8 min read",
  },
  {
    id: 4,
    category: "Product",
    tag: "Product Launch",
    date: "April 2025",
    title: "Introducing Aintrix FleetOS — Autonomous Robot Management at Scale",
    excerpt:
      "FleetOS is our new centralized platform for coordinating fleets of autonomous mobile robots across warehouse and manufacturing environments, with real-time path optimization and predictive maintenance.",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "Achievement",
    tag: "Milestone",
    date: "April 2025",
    title: "Aintrix Robotics Surpasses 10 Million Autonomous Navigation Meters",
    excerpt:
      "Our warehouse navigation units have collectively traveled over 10 million meters in production environments with a 99.7% accuracy rate, marking a significant milestone in industrial autonomy.",
    readTime: "3 min read",
  },
  {
    id: 6,
    category: "Company",
    tag: "Announcement",
    date: "March 2025",
    title: "RYZE Creative Infrastructure Division Launches Spatial Computing Lab",
    excerpt:
      "The new RYZE lab will focus on AR/VR brand experiences and generative design, bridging the gap between engineering precision and creative expression for enterprise clients.",
    readTime: "3 min read",
  },
  {
    id: 7,
    category: "Research",
    tag: "Research Update",
    date: "March 2025",
    title: "Advances in Bio-Fabricated Textile Materials for Sustainable Fashion",
    excerpt:
      "Our Fashion division's materials science team has developed a new bio-fabricated textile that reduces water usage by 70% compared to conventional cotton, with initial production trials showing promising durability metrics.",
    readTime: "7 min read",
  },
  {
    id: 8,
    category: "Industry",
    tag: "Industry Insight",
    date: "February 2025",
    title: "The Semiconductor Supply Chain: What India's CHIP Act Means for Design Houses",
    excerpt:
      "India's semiconductor incentive program is reshaping the landscape for chip design companies. We analyze the strategic implications for domestic fabless firms and the opportunities in RISC-V development.",
    readTime: "6 min read",
  },
  {
    id: 9,
    category: "Product",
    tag: "Product Launch",
    date: "February 2025",
    title: "ColdTrace — End-to-End Cold Chain Monitoring for Food Logistics",
    excerpt:
      "ColdTrace provides real-time temperature, humidity, and location tracking across the entire cold chain, with AI-powered anomaly detection that alerts operators before spoilage occurs.",
    readTime: "4 min read",
  },
  {
    id: 10,
    category: "Achievement",
    tag: "Milestone",
    date: "January 2025",
    title: "Aintrix Named Among Top 20 Deep Tech Startups in Southeast Asia",
    excerpt:
      "Aintrix Global has been recognized in the annual Deep Tech Index for our contributions to applied AI, autonomous systems, and semiconductor research across the region.",
    readTime: "2 min read",
  },
  {
    id: 11,
    category: "Company",
    tag: "Announcement",
    date: "January 2025",
    title: "Aintrix Opens Second Engineering Hub in Bangalore",
    excerpt:
      "The new 40,000 sq ft facility will house the AI Labs, Robotics prototyping floor, and the Semiconductor Technology division, consolidating our hardware and software research under one roof.",
    readTime: "3 min read",
  },
  {
    id: 12,
    category: "Industry",
    tag: "Industry Insight",
    date: "December 2024",
    title: "How Logistics AI Is Reshaping Last-Mile Delivery Economics",
    excerpt:
      "Last-mile delivery accounts for 53% of total shipping costs. We examine how AI-driven route optimization and predictive demand modeling are compressing that figure — and what it means for e-commerce margins.",
    readTime: "7 min read",
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
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.15,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ═══════════════════════════════════════════════════════
   NEWS CARD COMPONENT
   ═══════════════════════════════════════════════════════ */

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="news-card"
    >
      <div className="news-card-header">
        <span className="news-card-tag">{item.tag}</span>
        <span className="news-card-date">{item.date}</span>
      </div>

      <h3 className="news-card-title">{item.title}</h3>
      <p className="news-card-excerpt">{item.excerpt}</p>

      <div className="news-card-footer">
        <span className="news-card-read">{item.readTime}</span>
        <span className="news-card-arrow">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<ContentCategory>("All");

  const filtered =
    activeFilter === "All"
      ? newsItems
      : newsItems.filter((item) => item.category === activeFilter);

  return (
    <div className="news">
      {/* ═══════ HERO ═══════ */}
      <section className="news-hero">
        <div className="news-hero-bg" />
        <div className="news-hero-gradient" />

        <div className="news-hero-content">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="news-eyebrow"
          >
            Aintrix Global Private Limited
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="news-hero-title"
          >
            News &amp; Insights
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="news-hero-sub"
          >
            Updates from across the organization — research breakthroughs,
            product launches, and the thinking behind what we build.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroTextVariants}
            className="news-scroll-cue"
          >
            <span className="news-eyebrow">Scroll</span>
            <div className="news-scroll-line" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ FILTER BAR ═══════ */}
      <div className="news-filter-bar">
        <div className="news-filter-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`news-filter-btn${activeFilter === cat ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════ CONTENT GRID ═══════ */}
      <section className="news-content">
        <div className="news-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NewsCard item={item} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="news-empty">
            <p>No articles in this category yet.</p>
          </div>
        )}
      </section>

      {/* ═══════ NEWSLETTER CTA ═══════ */}
      <section className="news-cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="news-cta-inner"
        >
          <p className="news-eyebrow">Stay Updated</p>
          <h2 className="news-cta-title">
            Get the latest from Aintrix
            <br />
            delivered to your inbox.
          </h2>
          <div className="news-cta-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="news-cta-input"
            />
            <button className="news-cta-button">Subscribe</button>
          </div>
          <p className="news-cta-note">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPORT WITH STYLES
   ═══════════════════════════════════════════════════════ */

export default function NewsPageWithStyles() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <NewsPage />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   CSS — Scoped under .news
   ═══════════════════════════════════════════════════════ */

const css = `
.news {
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

.news ::selection { background: var(--white); color: var(--void); }

/* ─── HERO ─── */
.news-hero {
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

.news-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.03), transparent),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,255,255,0.015), transparent);
}

.news-hero-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--void), transparent);
  pointer-events: none;
}

.news-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
}

.news-eyebrow {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 2rem;
}

.news-hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--white);
  margin-bottom: 1.5rem;
}

.news-hero-sub {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--soft);
  max-width: 520px;
  margin: 0 auto 3rem;
}

.news-scroll-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.news-scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--dim), transparent);
  animation: news-pulse 3s ease-in-out infinite;
}

@keyframes news-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

/* ─── FILTER BAR ─── */
.news-filter-bar {
  position: sticky;
  top: 80px;
  z-index: 40;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
}

.news-filter-inner {
  display: flex;
  gap: 4px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 12px 0;
}

.news-filter-inner::-webkit-scrollbar { display: none; }

.news-filter-btn {
  padding: 8px 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--soft);
  font-size: 0.8rem;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.news-filter-btn:hover {
  color: var(--white);
  border-color: var(--border);
}

.news-filter-btn.active {
  color: var(--void);
  background: var(--white);
  border-color: var(--white);
}

/* ─── CONTENT GRID ─── */
.news-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 24px 6rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}

/* ─── NEWS CARD ─── */
.news-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease;
  height: 100%;
}

.news-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

.news-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.news-card-tag {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dim);
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.news-card-date {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--dim);
}

.news-card-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--white);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.news-card:hover .news-card-title {
  color: #FFFFFF;
}

.news-card-excerpt {
  font-size: 0.85rem;
  font-weight: 300;
  line-height: 1.65;
  color: var(--soft);
  margin-bottom: 1.5rem;
  flex: 1;
}

.news-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.news-card-read {
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--dim);
}

.news-card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--soft);
  transition: all 0.3s ease;
}

.news-card:hover .news-card-arrow {
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--white);
  transform: translateX(2px);
}

/* ─── EMPTY STATE ─── */
.news-empty {
  text-align: center;
  padding: 6rem 0;
  color: var(--dim);
  font-size: 0.9rem;
}

/* ─── NEWSLETTER CTA ─── */
.news-cta {
  padding: 8rem 24px;
  text-align: center;
  border-top: 1px solid var(--border);
}

.news-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.news-cta-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--white);
  margin-bottom: 2.5rem;
}

.news-cta-form {
  display: flex;
  gap: 8px;
  max-width: 440px;
  margin: 0 auto 1rem;
}

@media (max-width: 480px) {
  .news-cta-form {
    flex-direction: column;
  }
}

.news-cta-input {
  flex: 1;
  padding: 14px 20px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--white);
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s ease;
}

.news-cta-input::placeholder {
  color: var(--dim);
}

.news-cta-input:focus {
  border-color: rgba(255, 255, 255, 0.25);
}

.news-cta-button {
  padding: 14px 32px;
  border: 1px solid var(--white);
  border-radius: 999px;
  background: var(--white);
  color: var(--void);
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.news-cta-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

.news-cta-note {
  font-size: 0.7rem;
  color: var(--dim);
}
`;
