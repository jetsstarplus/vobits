import Link from "next/link";

const columns: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Services: [
    { label: "Bespoke Development", href: "/#services" },
    { label: "Business Central", href: "/#services" },
    { label: "HR & Payroll", href: "/#services" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/contact" },
  ],
  Products: [{ label: "miliki.ke", href: "https://miliki.ke", external: true }],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#050607] px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="max-w-xs text-lg leading-snug text-white">
              Building the systems East African businesses{" "}
              <span className="font-serif italic text-accent">run on.</span>
            </p>
            <p className="mt-6 text-sm text-muted">Nairobi, Kenya</p>
            <a
              href="mailto:hello@vobits.ke"
              className="mt-1 inline-block text-sm text-white/70 transition-colors hover:text-accent"
            >
              hello@vobits.ke
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-4">
            {Object.entries(columns).map(([title, links]) => (
              <div key={title}>
                <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  {title}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      {l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-line py-6 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Vobits Limited. All rights reserved.</p>
          <p>vobits.ke</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden
        className="text-outline pointer-events-none mb-[-0.18em] select-none text-center text-[24vw] font-black leading-none tracking-[-0.06em]"
      >
        VOBITS
      </p>
    </footer>
  );
}
