"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ButtonLink } from "./ui/Button";
import { EASE } from "./ui/Motion";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  // Lock scroll + close on Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-60 px-3 pt-3 sm:px-5"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open
              ? "border border-white/10 bg-[#0b0c0f]/70 backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Link href="/" onClick={close} className="relative z-10 transition-opacity hover:opacity-75">
            <Image
              src="/Vobits_logo.png"
              alt="Vobits — home"
              width={120}
              height={36}
              className="h-7 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = l.href === pathname;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                      active ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/8"
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <ButtonLink href="/contact" magnetic={false} className="min-h-10! py-1! text-[0.8rem]">
              Let&apos;s talk
            </ButtonLink>
          </div>

          {/* Burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-white/5 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-full bg-white"
                animate={open ? { rotate: 45, y: 5.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-[1.5px] w-full bg-white"
                animate={open ? { rotate: -45, y: -5.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            className="fixed inset-0 z-50 flex flex-col bg-background px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
              <ul>
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={l.href}
                        onClick={close}
                        className="flex items-baseline justify-between py-4 text-[2.4rem] font-semibold tracking-[-0.03em] text-white"
                      >
                        {l.label}
                        <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-end justify-between gap-4"
            >
              <div className="text-sm text-white/50">
                <p>Nairobi, Kenya</p>
                <a href="mailto:hello@vobits.ke" className="text-white/80">
                  hello@vobits.ke
                </a>
              </div>
              <ButtonLink href="/contact" onClick={close} magnetic={false}>
                Let&apos;s talk
              </ButtonLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
