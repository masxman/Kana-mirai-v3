"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Contact / CTA Section */}
      <section
        id="contact"
        className="relative bg-[#040814] py-24 lg:py-36 overflow-hidden"
      >
        {/* Green glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, #FFB800, transparent)" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left copy */}
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-white/30 uppercase block mb-6">
                // 06 — Contact
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-none mb-8">
                Ready to<br />
                <span className="text-accent-gold">Transition?</span>
              </h2>
              <p className="font-sans text-white/50 text-lg leading-relaxed mb-12 max-w-sm">
                Let&apos;s talk about your project — whether it&apos;s a fresh handover or a long-term management contract.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: <Phone size={16} />, label: "+91 96206 39754", sub: "Phone & WhatsApp", href: "tel:+919620639754" },
                  { icon: <Mail size={16} />, label: "info@kanamirai.com", sub: "Email", href: "mailto:info@kanamirai.com" },
                  { icon: <MapPin size={16} />, label: "Nagarabhavi, Bengaluru", sub: "560072, Karnataka", href: null },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold flex-shrink-0 group-hover:bg-accent-gold/10 transition-colors">
                      {c.icon}
                    </div>
                    <div>
                      {c.href ? (
                        <a href={c.href} className="font-sans font-semibold text-white hover:text-accent-gold transition-colors block">
                          {c.label}
                        </a>
                      ) : (
                        <span className="font-sans font-semibold text-white block">{c.label}</span>
                      )}
                      <span className="font-mono text-xs text-white/30">{c.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919620639754?text=Hi%20Kana%20Mirai%2C%20I%27d%20like%20to%20discuss%20facility%20management."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold px-8 py-4 rounded-md text-sm transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Right — contact form */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 lg:p-10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-accent-gold">
                  Contact Us
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form className="space-y-5" id="contactForm">
                {[
                  { id: "cName", label: "Full Name", type: "text", placeholder: "Your name", autoComplete: "name" },
                  { id: "cPhone", label: "Phone No", type: "tel", placeholder: "+91 XXXXX XXXXX", autoComplete: "tel" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      required
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent-gold/50 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="cRole" className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">Your Role</label>
                  <select
                    id="cRole"
                    required
                    className="w-full bg-white/[0.05] border border-white/10 text-white/80 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent-gold/50 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-slate-900">Select your role</option>
                    <option value="builder" className="bg-slate-900">Builder / Developer</option>
                    <option value="association" className="bg-slate-900">Resident Association</option>
                    <option value="other" className="bg-slate-900">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cMsg" className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">Message</label>
                  <textarea
                    id="cMsg"
                    rows={3}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/20 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent-gold/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contactSubmit"
                  className="w-full bg-accent-gold hover:bg-yellow-400 text-[#040814] font-bold py-4 rounded-lg text-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Send Enquiry →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030305] border-t border-white/[0.06] py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/logo.png"
                alt="Kana Mirai Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <div>
                <div className="font-sans font-bold text-white text-sm tracking-tight">
                  KANA <em className="not-italic text-accent-gold">MIRAI</em>
                </div>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Transitioning Properties, Sustaining Excellence.
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap gap-6 font-sans text-sm text-white/30">
              {["Solutions", "Services", "Process", "Why Us", "Contact"].map((l) => (
                <Link key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors">
                  {l}
                </Link>
              ))}
            </nav>

            {/* Legal */}
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              © 2026 Kana Mirai IFS
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp — positioned above bottom so it doesn't overlap CTAs */}
      <a
        href="https://wa.me/919620639754?text=Hi%20Kana%20Mirai"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-8 right-5 z-50 w-13 h-13 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{ width: 52, height: 52 }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
