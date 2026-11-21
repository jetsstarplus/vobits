"use client";

import { ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Global motion settings — honours the OS "reduce motion" preference. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const lineParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const lineChild: Variants = {
  hidden: { y: "110%", rotate: 3 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
};

/** Masked line-by-line heading reveal. Pass one node per visual line. */
export function LineReveal({
  lines,
  className,
  as = "h2",
  animateOnMount = false,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
  delay?: number;
}) {
  const Tag = motion[as];
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag
      className={className}
      variants={{
        ...lineParent,
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      initial="hidden"
      {...trigger}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block origin-top-left will-change-transform"
            variants={lineChild}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Thin accent bar at the top of the viewport showing page progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-70 h-0.5 origin-left bg-accent"
    />
  );
}

/** Chapter eyebrow used to mark each step of the journey. */
export function Chapter({
  n,
  label,
  className = "",
}: {
  n: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.p
      className={`flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted ${className}`}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span className="text-accent">{n}</span>
      <span className="h-px w-8 bg-white/20" />
      {label}
    </motion.p>
  );
}
