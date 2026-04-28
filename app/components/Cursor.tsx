"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on pointer-fine (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display = "block";
    ring.style.display = "block";
    document.body.style.cursor = "none";

    let mx = -200,
      my = -200,
      rx = -200,
      ry = -200;
    let targetSize = 28;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => {
      targetSize = 52;
      ring.style.borderColor = "rgba(255,255,255,0.45)";
      dot.style.transform =
        "translate(" + (mx - 3) + "px," + (my - 3) + "px) scale(0.5)";
    };
    const onLeave = () => {
      targetSize = 28;
      ring.style.borderColor = "rgba(255,255,255,0.2)";
      dot.style.transform =
        "translate(" + (mx - 3) + "px," + (my - 3) + "px) scale(1)";
    };

    const attach = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    // Re-attach when DOM changes (Next.js navigation)
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Dot — instant
      dot.style.transform =
        "translate(" + (mx - 3) + "px," + (my - 3) + "px)";

      // Ring — lerp
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      const half = targetSize / 2;
      ring.style.width = targetSize + "px";
      ring.style.height = targetSize + "px";
      ring.style.transform =
        "translate(" + (rx - half) + "px," + (ry - half) + "px)";

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        style={{ display: "none" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-9999 transition-transform duration-150"
      />
      {/* Ring — lerps behind cursor */}
      <div
        ref={ringRef}
        style={{ display: "none" }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9998 transition-[width,height,border-color] duration-300"
      />
    </>
  );
}
