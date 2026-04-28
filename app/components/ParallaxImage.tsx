"use client";

import { useRef, useEffect, ComponentProps } from "react";
import Image from "next/image";

type Props = Omit<ComponentProps<typeof Image>, "fill"> & {
  /** Parallax intensity in pixels — how far the image travels total */
  speed?: number;
};

export default function ParallaxImage({
  speed = 60,
  className,
  ...rest
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let raf: number;

    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const offset =
        ((r.top + r.height / 2 - window.innerHeight / 2) /
          window.innerHeight) *
        speed;
      inner.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    // Outer: fills parent container, clips the overflowing parallax image
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {/* Inner: oversized so there's room to translate without revealing edges */}
      <div ref={innerRef} style={{ position: "absolute", inset: "-18%" }}>
        <Image
          fill
          className={"object-cover " + (className ?? "")}
          {...rest}
        />
      </div>
    </div>
  );
}
