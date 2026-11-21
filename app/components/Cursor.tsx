"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "../lib/useMediaQuery";

/** Blend-mode cursor that grows over interactive elements. Fine pointers only. */
export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHovering(!!t?.closest("a, button, [role='button'], label, summary"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 h-10 w-10 rounded-full border border-white mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
      />
    </>
  );
}
