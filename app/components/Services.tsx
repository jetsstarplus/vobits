import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Bespoke Application Development",
    description:
      "We design and build custom software tailored precisely to your business needs. From web and mobile applications to complex enterprise systems and APIs � if you can imagine it, we can build it.",
    tags: ["Web Applications", "Mobile Apps", "API Development", "Enterprise Systems"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Colorful code on a screen",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Microsoft Dynamics 365 Business Central",
    description:
      "As an authorized Business Central partner, we deliver end-to-end ERP implementations, customizations, integrations, and ongoing support to streamline your entire business operation.",
    tags: ["ERP Implementation", "Customizations", "Integrations", "Training & Support"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Laptop showing business analytics charts",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Outsourced HR & Payroll",
    description:
      "Let us handle your HR operations while you focus on what matters most. Our managed services cover payroll processing, leave management, employee records, and statutory compliance.",
    tags: ["Payroll Processing", "Leave Management", "HR Administration", "Statutory Compliance"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop",
    imageAlt: "Diverse team collaborating in a modern office",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
            <span className="w-5 h-px bg-gray-600 inline-block" />
            What We Do
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Services built
            <br />
            <span className="text-gray-500">for your business.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {services.map((service) => (
            <div
              key={service.number}
              className="bg-[#080808] flex flex-col hover:bg-[#0d0d0d] transition-colors group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                <span className="absolute top-4 right-4 text-xs text-gray-600 font-mono">
                  {service.number}
                </span>
              </div>

              <div className="p-10 flex flex-col gap-7 flex-1">
                <span className="text-gray-600 p-2.5 border border-white/8 inline-flex w-fit">
                  {service.icon}
                </span>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-[1.85]">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-white/8 text-gray-500 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
