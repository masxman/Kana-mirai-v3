"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Text scramble
function useTextScramble(finalText: string, delay: number = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#";
    let frame = 0, raf: number;
    const total = 24;
    const run = () => {
      const p = Math.min(frame / total, 1);
      el.textContent = finalText.split("").map((c, i) =>
        c === " " ? " " : i < Math.floor(p * finalText.length)
          ? c : chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      if (frame < total) { frame++; raf = requestAnimationFrame(run); }
      else el.textContent = finalText;
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(run); }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [finalText, delay]);
  return ref;
}

// Magnetic button
function Btn({ href, children, variant = "primary" }: {
  href: string; children: React.ReactNode; variant?: "primary" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);
  const onLeave = useCallback(() => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }), []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener("mousemove", onMove); el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);

  const base = "inline-flex items-center justify-center gap-2 font-bold text-[0.95rem] px-7 py-[14px] rounded-xl cursor-pointer select-none transition-all";
  const styles = variant === "primary"
    ? `${base} bg-[#10B981] hover:bg-emerald-400 text-[#070708]`
    : `${base} bg-transparent border-[1.5px] border-white/35 hover:border-white/60 text-white`;

  return <a ref={ref} href={href} className={styles}>{children}</a>;
}

export default function Hero() {
  const secRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLSpanElement>(null);
  const l2 = useRef<HTMLSpanElement>(null);
  const l3 = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scramble = useTextScramble("INTEGRATED FM", 1600);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // Cinematic reveal — fade out black cover
      tl.to(coverRef.current, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0)
        .from(tagRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.7)
        .from([l1.current, l2.current], { y: "100%", opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, 0.85)
        .from(l3.current, { y: "100%", opacity: 0, duration: 0.9, ease: "power3.out" }, 1.05)
        .from(descRef.current, { y: 18, opacity: 0, duration: 0.7 }, 1.3)
        .from(btnsRef.current?.children ?? [], { y: 14, opacity: 0, duration: 0.55, stagger: 0.12 }, 1.5);

      // Subtle parallax on photo
      gsap.to(".hero-photo", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#070708]">

      {/* ── Photo ── */}
      <div className="hero-photo absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-bg.png"
          alt="Modern residential community"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Gradient: left-side dark ramp only (right stays clear) ── */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to right, rgba(7,7,8,0.92) 0%, rgba(7,7,8,0.65) 40%, rgba(7,7,8,0.20) 65%, transparent 100%)" }}
      />
      {/* Slight bottom darkening for button readability */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to top, rgba(7,7,8,0.60) 0%, transparent 45%)" }}
      />
      {/* Top edge — very subtle so photo reads clear */}
      <div className="absolute top-0 left-0 right-0 h-28 z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(7,7,8,0.45), transparent)" }}
      />

      {/* ── Black cinematic opener ── */}
      <div ref={coverRef} className="absolute inset-0 z-[2] bg-[#070708]" />

      {/* ── Content Layout ── */}
      <div className="absolute inset-0 z-10 flex flex-col px-5 sm:px-8 xl:px-14">

        {/* Top spacer — accounts for fixed nav + pushes tag into photo */}
        {/* Mobile: 28svh pushes into photo nicely. Desktop: 18svh is enough since nav is small relative to viewport */}
        <div className="h-[28svh] lg:h-[22svh]" />

        {/* Wrapper — limits width on desktop so building shows on right */}
        <div className="max-w-full lg:max-w-[52%] xl:max-w-[46%]">
        <div ref={tagRef} className="inline-flex self-start items-center gap-2.5 bg-black/25 backdrop-blur-md border border-white/12 text-white font-mono text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.22em] px-3.5 py-2 rounded-full mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_7px_rgba(16,185,129,0.9)] animate-pulse flex-shrink-0" />
            Bengaluru //&nbsp;
            <span ref={scramble} className="text-white/75">Integrated FM</span>
          </div>

          {/* Headline */}
          <h1 className="font-sans font-extrabold leading-[0.95] tracking-[-0.03em] mb-5 sm:mb-6"
            style={{ fontSize: "clamp(2.6rem, 7.5vw, 4.8rem)" }}>
            <span className="block overflow-hidden">
              <span ref={l1} className="block text-white">Your Building</span>
            </span>
            <span className="block overflow-hidden">
              <span ref={l2} className="block text-white">Is Built.</span>
            </span>
            <span className="block overflow-hidden mt-1">
              <span ref={l3} className="block italic text-[#10B981]">Now Who Runs It?</span>
            </span>
          </h1>

          {/* Description */}
          <p ref={descRef} className="font-sans text-[0.9rem] sm:text-[0.95rem] lg:text-base text-white/72 leading-relaxed max-w-[360px] sm:max-w-[420px] lg:max-w-[440px] mb-0">
            From possession to handover to long-term management — Kana Mirai is your{" "}
            <strong className="font-bold text-white">single point of accountability</strong>{" "}
            for residential communities.
          </p>

          {/* Flex gap */}
          <div className="flex-1" style={{ minHeight: "5svh", maxHeight: "14svh" }} />

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-col items-start gap-3 pb-10 sm:pb-14 lg:pb-16">
            <Btn href="#solutions" variant="primary">
              I&apos;m a Builder
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Btn>
            <Btn href="#solutions" variant="outline">
              I&apos;m an Association
            </Btn>
          </div>

        </div>
      </div>
    </section>
  );
}
