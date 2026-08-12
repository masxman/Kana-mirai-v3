"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    size: "hero", // spans 2 rows
    title: "Client Portal",
    desc: "Your property's heartbeat, live 24/7. No more guesswork or hidden data.",
    img: "/assets/images/premium_dash_ui.jpg",
    icon: null,
  },
  {
    size: "sm",
    title: "Live Tracking",
    desc: "Every request logged, tracked, and resolved with a full audit trail.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    size: "sm",
    title: "SLA Compliance",
    desc: "Response times, resolution rates & performance metrics in real-time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    size: "sm",
    title: "Automated Reports",
    desc: "Financial summaries and maintenance logs generated automatically.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
];

// Mouse tracking glow card
function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] ${className}`}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--glow-x) var(--glow-y), rgba(16,185,129,0.12), transparent 70%)",
        }}
      />
      <div className="glow-overlay pointer-events-none absolute inset-0 rounded-2xl" />
      {children}
    </div>
  );
}

export default function Dashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="relative bg-white py-24 lg:py-36 overflow-hidden"
    >
      {/* Light section — dramatic contrast with dark sections around it */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <span className="font-mono text-xs tracking-[0.25em] text-text-3 uppercase block mb-4">
            // 03 — Technology
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-primary-dark tracking-tighter leading-none mb-6">
            Complete<br />
            <span className="text-text-3">Transparency.</span>
          </h2>
          <p className="font-sans text-text-2 max-w-md text-lg leading-relaxed">
            Real-time visibility into every corner of your property&apos;s operations.
          </p>
        </div>

        {/* Bento Grid — pure CSS grid, no table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {/* Hero card — spans 2 cols, 2 rows */}
          <div className="bento-card group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl border border-slate-200 bg-primary-dark cursor-default">
            {/* Mouse tracking glow on dark card */}
            <div className="p-8 h-full flex flex-col">
              <span className="font-mono text-xs tracking-widest text-accent-green uppercase mb-2">
                Live Dashboard
              </span>
              <h3 className="font-sans font-bold text-2xl text-white mb-2">Client Portal</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
                Your property&apos;s heartbeat, live 24/7. No more guesswork or hidden data.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[70%] overflow-hidden">
              <Image
                src="/assets/images/premium_dash_ui.jpg"
                alt="Dashboard UI"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/20 to-transparent" />
            </div>
          </div>

          {/* Feature cards */}
          {features.slice(1).map((feat, i) => (
            <GlowCard key={i} className="bento-card group cursor-default p-6 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green mb-4">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-sans font-bold text-base text-primary-dark mb-1.5">{feat.title}</h3>
                <p className="font-sans text-text-3 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
