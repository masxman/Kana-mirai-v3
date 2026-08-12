"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    num: "01",
    tag: "For Builders & Developers",
    title: "Builder-to-Association\nTransition",
    quote: "We finished building. But maintaining it for a year and forming the association is draining our resources and creating legal risk.",
    points: [
      "Operations takeover from Day 1 of possession",
      "Legal formation of the Owners' Association",
      "Structured handover — zero liability left on you",
      "Long-term facility management post-handover",
    ],
    cta: "Talk to Builder Relations →",
    href: "https://wa.me/919620639754?text=Hi%2C%20builder%20interested%20in%20transition%20services.",
    bg: "from-slate-950 to-slate-900",
    accent: "#FFB800",
    label: "bg-emerald-500/10 text-yellow-400 border border-emerald-500/20",
  },
  {
    num: "02",
    tag: "For Resident Associations",
    title: "Association Takeover\nSupport",
    quote: "Our builder is handing over, but we don't know what to check, what documents to demand, or how to legally take control.",
    points: [
      "We represent your association through takeover",
      "A-to-Z asset verification: MEP, STP/WTP, electrical",
      "Snag identification & vendor closure tracking",
      "Seamless transition into professional FM",
    ],
    cta: "Get a Free Property Audit →",
    href: "https://wa.me/919620639754?text=Hi%2C%20association%20seeking%20takeover%20support.",
    bg: "from-[#0a1628] to-[#0d1f3c]",
    accent: "#FFB800",
    label: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
];

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Horizontal scroll: pin the section, slide track left
      const totalWidth = (solutions.length - 1) * 100; // 100vw per extra panel

      gsap.to(track, {
        x: `-${totalWidth}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${solutions.length * window.innerWidth * 0.9}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative overflow-hidden bg-[#040814]"
      style={{ height: "100svh" }}
    >
      {/* Section label */}
      <div className="absolute top-8 left-8 z-20 font-mono text-xs tracking-[0.25em] text-white/30 uppercase">
        // 01 — Solutions
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 font-mono text-xs text-white/30 uppercase tracking-widest">
        <span>Scroll</span>
        <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
          <path d="M0 5h22M18 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${solutions.length * 100}vw` }}
      >
        {solutions.map((sol, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 w-screen h-full flex items-center justify-center bg-gradient-to-br ${sol.bg}`}
          >
            {/* Dot grid background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Green glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(ellipse 60% 60% at 30% 50%, ${sol.accent}, transparent)`,
              }}
            />

            <div className="relative z-10 max-w-3xl w-full mx-auto px-8 md:px-16">
              {/* Panel number */}
              <div className="font-mono text-[8rem] leading-none font-bold text-white/[0.04] absolute -top-8 -left-4 select-none">
                {sol.num}
              </div>

              <span className={`inline-block text-xs font-mono px-3 py-1.5 rounded-full mb-8 ${sol.label}`}>
                {sol.tag}
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter mb-6 whitespace-pre-line">
                {sol.title}
              </h2>

              <blockquote className="text-white/50 font-sans italic text-base sm:text-lg border-l-2 border-white/10 pl-4 mb-8 leading-relaxed">
                &ldquo;{sol.quote}&rdquo;
              </blockquote>

              <ul className="space-y-3 mb-10">
                {sol.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/80 font-sans text-sm sm:text-base">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href={sol.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-gold hover:bg-yellow-400 text-[#040814] font-bold px-8 py-4 rounded-md text-sm transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              >
                {sol.cta}
              </a>
            </div>

            {/* Panel progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {solutions.map((_, k) => (
                <div
                  key={k}
                  className={`h-0.5 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-accent-gold" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
