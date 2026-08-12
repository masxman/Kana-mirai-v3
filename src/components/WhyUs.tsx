"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const whyItems = [
  { num: "01", title: "Single-Point Accountability", desc: "One contract. One team. One number to call — whether it's security, sewage, or power outage.", pill: "Single Vendor" },
  { num: "02", title: "End-to-End Coverage", desc: "From legal association formation to daily housekeeping — we are the only company in Bengaluru that does it all.", pill: "Integrated FM" },
  { num: "03", title: "Professional Documentation", desc: "Every asset, every SLA, every handover — documented, verified, transparent. No surprises, no disputes.", pill: "Audit-Ready" },
  { num: "04", title: "Cost Optimisation", desc: "We structure operations to cut overhead. Your maintenance costs go down as our systems mature.", pill: "ROI Positive" },
  { num: "05", title: "Rapid Emergency Response", desc: "Defined SLAs, 24/7 on-call teams. Emergencies don't wait and neither do we.", pill: "24/7 SLA" },
  { num: "06", title: "Resident-First Culture", desc: "Happy residents mean fewer complaints, higher retention, and a stronger property reputation.", pill: "Community" },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".why-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="why-us" className="relative bg-white py-24 lg:py-36 overflow-hidden">
      {/* Subtle top stripe */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="mb-16 lg:mb-24">
          <span className="font-mono text-xs tracking-[0.25em] text-text-3 uppercase block mb-4">// 05 — Differentiators</span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-primary-dark tracking-tighter leading-none">
            We Don&apos;t Just Audit.<br />
            <span className="text-text-3">We Don&apos;t Just Guard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
          {whyItems.map((item, i) => (
            <div
              key={i}
              className="why-item group bg-white p-8 hover:bg-primary-dark transition-all duration-500 cursor-default"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-text-4 group-hover:text-white/30 transition-colors">
                  {item.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-2 py-1 rounded-full">
                  {item.pill}
                </span>
              </div>
              <h3 className="font-sans font-bold text-xl text-primary-dark group-hover:text-white tracking-tight mb-3 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-text-3 group-hover:text-white/50 leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
