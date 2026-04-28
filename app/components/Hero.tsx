"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const phrases = [
  { action: "Build", subject: "Applications" },
  { action: "Implement", subject: "Business Central" },
  { action: "Automate", subject: "HR & Payroll" },
  { action: "Launch", subject: "Digital Products" },
  { action: "Scale", subject: "Your Business" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_55%,rgba(59,130,246,0.07),transparent_60%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-10">
            <span className="inline-block w-5 h-px bg-gray-600" />
            Nairobi, Kenya
          </p>

          <h1 className="text-6xl md:text-[5.5rem] font-black text-white leading-[0.92] tracking-tight mb-8">
            Building
            <br />
            digital
            <br />
            solutions
            <br />
            <span className="text-gray-500">that perform.</span>
          </h1>

          <p className="text-[0.95rem] text-gray-400 max-w-lg mb-12 leading-[1.85]">
            From bespoke applications to Microsoft Dynamics 365 Business
            Central implementations and outsourced HR &amp; payroll — we build
            and manage the technology that powers businesses across East Africa.
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
              className="group border border-white/15 text-white text-sm font-semibold px-8 py-4 hover:border-white/40 transition-all flex items-center gap-2"
            >
              {"Let's Talk"}
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right — atmospheric image with phrase overlay */}
        <div className="hidden lg:block relative h-150 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop"
            alt="Modern city buildings representing Vobits digital ambition"
            fill
            className="object-cover brightness-75"
            sizes="(max-width: 1280px) 50vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/10 to-[#080808]/70" />

          <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
            {phrases.map((phrase, i) => (
              <div
                key={i}
                className={`flex items-baseline justify-between border-t border-white/10 py-4 transition-all duration-500 ${
                  i === activeIndex ? "opacity-100" : "opacity-[0.15]"
                }`}
              >
                <span className="text-[1.6rem] font-black tracking-tight text-white">
                  {phrase.action}
                </span>
                <span className="text-[1.6rem] font-black tracking-tight text-gray-400">
                  {phrase.subject}
                </span>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
        <svg
          className="w-4 h-4 text-gray-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
