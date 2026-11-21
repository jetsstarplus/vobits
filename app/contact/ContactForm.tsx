"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

const SERVICES = [
  "Bespoke application",
  "Business Central",
  "HR & Payroll",
  "NGO project management",
  "Accreditation platform",
  "Not sure yet",
];

const EMAIL = "hello@vobits.ke";

const field =
  "peer w-full rounded-2xl border border-white/10 bg-white/3 px-4 pb-3 pt-6 text-base text-white outline-none transition-colors placeholder-transparent focus:border-accent/70 focus:bg-white/5";
const floatLabel =
  "pointer-events-none absolute left-4 top-2 text-[0.7rem] uppercase tracking-[0.15em] text-muted transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-[0.15em]";

/**
 * Project brief form. There is no backend yet, so submitting composes a
 * pre-filled email in the visitor's mail app addressed to Vobits.
 */
export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Project enquiry${company ? ` — ${company}` : name ? ` — ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      selected.length ? `Interested in: ${selected.join(", ")}` : null,
      "",
      message,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur-xl sm:p-10"
    >
      <fieldset>
        <legend className="mb-4 text-sm font-medium text-white">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const on = selected.includes(s);
            return (
              <motion.button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s)}
                whileTap={{ scale: 0.95 }}
                className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
                  on
                    ? "border-accent bg-accent text-[#07080a]"
                    : "border-white/12 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {s}
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
          <label htmlFor="name" className={floatLabel}>Your name</label>
        </div>
        <div className="relative">
          <input id="company" name="company" autoComplete="organization" placeholder="Company" className={field} />
          <label htmlFor="company" className={floatLabel}>Company (optional)</label>
        </div>
        <div className="relative sm:col-span-2">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
          <label htmlFor="email" className={floatLabel}>Work email</label>
        </div>
        <div className="relative sm:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Message"
            className={`${field} resize-none`}
          />
          <label htmlFor="message" className={floatLabel}>Where do things get stuck?</label>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-white/40">
          Opens your email app with your brief pre‑filled.
        </p>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="min-h-12 rounded-full bg-accent px-7 text-sm font-semibold text-[#07080a] transition-colors hover:bg-white"
        >
          Send brief →
        </motion.button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white/80"
          >
            Your email app should now be open. If nothing happened, write to us
            directly at{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent underline">
              {EMAIL}
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
