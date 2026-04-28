"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-scrolled backdrop-blur-md border-b border-white/5" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-75 transition-opacity relative z-10"
            onClick={close}
          >
            <Image
              src="/Vobits_logo.png"
              alt="Vobits"
              width={120}
              height={36}
              className="h-8 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="#contact"
            className="hidden md:inline-flex items-center border border-white/15 text-white text-sm px-5 py-2 hover:bg-white hover:text-black transition-all duration-200"
          >
            Let&apos;s Talk
          </Link>

          {/* Burger — morphs into X */}
          <button
            className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-end gap-1.25"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block h-px bg-white transition-all duration-500 origin-right"
              style={{
                width: menuOpen ? "100%" : "1.5rem",
                transform: menuOpen ? "rotate(-45deg) translateY(0px)" : "none",
              }}
            />
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{
                width: "1rem",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block h-px bg-white transition-all duration-500 origin-right"
              style={{
                width: menuOpen ? "100%" : "1.25rem",
                transform: menuOpen ? "rotate(45deg) translateY(0px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col pointer-events-none"
        aria-hidden={!menuOpen}
      >
        {/* Background panel — scaleY reveal from top */}
        <div
          className="absolute inset-0 bg-[#080808] transition-transform duration-500"
          style={{
            transformOrigin: "top",
            transform: menuOpen ? "scaleY(1)" : "scaleY(0)",
            transitionTimingFunction: "cubic-bezier(0.26, 1, 0.48, 1)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full px-6 pt-24 pb-10">
          {/* Nav links — each clipped + rotated reveal */}
          <nav className="flex-1 flex flex-col justify-center gap-1">
            {navLinks.map((link, i) => (
              <div key={link.href} style={{ overflow: "hidden" }}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block text-[2.8rem] font-black tracking-tight text-white leading-[1.1] py-1 hover:text-white/60 transition-colors"
                  style={{
                    transformOrigin: "0 100%",
                    transform: menuOpen
                      ? "rotate(0deg) translateY(0)"
                      : "rotate(5deg) translateY(110%)",
                    transition: `transform 0.55s cubic-bezier(0.26, 1, 0.48, 1) ${
                      menuOpen ? 0.08 + i * 0.06 : 0
                    }s`,
                  }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Bottom: location + CTA */}
          <div
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(1rem)",
              transition: `opacity 0.5s ease ${menuOpen ? "0.38s" : "0s"}, transform 0.5s ease ${menuOpen ? "0.38s" : "0s"}`,
            }}
          >
            <div className="border-t border-white/10 pt-6 flex items-end justify-between">
              <div>
                <p className="text-[0.65rem] tracking-[0.25em] text-white/30 uppercase mb-1">
                  Based in
                </p>
                <p className="text-sm text-white/50">Nairobi, Kenya</p>
                <p className="text-[0.75rem] text-white/30 mt-1">vobits.ke</p>
              </div>
              <Link
                href="#contact"
                onClick={close}
                className="bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-gray-100 transition-colors"
              >
                Let&apos;s Talk →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
