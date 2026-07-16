"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
}

export default function StaggerReveal({
  children,
  className = "",
  stagger = 0.12,
  y = 24,
  duration = 0.8,
  start = "top 85%",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = el.children;
    if (!items.length) return;

    if (prefersReduced) {
      Array.from(items).forEach((item) => {
        gsap.set(item, { opacity: 1, y: 0 });
      });
      return;
    }

    gsap.set(items, { opacity: 0, y });

    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [stagger, y, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
