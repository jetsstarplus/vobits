import { Reveal } from "./ui/Motion";

const testimonials = [
  {
    quote:
      "Vobits delivered our Business Central implementation on time and on budget. Their team understood our processes deeply and the system has transformed how we operate across all our departments.",
    name: "James Mwangi",
    title: "CFO, East Africa Manufacturing Co.",
  },
  {
    quote:
      "Their bespoke application has automated what used to take our team days of manual work. The Vobits team were responsive, thorough, and genuinely invested in our success.",
    name: "Amina Hassan",
    title: "Operations Director, Logistics Group East Africa",
  },
  {
    quote:
      "Outsourcing our payroll and HR to Vobits was the best decision we made this year. Accurate, compliant, and stress-free — exactly what we needed as we scaled.",
    name: "David Ochieng",
    title: "Managing Director, Retail Holdings Ltd.",
  },
];

function Card({ t, hidden }: { t: (typeof testimonials)[number]; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="mx-3 flex w-[82vw] shrink-0 flex-col justify-between rounded-3xl border border-line bg-surface p-7 sm:w-105 sm:p-9"
    >
      <blockquote className="text-[1.05rem] leading-relaxed text-white/80">
        <span className="font-serif text-4xl leading-none text-accent">&ldquo;</span>
        {t.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
          {t.name[0]}
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">{t.name}</span>
          <span className="block text-xs text-muted">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Repeat so the track is always wider than the viewport, then double for a seamless loop
  const row = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative pb-28 md:pb-40">
      <div className="mb-12 px-5 sm:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            In our partners&apos; words.
          </h3>
        </Reveal>
      </div>

      <div className="marquee marquee-mask overflow-hidden" style={{ ["--marquee-duration" as string]: "60s" }}>
        <div className="marquee-track flex w-max">
          {row.map((t, i) => (
            <Card key={`a${i}`} t={t} hidden={i >= testimonials.length} />
          ))}
          {row.map((t, i) => (
            <Card key={`b${i}`} t={t} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
