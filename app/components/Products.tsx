import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";

export default function Products() {
  return (
    <section id="products" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-6">
            <span className="w-5 h-px bg-gray-600 inline-block" />
            Our Products
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-20">
            Homegrown products
            <br />
            <span className="text-gray-500">solving real problems.</span>
          </h2>
        </ScrollReveal>

        {/* miliki.ke */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
          {/* Content */}
          <ScrollReveal className="bg-[#0c0c0c]" delay={80}>
          <div className="p-14 flex flex-col justify-between min-h-96">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-xs border border-emerald-500/25 text-emerald-400 px-3 py-1 uppercase tracking-wider font-mono">
                  Live Product
                </span>
                <span className="text-xs border border-white/10 text-gray-500 px-3 py-1 uppercase tracking-wider font-mono">
                  Success Story
                </span>
              </div>

              <h3 className="text-5xl font-black text-white tracking-tight mb-5">
                miliki.ke
              </h3>

              <p className="text-[0.95rem] text-gray-400 leading-[1.9] max-w-md mb-10">
                A flagship digital product conceptualized, built, and owned by
                Vobits Limited. miliki.ke is a testament to our ability to take
                an idea from zero — through product design, development, and
                launch — to a live platform serving real users.
              </p>
            </div>

            <a
              href="https://miliki.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-white text-sm font-semibold w-fit border-b border-white/20 pb-1.5 hover:border-white transition-colors"
            >
              Visit miliki.ke
              <span className="group-hover:translate-x-1.5 transition-transform inline-block">
                →
              </span>
            </a>
          </div>
          </ScrollReveal>

          {/* Visual — real image */}
          <ScrollReveal className="relative bg-[#080808] min-h-80 group" delay={220}>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop"
              alt="Mobile phone showing a digital application"
              className="brightness-50"
              sizes="(max-width: 1024px) 100vw, 50vw"
              speed={70}
            />
            {/* Tinted overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-950/40 via-transparent to-[#080808]/60" />
            <div className="absolute inset-0 bg-linear-to-t from-[#080808]/70 via-transparent to-transparent" />
            {/* Watermark label */}
            <div className="absolute bottom-6 right-6 text-right select-none pointer-events-none">
              <p className="text-3xl font-black text-emerald-400/20 tracking-tight leading-none">
                miliki
              </p>
              <p className="text-sm font-black text-emerald-400/15 tracking-widest">
                .ke
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Accreditation & Licensing Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 mt-px">
          {/* Visual */}
          <ScrollReveal className="relative bg-[#080808] min-h-80 group order-last lg:order-first" delay={80}>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop"
              alt="Official documents and stamps — accreditation and licensing"
              className="brightness-40"
              sizes="(max-width: 1024px) 100vw, 50vw"
              speed={60}
            />
            <div className="absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-[#080808]/60" />
            <div className="absolute inset-0 bg-linear-to-t from-[#080808]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 text-right select-none pointer-events-none">
              <p className="text-3xl font-black text-blue-400/20 tracking-tight leading-none">
                CERTIFY
              </p>
              <p className="text-sm font-black text-blue-400/15 tracking-widest">
                SYSTEM
              </p>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal className="bg-[#0c0c0c]" delay={200}>
            <div className="p-14 flex flex-col justify-between min-h-96">
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <span className="text-xs border border-blue-500/25 text-blue-400 px-3 py-1 uppercase tracking-wider font-mono">
                    Live Product
                  </span>
                  <span className="text-xs border border-white/10 text-gray-500 px-3 py-1 uppercase tracking-wider font-mono">
                    Success Story
                  </span>
                </div>

                <h3 className="text-5xl font-black text-white tracking-tight mb-5">
                  Accreditation &amp; Licensing
                </h3>

                <p className="text-[0.95rem] text-gray-400 leading-[1.9] max-w-md mb-10">
                  A purpose-built platform for regulatory bodies, professional
                  associations, and government agencies to manage the full
                  lifecycle of accreditations, licences, and certifications —
                  from application and verification through to renewals and
                  compliance tracking.
                </p>

                <ul className="space-y-2 mb-10">
                  {[
                    "Online application & document submission",
                    "Automated verification workflows",
                    "Licence issuance & digital certificates",
                    "Renewal reminders & expiry management",
                    "Public licence registry & search",
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-gray-500">
                      <span className="mt-2 w-1 h-1 rounded-full bg-blue-400/60 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-white text-sm font-semibold w-fit border-b border-white/20 pb-1.5 hover:border-white transition-colors"
              >
                Enquire about this product
                <span className="group-hover:translate-x-1.5 transition-transform inline-block">
                  →
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
