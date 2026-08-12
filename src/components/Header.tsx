"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check immediately on mount
    const check = () => setIsScrolled(window.scrollY > 10);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 flex items-center justify-between">
        {/* Logo — hidden on mobile until scrolled */}
        <Link href="/" className={cn(
          "flex items-center gap-3 transition-all duration-500",
          !isScrolled && "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
        )}>
          <div className="w-11 h-11 flex-shrink-0">
            <Image src="/assets/images/logo.png" alt="Kana Mirai Logo" width={44} height={44} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-sans font-bold text-lg leading-tight tracking-tight transition-colors duration-300",
              isScrolled ? "text-primary-dark" : "text-white"
            )}>
              KANA <em className="not-italic text-accent-green">MIRAI</em>
            </span>
            <small className={cn(
              "font-mono text-[0.6rem] uppercase tracking-wider transition-colors duration-300",
              isScrolled ? "text-text-3" : "text-white/50"
            )}>
              Integrated Facility Solutions
            </small>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={cn(
          "hidden lg:flex items-center gap-8 font-sans font-medium text-sm transition-colors duration-300",
          isScrolled ? "text-text-2" : "text-white/70"
        )}>
          <li>
            <Link href="#solutions" className={cn("hover:text-accent-green transition-colors", isScrolled ? "" : "hover:text-white")}>
              Solutions
            </Link>
          </li>
          <li>
            <Link href="#services" className={cn("hover:text-accent-green transition-colors", isScrolled ? "" : "hover:text-white")}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#process" className={cn("hover:text-accent-green transition-colors", isScrolled ? "" : "hover:text-white")}>
              Process
            </Link>
          </li>
          <li>
            <Link href="#why-us" className={cn("hover:text-accent-green transition-colors", isScrolled ? "" : "hover:text-white")}>
              Why Us
            </Link>
          </li>
          <li>
            <Link href="#contact" className={cn("hover:text-accent-green transition-colors", isScrolled ? "" : "hover:text-white")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/919620639754?text=Hi%20Kana%20Mirai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-accent-green hover:bg-emerald-400 text-[#050508] px-5 py-2.5 rounded-md font-sans font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-primary-dark" : "bg-white",
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-primary-dark" : "bg-white",
                isMenuOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-primary-dark" : "bg-white",
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-white border-b border-border-subtle overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col font-sans font-medium text-base text-primary-dark p-6 gap-6">
          <li>
            <Link href="#solutions" onClick={() => setIsMenuOpen(false)}>
              Solutions
            </Link>
          </li>
          <li>
            <Link href="#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="#process" onClick={() => setIsMenuOpen(false)}>
              Process
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <a
              href="https://wa.me/919620639754?text=Hi%20Kana%20Mirai"
              className="inline-flex items-center gap-2 text-accent-green"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
