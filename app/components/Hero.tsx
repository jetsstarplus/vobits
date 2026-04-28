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

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setPrevIndex(activeIndex);
      setTransitioning(true);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % slides.length;
        setPrevIndex(current);
        setTransitioning(true);
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const current = slides[activeIndex];

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        backgroundColor: current.bg,
        transition: "background-color 1s cubic-bezier(0.34, 0, 0, 1)",
        minHeight: "100dvh",
      }}
    >
      {/* ── Desktop layout ── */}
      <div
        className="hidden lg:grid min-h-screen"
        style={{ gridTemplateColumns: "60fr 40fr", minHeight: "100dvh" }}
      >
        {/* Left: headline + copy */}
        <div className="flex flex-col justify-between px-12 xl:px-20 pt-36 pb-14">
          {/* Rotating headline stack */}
          <div className="flex-1 flex items-center">
            <div
              className="relative w-full"
              style={{ height: "clamp(8rem, 22vw, 26rem)" }}
            >
              {slides.map((slide, i) => {
                const isActive = i === activeIndex;
                const isPrev = i === prevIndex;
                const rot = isActive ? 0 : isPrev ? -8 : 8;
                const doTransition = transitioning && (isActive || isPrev);

                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col"
                    style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
                  >
                    {[slide.action, slide.subject].map((text, li) => (
                      <div
                        key={li}
                        style={{
                          overflow: "hidden",
                          flex: 1,
                          paddingBottom: "0.4rem",
                          marginBottom: "-0.4rem",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontSize: "clamp(3.5rem, 9vw, 11rem)",
                            fontWeight: 900,
                            lineHeight: 1.0,
                            letterSpacing: "-0.03em",
                            fontFamily: "var(--font-geist-sans)",
                            color:
                              li === 0 ? "#ffffff" : "rgba(255,255,255,0.3)",
                            transformOrigin: "-8em 50%",
                            transform: `rotate(${rot}deg)`,
                            transition: doTransition
                              ? `transform 1s cubic-bezier(0.34, 0, 0, 1) ${li * 0.09}s`
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
            </div>
          </div>

          {/* Static copy + CTA + indicators */}
          <div className="space-y-8">
            <p className="text-[0.9rem] text-white/45 max-w-xs leading-[1.9]">
              From bespoke applications to Microsoft Dynamics 365 Business
              Central and outsourced HR &amp; payroll — powering businesses
              across East Africa.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#services"
                className="bg-white text-black text-sm font-semibold px-8 py-4 hover:bg-gray-100 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                href="#contact"
                className="group border border-white/20 text-white text-sm font-semibold px-8 py-4 hover:border-white/60 transition-all flex items-center gap-2"
              >
                {"Let's Talk"}
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <span className="text-xs text-white/25 font-mono tabular-nums tracking-widest">
                {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
                {String(slides.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <span
                      className="block h-px transition-all duration-500"
                      style={{
                        width: i === activeIndex ? "2rem" : "0.6rem",
                        backgroundColor:
                          i === activeIndex
                            ? "#ffffff"
                            : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </button>
                ))}
              </div>
              <span
                className="ml-auto w-2 h-2 rounded-full"
                style={{
                  backgroundColor: current.accent,
                  transition:
                    "background-color 1s cubic-bezier(0.34, 0, 0, 1)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right: vertical image strip */}
        <div className="relative overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `translateY(${(i - activeIndex) * 100}%)`,
                transition: transitioning
                  ? "transform 1s cubic-bezier(0.34, 0, 0, 1)"
                  : "none",
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
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="lg:hidden flex flex-col min-h-screen px-6 pt-32 pb-12 relative">
        {/* Background image (fades between slides) */}
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

        {/* Mobile headline */}
        <div className="relative flex-1 flex items-center">
          <div
            className="relative w-full"
            style={{ height: "clamp(6rem, 24vw, 10rem)" }}
          >
            {slides.map((slide, i) => {
              const isActive = i === activeIndex;
              const isPrev = i === prevIndex;
              const rot = isActive ? 0 : isPrev ? -8 : 8;
              const doTransition = transitioning && (isActive || isPrev);

              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col"
                  style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
                >
                  {[slide.action, slide.subject].map((text, li) => (
                    <div
                      key={li}
                      style={{
                        overflow: "hidden",
                        flex: 1,
                        paddingBottom: "0.3rem",
                        marginBottom: "-0.3rem",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "clamp(2.8rem, 12vw, 5rem)",
                          fontWeight: 900,
                          lineHeight: 1.0,
                          letterSpacing: "-0.03em",
                          color:
                            li === 0 ? "#ffffff" : "rgba(255,255,255,0.4)",
                          transformOrigin: "-8em 50%",
                          transform: `rotate(${rot}deg)`,
                          transition: doTransition
                            ? `transform 1s cubic-bezier(0.34, 0, 0, 1) ${li * 0.09}s`
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
          </div>
        </div>

        {/* Mobile copy + CTA */}
        <div className="relative space-y-6">
          <p className="text-sm text-white/50 leading-[1.85]">
            Bespoke applications, Business Central &amp; outsourced HR —
            powering businesses across East Africa.
          </p>
          <div className="flex gap-3">
            <Link
              href="#services"
              className="bg-white text-black text-sm font-semibold px-6 py-3.5 hover:bg-gray-100 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="border border-white/25 text-white text-sm font-semibold px-6 py-3.5 hover:border-white/50 transition-all"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="block h-px transition-all duration-500"
                  style={{
                    width: i === activeIndex ? "1.5rem" : "0.5rem",
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
