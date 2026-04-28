"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    action: "Build",
    subject: "Applications",
    bg: "#0a1628",
    accent: "#3b82f6",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Code on a monitor — bespoke application development",
  },
  {
    action: "Implement",
    subject: "Business Central",
    bg: "#160a28",
    accent: "#8b5cf6",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Professional working at a laptop — ERP implementation",
  },
  {
    action: "Automate",
    subject: "HR & Payroll",
    bg: "#0a2820",
    accent: "#14b8a6",
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Team in a modern office — HR and payroll services",
  },
  {
    action: "Launch",
    subject: "Digital Products",
    bg: "#281a0a",
    accent: "#f97316",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Mobile phone showing a digital application",
  },
  {
    action: "Scale",
    subject: "Your Business",
    bg: "#0a2816",
    accent: "#22c55e",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "City skyline — scaling your business across East Africa",
  },
];

/** Rotated-clip headline stack — only active + prev are ever visible. */
function HeadlineStack({
  activeIndex,
  prevIndex,
  fontSize,
}: {
  activeIndex: number;
  prevIndex: number | null;
  fontSize: string;
}) {
  return (
    <>
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const isPrev = i === prevIndex;
        const visible = isActive || isPrev;
        const rot = isActive ? 0 : isPrev ? -8 : 8;

        return (
          <div
            key={i}
            className="absolute inset-0 flex flex-col"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              // Non-visible slides are opacity:0 so their instant reset to 8deg is invisible
              opacity: visible ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {[slide.action, slide.subject].map((text, li) => (
              <div
                key={li}
                style={{
                  overflow: "hidden",
                  flex: 1,
                  // Extra clip padding so descenders clear the line boundary
                  paddingBottom: "0.5rem",
                  marginBottom: "-0.5rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize,
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-geist-sans)",
                    whiteSpace: "nowrap",
                    color: li === 0 ? "#ffffff" : "rgba(255,255,255,0.28)",
                    transformOrigin: "-8em 50%",
                    transform: `rotate(${rot}deg)`,
                    // Only animate the visible pair; others snap instantly (but are hidden)
                    transition: visible
                      ? `transform 1s cubic-bezier(0.34, 0, 0, 1) ${li * 0.1}s`
                      : "none",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setPrevIndex(activeIndex);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((curr) => {
        const next = (curr + 1) % slides.length;
        setPrevIndex(curr);
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Clear prevIndex after animation finishes — prevents ghost rotations
  useEffect(() => {
    if (prevIndex === null) return;
    const t = setTimeout(() => setPrevIndex(null), 1150);
    return () => clearTimeout(t);
  }, [prevIndex]);

  const current = slides[activeIndex];

  return (
    <section
      id="hero"
      style={{
        backgroundColor: current.bg,
        transition: "background-color 1s cubic-bezier(0.34, 0, 0, 1)",
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      {/* ════════════════════════════════════════
          DESKTOP  (lg+)
          LEFT  60% — pure headline + design cues
          RIGHT 40% — image strip + CTA overlay
          ════════════════════════════════════════ */}
      <div
        className="hidden lg:flex"
        style={{ minHeight: "100dvh" }}
      >
        {/* ── LEFT: headline ── */}
        <div
          className="flex flex-col px-12 xl:px-20 pt-32 pb-12"
          style={{ width: "60%" }}
        >
          {/* Top row: location + counter */}
          <div className="flex items-center justify-between mb-8">
            <span className="flex items-center gap-2 text-xs tracking-[0.28em] text-white/30 uppercase">
            
            </span>
            <span className="text-xs text-white/20 font-mono tabular-nums tracking-widest">
              {String(activeIndex + 1).padStart(2, "0")}&nbsp;—&nbsp;
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Headline — fills vertical space between top and bottom bars */}
          <div className="flex-1 flex items-center">
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "clamp(7.5rem, 12.5vw, 19rem)" }}
            >
              <HeadlineStack
                activeIndex={activeIndex}
                prevIndex={prevIndex}
                fontSize="clamp(3rem, 5.2vw, 8rem)"
              />
            </div>
          </div>

          {/* Bottom design bar */}
          <div className="mt-8 space-y-6">
            {/* Service capability tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "App Development",
                "Business Central",
                "HR & Payroll",
                "Digital Products",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[0.7rem] border border-white/10 text-white/25 px-3 py-1 tracking-[0.12em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress dashes */}
            <div className="flex items-center gap-3 pt-5 border-t border-white/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="py-2"
                >
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "2.5rem" : "0.6rem",
                      backgroundColor:
                        i === activeIndex
                          ? "#ffffff"
                          : "rgba(255,255,255,0.18)",
                    }}
                  />
                </button>
              ))}
              {/* Thin progress bar */}
              <div className="flex-1 h-px bg-white/8 ml-2 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500"
                  style={{
                    width: `${((activeIndex + 1) / slides.length) * 100}%`,
                    backgroundColor: current.accent,
                    transition:
                      "width 3.8s linear, background-color 1s cubic-bezier(0.34,0,0,1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: image strip + CTA ── */}
        <div className="relative overflow-hidden" style={{ width: "40%" }}>
          {/* Vertical sliding images */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `translateY(${(i - activeIndex) * 100}%)`,
                transition: "transform 1s cubic-bezier(0.34, 0, 0, 1)",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover"
                sizes="40vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Gradient for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
            }}
          />
          {/* Left-edge gradient to blend into the section bg */}
          <div
            className="absolute inset-y-0 left-0 w-16 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${current.bg}, transparent)`,
              transition: "background 1s cubic-bezier(0.34,0,0,1)",
            }}
          />

          {/* domain label top-right */}
          <p className="absolute top-32 right-8 text-[0.7rem] tracking-[0.25em] text-white/25 uppercase">
            vobits.ke
          </p>

          {/* CTA panel — bottom of right column */}
          <div className="absolute bottom-0 left-0 right-0 px-9 pb-12">
            <p className="text-[0.85rem] text-white/50 mb-7 leading-[1.9] max-w-88">
              From bespoke applications to Microsoft Dynamics 365 Business
              Central and outsourced HR &amp; payroll — powering businesses
              across East Africa.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="#services"
                className="bg-white text-black text-sm font-semibold px-7 py-3.5 hover:bg-gray-100 transition-colors text-center"
              >
                Explore Services
              </Link>
              <Link
                href="#contact"
                className="group border border-white/25 text-white text-sm font-semibold px-7 py-3.5 hover:border-white/60 transition-all flex items-center justify-center gap-2"
              >
                {"Let's Talk"}
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE  (< lg)
          Full-bleed image + headline + CTA stacked
          ════════════════════════════════════════ */}
      <div
        className="lg:hidden relative flex flex-col px-6 pt-28 pb-10"
        style={{ minHeight: "100dvh" }}
      >
        {/* Background: fading image */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        {/* Location + counter */}
        <div className="relative flex items-center justify-between mb-6">
          {/* <span className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-white/40 uppercase">
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: current.accent }}
            />
            Nairobi, Kenya */}
          {/* </span> */}
          <span className="text-[0.65rem] text-white/25 font-mono tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Headline */}
        <div className="relative flex-1 flex items-center">
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "clamp(6.5rem, 22vw, 12.5rem)" }}
          >
            <HeadlineStack
              activeIndex={activeIndex}
              prevIndex={prevIndex}
              fontSize="clamp(2.5rem, 9.2vw, 5.5rem)"
            />
          </div>
        </div>

        {/* Copy + CTA + indicators */}
        <div className="relative space-y-5 mt-4">
          <p className="text-sm text-white/45 leading-[1.85]">
            Bespoke apps, Business Central &amp; outsourced HR — powering
            businesses across East Africa.
          </p>
          <div className="flex gap-3">
            <Link
              href="#services"
              className="bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="border border-white/25 text-white text-sm font-semibold px-6 py-3 hover:border-white/50 transition-all"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="block h-px transition-all duration-500"
                  style={{
                    width: i === activeIndex ? "1.75rem" : "0.5rem",
                    backgroundColor:
                      i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.25)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
