export default function CTA() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#0c0c0c] border border-white/5 px-10 py-24 md:px-24 overflow-hidden">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.06),transparent_60%)]" />

          <div className="relative text-center">
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-gray-500 uppercase mb-8">
              <span className="w-5 h-px bg-gray-600 inline-block" />
              Get In Touch
              <span className="w-5 h-px bg-gray-600 inline-block" />
            </p>

            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-8">
              Ready to build
              <br />
              <span className="text-gray-500">something great?</span>
            </h2>

            <p className="text-[0.95rem] text-gray-400 max-w-xl mx-auto mb-14 leading-[1.85]">
              Whether you need a custom application, a Business Central
              implementation, or outsourced HR services — let&apos;s start a
              conversation.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@vobits.ke"
                className="bg-white text-black font-semibold text-sm px-10 py-4 hover:bg-gray-100 transition-colors"
              >
                hello@vobits.ke
              </a>
              <a
                href="#"
                className="border border-white/15 text-white font-semibold text-sm px-10 py-4 hover:border-white/40 transition-colors"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
