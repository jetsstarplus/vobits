import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Bespoke Development", href: "#services" },
    { label: "Business Central", href: "#services" },
    { label: "HR & Payroll", href: "#services" },
  ],
  Products: [{ label: "miliki.ke", href: "https://miliki.ke", external: true }],
  Company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 pt-20 pb-10 bg-[#060606]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-white font-black text-lg tracking-[0.2em] block mb-5 hover:opacity-75 transition-opacity"
            >
              VOBITS
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Building digital solutions that power businesses across East
              Africa.
            </p>
            <p className="text-sm text-gray-600">Nairobi, Kenya</p>
            <a
              href="mailto:hello@vobits.ke"
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors mt-1 block"
            >
              hello@vobits.ke
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(
                  (link: { label: string; href: string; external?: boolean }) =>
                    link.external ? (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-white/5 pt-8">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Vobits Limited. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">vobits.ke</p>
        </div>
      </div>
    </footer>
  );
}
