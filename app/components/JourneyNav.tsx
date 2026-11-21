"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const chapters = [
  { id: "about", n: "01", label: "The friction" },
  { id: "sectors", n: "02", label: "Who we serve" },
  { id: "services", n: "03", label: "What we do" },
  { id: "process", n: "04", label: "How we work" },
  { id: "proof", n: "05", label: "The proof" },
  { id: "start", n: "06", label: "Next step" },
];

/** Fixed chapter indicator (large screens) — keeps the journey legible. */
export default function JourneyNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.nav
          aria-label="Page chapters"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
        >
          <ul className="flex flex-col gap-3">
            {chapters.map((c) => {
              const on = c.id === active;
              return (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    aria-current={on ? "step" : undefined}
                    className="group flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em]"
                  >
                    <motion.span
                      className="block h-px bg-current"
                      animate={{ width: on ? 28 : 10 }}
                      style={{ color: on ? "var(--accent)" : "rgba(255,255,255,0.3)" }}
                    />
                    <span className={on ? "text-white" : "text-white/30 group-hover:text-white/70"}>
                      {c.n}
                    </span>
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-white/60"
                        >
                          {c.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
