"use client";

import { useEffect } from "react";

// Background color per section. bg = body, nav = navbar (with alpha baked into hex).
const SECTIONS = [
  { id: "hero",     bg: "#080808", nav: "#080808f0" },
  { id: "about",    bg: "#05091a", nav: "#05091af0" },
  { id: "services", bg: "#080808", nav: "#080808f0" },
  { id: "products", bg: "#070f08", nav: "#070f08f0" },
  { id: "contact",  bg: "#080808", nav: "#080808f0" },
];

export default function SectionColorManager() {
  useEffect(() => {
    const apply = (bg: string, nav: string) => {
      document.body.style.backgroundColor = bg;
      document.documentElement.style.setProperty("--section-bg", bg);
      document.documentElement.style.setProperty("--section-nav", nav);
    };

    let current = "";

    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = SECTIONS[0];
      let bestDist = Infinity;

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      }

      if (best.id !== current) {
        current = best.id;
        apply(best.bg, best.nav);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
