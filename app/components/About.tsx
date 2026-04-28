"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";

const stats = [
  { num: 50, suffix: "+", label: "Projects Delivered" },
  { num: 10, suffix: "+", label: "Enterprise Clients" },
  { num: 5,  suffix: "+", label: "Years Experience" },
  { num: 3,  suffix: "",  label: "Core Service Areas" },
];

function AnimatedStat({
  num,
  suffix,
  label,
  delay = 0,
}: {
  num: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          el.classList.add("is-visible");
          setTimeout(() => {
            const duration = 1800;
            const start = Date.now();
            const tick = () => {
              const p = Math.min((Date.now() - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setCount(Math.round(eased * num));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, delay]);

  return (
    <div ref={ref} className="reveal-scale bg-[#0c0c0c] p-8">
      <p className="text-5xl font-black text-white mb-2 tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <ScrollReveal>
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
              <span className="w-5 h-px bg-gray-600 inline-block" />
              About Vobits
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Turning technology
              <br />
              into measurable
              <br />
              <span className="text-gray-500">business outcomes.</span>
            </h2>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={140} className="flex flex-col gap-5 lg:pt-16">
            <p className="text-[0.95rem] text-gray-400 leading-[1.9]">
              Vobits Limited is a technology company headquartered in Nairobi,
              Kenya. We specialize in crafting custom software solutions,
              implementing Microsoft Dynamics 365 Business Central, and
              delivering managed HR &amp; payroll services to organizations
              across East Africa.
            </p>
            <p className="text-[0.95rem] text-gray-400 leading-[1.9]">
              Our approach combines technical excellence with deep industry
              knowledge, ensuring every solution we deliver drives real,
              measurable results. We don&apos;t just build software — we build
              partnerships.
            </p>
          </ScrollReveal>
        </div>

        {/* Full-width atmospheric image */}
        <ScrollReveal delay={80} className="mt-20">
          <div className="relative h-72 md:h-96">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
              alt="Modern open-plan office representing collaborative work environment"
              className="brightness-50"
              sizes="100vw"
              speed={50}
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#080808]/80 via-transparent to-[#080808]/80" />
            <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-[#080808]/30" />
          </div>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-20 border border-white/5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={i < stats.length - 1 ? "border-r border-white/5" : ""}
            >
              <AnimatedStat
                num={stat.num}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 120}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
