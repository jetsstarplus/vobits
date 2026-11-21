"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "./ui/Button";
import { EASE, LineReveal } from "./ui/Motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Ambient glow (also the fallback if WebGL is unavailable) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_70%_45%,rgba(200,255,77,0.10),transparent_70%),radial-gradient(40%_40%_at_15%_90%,rgba(80,120,255,0.08),transparent_70%)]"
      />
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      {/* Legibility veil for small screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-background via-background/70 to-transparent lg:hidden"
      />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:justify-center lg:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Software · ERP · HR &amp; Payroll
          <span className="hidden sm:inline">— Nairobi</span>
        </motion.p>

        <LineReveal
          as="h1"
          animateOnMount
          delay={0.3}
          className="max-w-[14ch] text-[clamp(2.9rem,9.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
          lines={[
            "Software that",
            "moves your",
            <span key="l3" className="font-serif font-normal italic tracking-[-0.02em] text-accent">
              business forward.
            </span>,
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-8 flex max-w-xl flex-col gap-8"
        >
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            Bespoke applications, Microsoft Dynamics 365 Business Central and
            managed HR &amp; payroll — engineered in Nairobi for organisations
            across East Africa.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="#about" variant="ghost">
              See the journey
            </ButtonLink>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mx-auto hidden w-full max-w-7xl items-end justify-between px-8 pb-8 lg:flex"
      >
        <a href="#about" className="group flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-white/40 hover:text-white">
          <span className="relative h-12 w-px overflow-hidden bg-white/10">
            <span className="scroll-cue absolute inset-0 bg-accent" />
          </span>
          Scroll to begin
        </a>
        <p className="max-w-56 text-right text-xs leading-relaxed text-white/35">
          From scattered bits to one connected system.
        </p>
      </motion.div>
    </section>
  );
}
