"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Text Scramble Hook ---
function useTextScramble(finalText: string, startDelay: number = 0) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let frame = 0;
    let raf: number;
    const totalFrames = 28;

    const update = () => {
      const progress = Math.min(frame / totalFrames, 1);
      let output = "";
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === " ") { output += " "; continue; }
        if (i < Math.floor(progress * finalText.length)) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;
      if (frame < totalFrames) { frame++; raf = requestAnimationFrame(update); }
      else el.textContent = finalText;
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(update); }, startDelay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [finalText, startDelay]);

  return elRef;
}

// --- Magnetic Button ---
function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);

  return (
    <a ref={btnRef} href={href} className={className}>{children}</a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useTextScramble("Integrated FM", 1800);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Fade away the black cover
      tl.to(overlayRef.current, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0);
      // Tag slides up
      tl.from(tagRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.6);
      // Headline lines clip-reveal
      [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
        tl.from(ref.current, { y: "110%", opacity: 0, duration: 1, ease: "power3.out" }, 0.75 + i * 0.15);
      });
      tl.from(descRef.current, { y: 20, opacity: 0, duration: 0.7 }, 1.3);
      tl.from(btnsRef.current, { y: 16, opacity: 0, duration: 0.6 }, 1.5);
      tl.from(scrollHintRef.current, { opacity: 0, duration: 0.6 }, 2.0);

      // Parallax: bg image scrolls slower than page
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Text parallax
      gsap.to(".hero-copy", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#050508]"
    >
      {/* ── Full-bleed apartment background photo ── */}
      <div className="hero-bg-img absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-bg.png"
          alt="Modern residential apartment complex at dusk"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── Gradient overlays for text legibility ── */}
      {/* Left-to-right gradient — heavier on mobile since text covers full width */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050508]/90 via-[#050508]/50 to-transparent" />
      {/* Bottom-up gradient — keeps lower text area readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
      {/* Top darkening so the transparent nav sits on a dark area */}
      <div className="absolute top-0 left-0 right-0 h-32 z-[1] bg-gradient-to-b from-[#050508]/70 to-transparent" />

      {/* ── Black cinematic opener (fades to reveal photo) ── */}
      <div ref={overlayRef} className="absolute inset-0 z-[2] bg-[#050508]" />

      {/* ── Main Copy ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-12 pb-14 sm:pb-20 lg:pb-28 pt-0">
        <div className="hero-copy max-w-[520px] lg:max-w-[640px]">

          {/* Tag */}
          <div
            ref={tagRef}
            className="inline-flex items-center gap-2.5 bg-black/30 backdrop-blur-md border border-white/15 text-white font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] px-3.5 py-2 rounded-full mb-7 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse flex-shrink-0" />
            Bengaluru //&nbsp;
            <span ref={scrambleRef} className="text-white/80">Integrated FM</span>
          </div>

          {/* Headline */}
          <h1 className="font-sans font-extrabold text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] tracking-tighter mb-6 sm:mb-8">
            {/* Line 1 */}
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block text-white">Your Building</span>
            </span>
            {/* Line 2 */}
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block text-white">Is Built.</span>
            </span>
            {/* Line 3 — accent green italic */}
            <span className="block overflow-hidden mt-1">
              <span ref={line3Ref} className="block italic font-extrabold text-accent-green">
                Now Who Runs It?
              </span>
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="font-sans text-[0.95rem] sm:text-base lg:text-lg text-white/75 max-w-[480px] leading-relaxed mb-8 sm:mb-10"
          >
            From possession to handover to long-term management — Kana Mirai is your{" "}
            <strong className="font-bold text-white">single point of accountability</strong>{" "}
            for residential communities.
          </p>

          {/* CTAs — NOT full width, auto size matching reference design */}
          <div ref={btnsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Primary — Green */}
            <MagneticButton
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 bg-accent-green hover:bg-emerald-400 text-[#050508] font-bold px-8 py-4 rounded-lg text-sm sm:text-base transition-colors cursor-pointer"
            >
              I&apos;m a Builder
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </MagneticButton>

            {/* Secondary — outline */}
            <MagneticButton
              href="#solutions"
              className="inline-flex items-center justify-center bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-lg text-sm sm:text-base transition-all cursor-pointer"
            >
              I&apos;m an Association
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/25" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">Scroll</span>
      </div>
    </section>
  );
}
