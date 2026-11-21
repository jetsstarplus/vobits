"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Chapter, EASE, LineReveal } from "./ui/Motion";

type Sector = {
  id: string;
  name: string;
  short: string;
  pitch: string;
  needs: string[];
  fit: string[];
};

const sectors: Sector[] = [
  {
    id: "ngos",
    name: "NGOs & Development Partners",
    short: "NGOs",
    pitch:
      "Multiple donors, multiple grants, one small finance team. We give programmes the visibility donors expect — without the spreadsheet marathon at reporting time.",
    needs: [
      "Track every project, activity and budget line against its grant",
      "Donor‑ready financial and results reporting",
      "Payroll and staff costs allocated across projects",
    ],
    fit: ["NGO Project Management", "Business Central", "HR & Payroll"],
  },
  {
    id: "professional-bodies",
    name: "Professional Bodies & Associations",
    short: "Professional bodies",
    pitch:
      "Members expect to apply, pay and renew online. We digitise the full member lifecycle so your secretariat spends time on the profession, not on paperwork.",
    needs: [
      "Online registration, vetting and member records",
      "Licences, certificates, CPD and renewals",
      "Subscriptions and payments reconciled automatically",
    ],
    fit: ["Accreditation & Licensing", "Bespoke Development", "Business Central"],
  },
  {
    id: "government",
    name: "Government Institutions & Regulators",
    short: "Government",
    pitch:
      "Public services must be accountable, auditable and accessible. We build systems that stand up to audit and make it simpler for citizens and businesses to comply.",
    needs: [
      "Licensing, permits and public registries",
      "Approval workflows with full audit trails",
      "Finance, procurement and HR on one ERP",
    ],
    fit: ["Accreditation & Licensing", "Business Central", "Bespoke Development"],
  },
  {
    id: "private",
    name: "Private Businesses",
    short: "Private sector",
    pitch:
      "From growing SMEs to established groups — we connect finance, operations and people so leadership can see the whole business and move faster.",
    needs: [
      "ERP for finance, inventory, sales and purchasing",
      "Integrations with banks, mobile money, tax systems and your existing tools",
      "Outsourced, compliant payroll every month",
    ],
    fit: ["Business Central", "HR & Payroll", "Bespoke Development"],
  },
  {
    id: "unique",
    name: "Unique Processes",
    short: "Something unique",
    pitch:
      "Some workflows don't fit any off‑the‑shelf box. That's where we do our best work — understanding the process first, then engineering software around it.",
    needs: [
      "Discovery workshops to map how the work really flows",
      "Custom web & mobile apps, portals and APIs",
      "Extensions that make Business Central fit you exactly",
    ],
    fit: ["Bespoke Development", "Business Central Extensions"],
  },
];

function Detail({ s }: { s: Sector }) {
  return (
    <div>
      <p className="text-lg leading-relaxed text-white/75">{s.pitch}</p>
      <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
        What we deliver
      </p>
      <ul className="mt-4 space-y-3">
        {s.needs.map((n) => (
          <li key={n} className="flex gap-3 text-[0.95rem] text-white/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {n}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-2">
        {s.fit.map((f) => (
          <span
            key={f}
            className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Sectors() {
  const [active, setActive] = useState(0);
  const current = sectors[active];

  return (
    <section id="sectors" data-chapter className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Chapter n="02" label="Who we serve" className="mb-8" />
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <LineReveal
            className="text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white"
            lines={[
              "Built for organisations",
              <span key="l" className="font-serif font-normal italic text-accent">
                with real complexity.
              </span>,
            ]}
          />
          <p className="max-w-sm text-base leading-relaxed text-white/55">
            Different sectors, different rules. We bring the domain knowledge so
            you don&apos;t have to teach it.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Sector list (accordion on mobile, selector on desktop) */}
          <ul className="border-t border-line">
            {sectors.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && window.innerWidth >= 1024 && setActive(i)}
                    aria-expanded={on}
                    className="group relative flex w-full items-center gap-5 py-5 text-left sm:py-6"
                  >
                    <span className={`font-mono text-xs transition-colors ${on ? "text-accent" : "text-white/30"}`}>
                      0{i + 1}
                    </span>
                    <span
                      className={`flex-1 text-xl font-semibold tracking-tight transition-colors sm:text-2xl lg:text-[1.7rem] ${
                        on ? "text-white" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        on
                          ? "rotate-0 border-accent bg-accent text-[#07080a]"
                          : "-rotate-45 border-white/15 text-white/50"
                      }`}
                    >
                      →
                    </span>
                    {on && (
                      <motion.span
                        layoutId="sector-bar"
                        className="absolute -bottom-px left-0 hidden h-px w-full bg-accent lg:block"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </button>

                  {/* Mobile inline panel */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`sector-${s.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="pb-8 pl-9">
                          <Detail s={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop detail panel */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32 overflow-hidden rounded-3xl border border-line bg-surface p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative"
                >
                  <p className="mb-6 font-serif text-4xl italic text-accent">{current.short}</p>
                  <Detail s={current} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
