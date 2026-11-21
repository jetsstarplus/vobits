"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chapter, EASE, LineReveal } from "./ui/Motion";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We sit with your teams, map how work really flows, and pinpoint where time and money leak.",
    output: "Process map & priorities",
  },
  {
    n: "02",
    title: "Design",
    body: "Architecture, user journeys and prototypes — and a shared, written definition of what success looks like.",
    output: "Blueprint & clickable prototype",
  },
  {
    n: "03",
    title: "Build & integrate",
    body: "Short, visible sprints. Apps engineered, Business Central configured, data migrated, systems connected.",
    output: "Working software, every sprint",
  },
  {
    n: "04",
    title: "Launch & run",
    body: "Training, go‑live support and ongoing care. We stay accountable long after the launch party.",
    output: "Adoption, support & continuous improvement",
  },
];

export default function Process() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" data-chapter className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Chapter n="03" label="How we work" className="mb-8" />
          <LineReveal
            className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white"
            lines={[
              "A clear path",
              "from idea to",
              <span key="l" className="font-serif font-normal italic text-accent">
                impact.
              </span>,
            ]}
          />
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
            No black boxes. Every engagement follows the same transparent rhythm,
            so you always know what&apos;s happening, what&apos;s next, and why.
          </p>
        </div>

        <ol ref={list} className="relative">
          {/* Track + animated progress line */}
          <span aria-hidden className="absolute left-4.75 top-2 bottom-2 w-px bg-white/10" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute left-4.75 top-2 bottom-2 w-px origin-top bg-accent"
          />

          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative pb-14 pl-16 last:pb-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.span
                className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border font-mono text-xs"
                variants={{
                  hidden: { borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", backgroundColor: "#07080a" },
                  show: { borderColor: "#c8ff4d", color: "#07080a", backgroundColor: "#c8ff4d" },
                }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {s.n}
              </motion.span>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: EASE, delay: i === 0 ? 0 : 0.05 }}
              >
                <h3 className="pt-1.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/55">
                  {s.body}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-xs text-white/70">
                  <span className="text-accent">↳</span> {s.output}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
