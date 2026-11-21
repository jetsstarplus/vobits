"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { Chapter } from "./ui/Motion";

const services = [
  {
    n: "01",
    verb: "Build",
    title: "Bespoke Application Development",
    body: "Web platforms, mobile apps, APIs and enterprise systems designed around your exact processes — not the other way round. If you can describe it, we can engineer it.",
    tags: ["Web Applications", "Mobile Apps", "APIs & Integrations", "Enterprise Systems"],
    outcome: "Hours of manual work, automated.",
    accent: "#7aa2ff",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
    alt: "Code on a screen — bespoke software development",
  },
  {
    n: "02",
    verb: "Implement",
    title: "Microsoft Dynamics 365 Business Central",
    body: "As a Microsoft partner, we deliver end‑to‑end ERP implementation, customisation, integration and support. Finance, inventory, procurement and operations — finally in one place, with numbers you can trust.",
    tags: ["ERP Implementation", "AL Extensions", "Integrations", "Training & Support"],
    outcome: "One source of truth for the whole business.",
    accent: "#b58cff",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
    alt: "Laptop showing business analytics dashboards",
  },
  {
    n: "03",
    verb: "Automate",
    title: "Outsourced HR & Payroll",
    body: "We run payroll, leave, employee records and statutory compliance for you — accurately, on time, every month — so your team can focus on the work that grows the business.",
    tags: ["Payroll Processing", "Leave Management", "HR Administration", "Statutory Compliance"],
    outcome: "Payroll day becomes a non‑event.",
    accent: "#4fe3c1",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&auto=format&fit=crop",
    alt: "Team collaborating in a modern office",
  },
];

export default function Services() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin + horizontal scroll through the chapters
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });

        gsap.utils.toArray<HTMLElement>(".svc-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>(".svc-verb").forEach((v) => {
          gsap.fromTo(
            v,
            { xPercent: 20, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: v,
                containerAnimation: tween,
                start: "left 95%",
                end: "left 55%",
                scrub: true,
              },
            }
          );
        });
      });

      // Mobile / tablet: cards scale back slightly as the next one stacks over
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      id="services"
      data-chapter
      className="relative overflow-x-clip border-t border-line bg-surface lg:motion-safe:h-dvh lg:motion-safe:overflow-hidden"
    >
      {/* progress rail (desktop) */}
      <div className="absolute inset-x-8 bottom-8 z-10 hidden h-px bg-white/10 lg:motion-safe:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
      </div>

      <div
        ref={track}
        className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-24 sm:px-8 lg:motion-safe:mx-0 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-10 lg:motion-safe:py-0 lg:motion-safe:pl-[max(2rem,calc((100vw-80rem)/2))] lg:motion-safe:pr-[12vw]"
      >
        {/* Intro panel */}
        <div className="mb-6 flex shrink-0 flex-col justify-center lg:motion-safe:mb-0 lg:motion-safe:w-[34vw] lg:max-w-xl">
          <Chapter n="03" label="What we do" className="mb-8" />
          <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
            Three ways
            <br />
            to remove
            <br />
            <span className="font-serif font-normal italic text-accent">friction.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
            Each one stands alone. Together, they give you a business that runs
            on connected, dependable systems.
          </p>
          <p className="mt-10 hidden items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/35 lg:motion-safe:flex">
            Keep scrolling <span className="text-accent">→</span>
          </p>
        </div>

        {services.map((s, i) => (
          <article
            key={s.n}
            className="svc-card sticky shrink-0 lg:static lg:motion-safe:w-[min(72vw,68rem)]"
            style={{ top: `${5 + i * 0.9}rem` }}
          >
            <div
              className="spotlight relative grid overflow-hidden rounded-3xl border border-line bg-surface-2 lg:h-[min(78vh,44rem)] lg:grid-cols-[1.05fr_1fr]"
              style={{ ["--spot" as string]: s.accent }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              {/* Copy */}
              <div className="relative z-2 flex flex-col p-7 sm:p-10 lg:p-14">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40">{s.n} / 03</span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: s.accent, boxShadow: `0 0 18px ${s.accent}` }}
                  />
                </div>

                <p
                  className="svc-verb mt-8 font-serif text-[clamp(3rem,7vw,6.5rem)] italic leading-none tracking-[-0.02em]"
                  style={{ color: s.accent }}
                >
                  {s.verb}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                  {s.body}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t border-line pt-5 text-sm text-white lg:mt-auto">
                  <span className="mr-2" style={{ color: s.accent }}>
                    ✦
                  </span>
                  {s.outcome}
                </p>
              </div>

              {/* Visual */}
              <div className="relative h-56 overflow-hidden sm:h-72 lg:h-auto">
                <div className="svc-img absolute -inset-x-[12%] inset-y-0">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover brightness-[0.6] saturate-[0.85]"
                  />
                </div>
                <div
                  className="absolute inset-0 mix-blend-color opacity-40"
                  style={{ background: s.accent }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-2 via-transparent to-transparent lg:bg-linear-to-r" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
