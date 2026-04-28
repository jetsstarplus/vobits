"use client";

import { useRef, useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds before transition starts */
  delay?: number;
  /** Intersection threshold 0–1 */
  threshold?: number;
  /** Extra variant class: "reveal" | "reveal-x" | "reveal-scale" */
  variant?: "reveal" | "reveal-x" | "reveal-scale";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  variant = "reveal",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            el.style.transitionDelay = delay + "ms";
          }
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={variant + " " + className}>
      {children}
    </div>
  );
}
