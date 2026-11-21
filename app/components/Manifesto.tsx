"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "../lib/gsap";
import { Chapter, EASE, Reveal } from "./ui/Motion";

/** Words wrapped in {braces} are emphasised. */
const STATEMENT =
  "Most growing businesses don't have a technology problem. They have a {friction} problem — spreadsheets that never reconcile, payroll that swallows a week, systems that refuse to talk. We exist to remove that {friction.}";

const shifts = [
  {
    from: "Spreadsheets that never reconcile",
    to: "One source of truth in Business Central",
  },
  {
    from: "Payroll that swallows a week",
    to: "Compliant payroll, run for you every month",
  },
  {
    from: "Workflows no off‑the‑shelf tool fits",
    to: "Software shaped around how you actually work",
  },
];

export default function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".mf-word");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: text.current,
              start: "top 78%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={section}
      id="about"
      data-chapter
      className="relative px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Chapter n="01" label="The friction" className="mb-10" />

        <p
          ref={text}
          className="max-w-[22ch] text-[clamp(1.9rem,5.2vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:max-w-[24ch]"
        >
          {words.map((w, i) => {
            const emph = w.startsWith("{");
            const clean = w.replace(/[{}]/g, "");
            return (
              <span key={i}>
                <span
                  className={`mf-word inline-block ${
                    emph ? "font-serif font-normal italic text-accent" : ""
                  }`}
                >
                  {clean}
                </span>{" "}
              </span>
            );
          })}
        </p>

        {/* Friction → Flow */}
        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
              Who we are
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/60">
              Vobits Limited is a Nairobi‑based technology company. We pair deep
              engineering with real operational know‑how — so the software we
              deliver doesn&apos;t just work, it changes how your business runs.
              We don&apos;t just ship projects; we build long‑term partnerships.
            </p>
          </Reveal>

          <ul className="border-t border-line">
            {shifts.map((s, i) => (
              <motion.li
                key={s.from}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delayChildren: i * 0.08 }}
              >
                <span className="relative w-fit text-sm text-white/40 sm:text-base">
                  {s.from}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-px w-full origin-left bg-white/50"
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 }}
                  />
                </span>
                <motion.span
                  aria-hidden
                  className="hidden text-accent sm:block"
                  variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
                >
                  →
                </motion.span>
                <motion.span
                  className="text-base font-medium text-white sm:text-lg"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.6 + i * 0.1 }}
                >
                  <span className="mr-2 text-accent sm:hidden">→</span>
                  {s.to}
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
