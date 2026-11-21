"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "./ui/Button";
import { Chapter, LineReveal, Reveal } from "./ui/Motion";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.4, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="start"
      data-chapter
      className="relative isolate overflow-hidden border-t border-line px-5 py-32 sm:px-8 md:py-48"
    >
      <motion.div
        aria-hidden
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute left-1/2 top-full -z-10 aspect-square w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,255,77,0.22),rgba(200,255,77,0.05)_55%,transparent)] md:w-[110vw]"
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <Chapter n="05" label="Your next step" className="mb-10" />
        <LineReveal
          className="text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white"
          lines={[
            "Let's remove",
            <span key="l" className="font-serif font-normal italic text-accent">
              the friction.
            </span>,
          ]}
        />
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-10">
          <p className="max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Tell us where things get stuck. We&apos;ll come back with a clear
            plan — whether that&apos;s a custom application, a Business Central
            rollout or taking payroll off your plate.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="mailto:hello@vobits.ke" variant="ghost">
              hello@vobits.ke
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
