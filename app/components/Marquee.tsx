const items = [
  "Microsoft Partner",
  "Bespoke Development",
  "Business Central",
  "NGO Project Management",
  "HR & Payroll",
  "API Integrations",
  "Mobile Apps",
  "ERP Customisation",
  "Payroll Automation",
  "Digital Products",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-white/85 sm:px-10">
            {item}
          </span>
          <span className="font-serif text-2xl italic text-accent">✦</span>
        </li>
      ))}
    </ul>
  );
}

/** Capability band — a visual breath between chapters. */
export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className="marquee overflow-hidden border-y border-line py-6 sm:py-8"
      style={{ ["--marquee-direction" as string]: reverse ? "reverse" : "normal" }}
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
