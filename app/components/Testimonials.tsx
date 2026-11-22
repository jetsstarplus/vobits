import { Reveal } from "./ui/Motion";

type Story = {
  org: string;
  person?: string;
  sector: string;
  delivered: string[];
};

const featured: Story = {
  org: "Engineers Board of Kenya",
  sector: "Regulator",
  delivered: ["Licensing & Accreditation Portal", "Finance Portal", "Events Portal"],
};

const stories: Story[] = [
  {
    org: "Kemsal Limited",
    person: "QS. Olivia Mwembe, CEO",
    sector: "Private sector",
    delivered: ["Electronic Document Management (EDMS)", "ERP"],
  },
  {
    org: "Thatch Consultants",
    person: "Eng. Jacton Mwembe, CEO",
    sector: "Private sector",
    delivered: ["Internal Payroll", "Finance ERP"],
  },
  {
    org: "Mosongo & Mosongo Advocates",
    person: "Adv. Maosa Mosongo, CEO",
    sector: "Legal",
    delivered: ["Internal Finance System"],
  },
];

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((d) => (
        <li key={d} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
          {d}
        </li>
      ))}
    </ul>
  );
}

export default function Testimonials() {
  return (
    <section id="stories" className="relative px-5 pb-28 sm:px-8 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12">
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Success stories, <span className="text-white/40">from regulators to law firms.</span>
          </h3>
        </Reveal>

        {/* Featured */}
        <Reveal>
          <article className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  Featured · {featured.sector}
                </p>
                <h4 className="mt-4 text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
                  {featured.org}
                </h4>
                <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/55">
                  Digital services for Kenya&apos;s engineering regulator — from licensing
                  and accreditation to finance and events, delivered as connected portals.
                </p>
              </div>
              <Tags items={featured.delivered} />
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.org} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 sm:p-9">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">{s.sector}</p>
                <h4 className="mt-4 text-2xl font-semibold tracking-tight text-white">{s.org}</h4>
                {s.person && <p className="mt-1 text-sm text-white/55">{s.person}</p>}
                <div className="mt-8 border-t border-line pt-6 md:mt-auto">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/40">Delivered</p>
                  <Tags items={s.delivered} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
