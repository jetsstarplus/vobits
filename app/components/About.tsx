import Image from "next/image";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Enterprise Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "3", label: "Core Service Areas" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
              <span className="w-5 h-px bg-gray-600 inline-block" />
              About Vobits
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Turning technology
              <br />
              into measurable
              <br />
              <span className="text-gray-500">business outcomes.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5 lg:pt-16">
            <p className="text-[0.95rem] text-gray-400 leading-[1.9]">
              Vobits Limited is a technology company headquartered in Nairobi,
              Kenya. We specialize in crafting custom software solutions,
              implementing Microsoft Dynamics 365 Business Central, and
              delivering managed HR &amp; payroll services to organizations
              across East Africa.
            </p>
            <p className="text-[0.95rem] text-gray-400 leading-[1.9]">
              Our approach combines technical excellence with deep industry
              knowledge, ensuring every solution we deliver drives real,
              measurable results. We don&apos;t just build software — we build
              partnerships.
            </p>
          </div>
        </div>

        {/* Full-width atmospheric image */}
        <div className="relative mt-20 h-72 md:h-96 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
            alt="Modern open-plan office representing collaborative work environment"
            fill
            className="object-cover brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#080808]/80 via-transparent to-[#080808]/80" />
          <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-[#080808]/30" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-20 border border-white/5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-[#0c0c0c] p-8 ${
                i < stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              <p className="text-5xl font-black text-white mb-2 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
