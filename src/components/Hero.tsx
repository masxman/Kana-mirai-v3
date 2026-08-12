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

// Magnetic button — desktop only (no effect on touch)
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
    // Only attach magnetic on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [onMove, onLeave]);

  const base = "inline-flex items-center justify-center gap-2 font-bold text-[0.9rem] px-7 py-[14px] rounded-xl cursor-pointer select-none transition-all";
  const styles = variant === "primary"
    ? `${base} bg-[#10B981] hover:bg-emerald-400 text-[#070708] min-w-[200px]`
    : `${base} bg-transparent border border-white/35 hover:border-white/60 text-white min-w-[200px]`;

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
      tl.to(coverRef.current, { opacity: 0, duration: 1.4, ease: "power2.inOut" }, 0)
        .from(tagRef.current, { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.7)
        .from([l1.current, l2.current], { y: "100%", opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, 0.85)
        .from(l3.current, { y: "100%", opacity: 0, duration: 0.9, ease: "power3.out" }, 1.05)
        .from(descRef.current, { y: 18, opacity: 0, duration: 0.7 }, 1.3)
        .from(btnsRef.current?.children ?? [], { y: 14, opacity: 0, duration: 0.55, stagger: 0.12 }, 1.5);

      // Photo parallax on scroll
      gsap.to(".hero-photo", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} id="hero" className="relative overflow-hidden bg-[#070708]" style={{ minHeight: "100svh" }}>

      {/* ── Background photo ── */}
      <div className="hero-photo absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-bg.png"
          alt="Modern residential community"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── Left gradient only — right side shows building clearly ── */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to right, rgba(7,7,8,0.88) 0%, rgba(7,7,8,0.60) 38%, rgba(7,7,8,0.18) 62%, transparent 100%)"
      }} />
      {/* Bottom ramp — readable area for buttons */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to top, rgba(7,7,8,0.65) 0%, transparent 42%)"
      }} />
      {/* Top edge — subtle so sky shows */}
      <div className="absolute top-0 left-0 right-0 h-24 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(7,7,8,0.40), transparent)"
      }} />

      {/* ── Black cinematic opener ── */}
      <div ref={coverRef} className="absolute inset-0 z-[2] bg-[#070708]" />

      {/* ════════════════════════════════════════
          CONTENT — Safe Flex Structure
         ════════════════════════════════════════ */}
      <div className="absolute inset-0 z-10 flex flex-col">

        {/* Reduced top spacer on mobile to ensure content fits */}
        <div className="flex-shrink-0 h-[18svh] lg:h-[22svh]" />

        {/* Inner area — flex-1 with mt-auto on buttons to push them down securely */}
        <div className="flex flex-col flex-1 px-5 sm:px-8 xl:px-14 pb-10 sm:pb-14 lg:pb-16">

          {/* Width cap on desktop */}
          <div className="flex flex-col flex-1 lg:max-w-[52%] xl:max-w-[46%]">

            {/* Tag */}
            <div
              ref={tagRef}
              className="inline-flex self-start items-center gap-2.5 bg-black/30 backdrop-blur-md border border-white/10 text-white font-mono text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.22em] px-3.5 py-2 rounded-full mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse flex-shrink-0" />
              Bengaluru //&nbsp;
              <span ref={scramble} className="text-white/80">Integrated FM</span>
            </div>

            {/* Headline */}
            <h1
              className="font-sans font-extrabold leading-[0.95] tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(2.55rem, 7vw, 4.6rem)" }}
            >
              <span className="block overflow-hidden">
                <span ref={l1} className="block text-white">Your Building</span>
              </span>
              <span className="block overflow-hidden">
                <span ref={l2} className="block text-white">Is Built.</span>
              </span>
              <span className="block overflow-hidden mt-0.5">
                <span ref={l3} className="block italic text-[#10B981]">Now Who Runs It?</span>
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="font-sans text-[0.88rem] sm:text-[0.94rem] lg:text-base text-white/70 leading-relaxed max-w-[370px] sm:max-w-[430px]"
            >
              From possession to handover to long-term management — Kana Mirai is your{" "}
              <strong className="font-bold text-white/90">single point of accountability</strong>{" "}
              for residential communities.
            </p>

            {/* Buttons pushed to bottom using mt-auto */}
            <div ref={btnsRef} className="mt-auto pt-6 flex flex-col items-start gap-3">
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
      </div>
    </section>
  );
}
