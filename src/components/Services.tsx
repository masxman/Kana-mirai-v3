"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const services = [
  {
    num: "01",
    category: "Hard Services",
    title: "Security Management",
    desc: "24/7 trained guards, CCTV monitoring, visitor management & access control.",
    img: "/assets/images/srv_security.jpg",
  },
  {
    num: "02",
    category: "Soft Services",
    title: "Housekeeping & Landscaping",
    desc: "Daily common area cleaning, waste management, and perfect landscaping.",
    img: "/assets/images/srv_housekeeping.jpg",
  },
  {
    num: "03",
    category: "Hard Services",
    title: "Electrical & Plumbing (MEP)",
    desc: "Preventive MEP maintenance, emergency response, and asset lifecycle management.",
    img: "/assets/images/srv_mep.jpg",
  },
  {
    num: "04",
    category: "Hard Services",
    title: "DG Operations",
    desc: "Diesel generator O&M ensuring zero power disruption for residents.",
    img: "/assets/images/srv_dg.jpg",
  },
  {
    num: "05",
    category: "Specialist Ops",
    title: "STP / WTP Operations",
    desc: "Sewage and water treatment plant operations with full regulatory compliance.",
    img: "/assets/images/srv_stp.jpg",
  },
  {
    num: "06",
    category: "Soft Services",
    title: "Car Wash & Amenities",
    desc: "On-site car wash and value-added amenity services for modern communities.",
    img: "/assets/images/srv_amenities.jpg",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative min-h-screen overflow-hidden bg-[#050508]"
    >
      {/* Background image that crossfades */}
      <div className="absolute inset-0 z-0">
        {services.map((srv, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          >
            <Image
              src={srv.img}
              alt={srv.title}
              fill
              className="object-cover scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#050508]/80" />
          </div>
        ))}
        {/* Default dark when nothing hovered */}
        <div
          className="absolute inset-0 bg-[#050508] transition-opacity duration-700"
          style={{ opacity: activeIndex === null ? 1 : 0 }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 py-24 lg:py-36">
        {/* Header */}
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-white/30 uppercase block mb-4">
              // 02 — Services
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-none">
              Integrated<br />
              <span className="text-white/40">Facility</span> Operations
            </h2>
          </div>
          <p className="font-sans text-white/50 max-w-xs text-sm leading-relaxed lg:text-right">
            We own the complete operations stack — no fragmented vendors, no finger-pointing.
          </p>
        </div>

        {/* Services list — cinematic hover reveals */}
        <div className="border-t border-white/10">
          {services.map((srv, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group flex items-center gap-6 border-b border-white/10 py-6 lg:py-8 cursor-default transition-all duration-300 hover:px-4"
            >
              {/* Number */}
              <span className="font-mono text-xs text-white/20 w-8 flex-shrink-0 group-hover:text-accent-green transition-colors">
                {srv.num}
              </span>

              {/* Category pill */}
              <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-1 rounded w-32 text-center flex-shrink-0 group-hover:border-accent-green/30 group-hover:text-accent-green/70 transition-all">
                {srv.category}
              </span>

              {/* Title — huge, mix-blend-mode difference effect via color invert on hover */}
              <h3
                className="flex-1 font-sans font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight leading-tight transition-all duration-300"
                style={{
                  mixBlendMode: activeIndex === i ? "difference" : "normal",
                  color: activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.85)",
                }}
              >
                {srv.title}
              </h3>

              {/* Description — fades in on hover */}
              <p className="hidden lg:block font-sans text-sm text-white/0 group-hover:text-white/60 transition-all duration-500 max-w-xs text-right leading-relaxed">
                {srv.desc}
              </p>

              {/* Arrow */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-accent-green group-hover:text-accent-green transition-all duration-300 group-hover:translate-x-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
