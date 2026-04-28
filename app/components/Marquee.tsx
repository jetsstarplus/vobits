const items = [
  "Bespoke Development",
  "Business Central",
  "HR & Payroll",
  "Digital Transformation",
  "Enterprise Software",
  "Cloud Solutions",
  "API Development",
  "Mobile Applications",
  "ERP Implementation",
  "Payroll Automation",
];

// Double the array so the animation loops seamlessly
const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="border-y border-white/5 overflow-hidden py-5 bg-[#0b0b0b]">
      <div className="flex whitespace-nowrap">
        <div className="marquee-track flex shrink-0 items-center">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-[0.2em] px-7">
                {item}
              </span>
              <span className="text-gray-700 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
