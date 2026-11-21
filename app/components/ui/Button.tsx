"use client";

import Link from "next/link";
import { ReactNode, useRef, type PointerEvent } from "react";
import { motion, useSpring } from "motion/react";

/** Pulls its child toward the pointer (mouse only). */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-[#07080a] hover:bg-white",
  ghost:
    "border border-white/15 text-white hover:border-white/40 hover:bg-white/5",
};

/** Pill button with a sliding arrow. Renders <a> for external/mailto links. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  magnetic = true,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `group relative inline-flex min-h-12 items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`relative grid h-8 w-8 place-items-center overflow-hidden rounded-full ${
          variant === "primary" ? "bg-[#07080a] text-accent" : "bg-white text-[#07080a]"
        }`}
      >
        <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-6">
          <Arrow />
        </span>
        <span className="absolute -translate-x-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
          <Arrow />
        </span>
      </span>
    </>
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const el = isExternal ? (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
