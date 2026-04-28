import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Vobits delivered our Business Central implementation on time and on budget. Their team understood our processes deeply and the system has transformed how we operate across all our departments.",
    name: "James Mwangi",
    title: "CFO, East Africa Manufacturing Co.",
    initial: "J",
  },
  {
    quote:
      "Their bespoke application has automated what used to take our team days of manual work. The Vobits team were responsive, thorough, and genuinely invested in our success.",
    name: "Amina Hassan",
    title: "Operations Director, Logistics Group East Africa",
    initial: "A",
  },
  {
    quote:
      "Outsourcing our payroll and HR to Vobits was the best decision we made this year. Accurate, compliant, and stress-free — exactly what we needed as we scaled.",
    name: "David Ochieng",
    title: "Managing Director, Retail Holdings Ltd.",
    initial: "D",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-20">
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
            <span className="w-5 h-px bg-gray-600 inline-block" />
            Partner Feedback
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            What our clients
            <br />
            <span className="text-gray-500">say about us.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} className="bg-[#080808]" delay={i * 120}>
              <div className="p-8 h-full flex flex-col gap-8 hover:bg-[#0d0d0d] transition-colors">
                {/* Quote mark */}
                <svg
                  className="w-8 h-5 text-white/20"
                  fill="currentColor"
                  viewBox="0 0 32 20"
                  aria-hidden="true"
                >
                  <path d="M0 20V12.667C0 5.615 3.81 1.41 11.429 0l1.523 2.333C9.371 3.077 7.619 5.41 7.619 8.667H13V20H0zm19 0V12.667C19 5.615 22.81 1.41 30.429 0l1.523 2.333C28.37 3.077 26.619 5.41 26.619 8.667H32V20H19z" />
                </svg>

                <blockquote className="flex-1 text-[0.95rem] text-gray-300 leading-[1.85]">
                  {t.quote}
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.title}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
