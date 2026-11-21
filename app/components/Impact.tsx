"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Chapter, LineReveal, Reveal } from "./ui/Motion";

const stats = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Enterprise clients" },
  { value: 5, suffix: "+", label: "Years in operation" },
  { value: 3, suffix: "", label: "Core service areas" },
];

const products = [
  {
    name: "NGO Project Management",
    kicker: "Product",
    body: "Built for NGOs and development programmes: plan projects, track spending against every grant and report to donors with confidence.",
    features: [
      "Projects, activities & work plans",
      "Grant budgets vs. actuals in real time",
      "Indicators & results tracking (M&E)",
      "Donor‑ready reports",
    ],
    cta: { label: "Request a demo", href: "/contact" },
    accent: "#ffb547",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=80&auto=format&fit=crop",
    alt: "Team members joining hands — collaborative project work",
  },
  {
    name: "miliki.ke",
    kicker: "Live product",
    body: "A flagship platform conceived, designed, built and owned by Vobits — proof that we can take an idea from zero to a live product serving real users.",
    features: ["Product strategy & design", "Full‑stack engineering", "Launched & operated in‑house"],
    cta: { label: "Visit miliki.ke", href: "https://miliki.ke" },
    accent: "#4fe3c1",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    alt: "Mobile phone showing a digital application",
  },
  {
    name: "Accreditation & Licensing",
    kicker: "Platform",
    body: "A purpose‑built system for regulators, professional bodies and agencies to manage the full lifecycle of licences and certifications.",
    features: [
      "Online applications & documents",
      "Automated verification workflows",
      "Digital certificates & public registry",
      "Renewal reminders & expiry tracking",
    ],
    cta: { label: "Enquire about this product", href: "/contact" },
    accent: "#7aa2ff",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop",
    alt: "Official documents and stamps — accreditation and licensing",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function Impact() {
  return (
    <section id="proof" data-chapter className="relative border-t border-line px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Chapter n="05" label="The proof" className="mb-8" />
        <LineReveal
          className="max-w-4xl text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white"
          lines={[
            "Results you can",
            <span key="l" className="font-serif font-normal italic text-accent">
              measure.
            </span>,
          ]}
        />

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={20} className="flex flex-col bg-background p-6 sm:p-10">
              <dt className="order-2 mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                {s.label}
              </dt>
              <dd className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] text-white">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Credential */}
        <Reveal className="mt-6">
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                  <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8.5 12l2.5 2.5L15.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Microsoft Partner</p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/55">
                  We implement, extend and support Microsoft Dynamics 365 Business Central — with the
                  backing of Microsoft&apos;s partner network and tooling.
                </p>
              </div>
            </div>
            <Link
              href="/#services"
              className="w-fit shrink-0 border-b border-white/20 pb-1 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Our Business Central services →
            </Link>
          </div>
        </Reveal>

        {/* Products */}
        <div id="products" className="mt-28 scroll-mt-28">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Our products, <span className="text-white/40">solving real problems.</span>
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <article
                  className="spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface"
                  style={{ ["--spot" as string]: p.accent }}
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                >
                  <div className="relative h-56 overflow-hidden sm:h-72">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover brightness-50 saturate-[0.8] transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-30 mix-blend-color" style={{ background: p.accent }} />
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
                    <span
                      className="absolute left-6 top-6 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] backdrop-blur-md"
                      style={{ color: p.accent, borderColor: `${p.accent}55` }}
                    >
                      {p.kicker}
                    </span>
                  </div>

                  <div className="relative z-2 flex flex-1 flex-col p-7 sm:p-10">
                    <h4 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {p.name}
                    </h4>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">{p.body}</p>
                    <ul className="mt-6 space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                          <span className="h-1 w-1 rounded-full" style={{ background: p.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.cta.href}
                      {...(p.cta.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-8 inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold text-white transition-colors hover:border-white lg:mt-auto lg:pt-8"
                    >
                      {p.cta.label}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
