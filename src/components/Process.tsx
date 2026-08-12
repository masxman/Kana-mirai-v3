"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Assessment",
    desc: "Full property audit, asset verification & gap analysis. Every MEP system, STP unit, and common area documented to a granular level.",
    detail: "2–5 day comprehensive site survey",
  },
  {
    num: "02",
    title: "Documentation",
    desc: "Legal formation, compliance checks & operational planning. We handle all regulatory filings and SLA agreements from day one.",
    detail: "Legal, compliance & SLA frameworks",
  },
  {
    num: "03",
    title: "Transition",
    desc: "Structured handover, snag closure & vendor coordination. We negotiate with the builder on your behalf until every punch item is resolved.",
    detail: "Zero-gap handover protocol",
  },
  {
    num: "04",
    title: "Operations",
    desc: "Ongoing facility management with full transparency & reporting. Monthly reports, live dashboard, and proactive maintenance schedules.",
    detail: "Perpetual operations & monitoring",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      // Animate the SVG progress line drawing
      const line = lineRef.current;
      if (line) {
        const length = 400;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      }

      // Stagger reveal steps
      gsap.from(".proc-step-item", {
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-[#040814] py-24 lg:py-36"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

          {/* LEFT — sticky panel */}
          <div className="lg:sticky lg:top-28">
            <span className="font-mono text-xs tracking-[0.25em] text-white/30 uppercase block mb-6">
              // 04 — Methodology
            </span>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tighter leading-none mb-6">
              From Chaos<br />
              <span className="text-white/30">to Clarity</span>
            </h2>
            <p className="font-sans text-white/40 text-base leading-relaxed mb-12 max-w-xs">
              A 4-step protocol that eliminates uncertainty from every property transition.
            </p>

            {/* SVG progress line */}
            <div className="relative h-[400px] w-16 hidden lg:block">
              <svg width="2" height="400" viewBox="0 0 2 400" className="absolute left-4">
                {/* Track */}
                <line x1="1" y1="0" x2="1" y2="400" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
                {/* Animated progress */}
                <line
                  ref={lineRef}
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="400"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {/* Step dots on the line */}
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="absolute left-[13px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-gold border-2 border-[#040814]"
                  style={{ top: `${(i / (steps.length - 1)) * 380}px` }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — scrolling steps */}
          <div className="process-steps space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <div key={i} className="proc-step-item group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="font-mono text-xs text-accent-gold mb-1">{step.num}</div>
                    <div className="w-px h-full bg-white/5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4 group-hover:text-accent-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="font-sans text-white/50 text-base leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-accent-gold/60 bg-accent-gold/5 border border-accent-gold/10 px-3 py-1.5 rounded-full">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
