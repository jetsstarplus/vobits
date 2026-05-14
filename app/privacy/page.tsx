import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Vobits Limited — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://vobits.ke/privacy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "1 May 2026";
const CONTACT_EMAIL = "hello@vobits.ke";
const COMPANY = "Vobits Limited";
const WEBSITE = "https://vobits.ke";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f0f0f0]">
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-4">
        <Link
          href="/"
          className="text-xs tracking-[0.2em] text-white/30 uppercase hover:text-white/60 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-24 space-y-12">
        {/* Header */}
        <header className="border-b border-white/10 pb-10">
          <p className="text-xs tracking-[0.25em] text-white/30 uppercase mb-4">
            Legal
          </p>
          <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-white/40 mt-4">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <Section title="1. Introduction">
          <p>
            {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates{" "}
            <a href={WEBSITE} className="text-white/70 hover:text-white underline">
              {WEBSITE}
            </a>{" "}
            and is committed to protecting the personal information you share
            with us. This Privacy Policy explains what data we collect, why we
            collect it, how we use it, and your rights regarding that data.
          </p>
          <p>
            By using our website or services, you agree to the practices
            described in this policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following categories of personal information:</p>
          <ul>
            <li>
              <strong>Contact information</strong> — name, email address, phone
              number, and company name provided through our contact form or
              direct correspondence.
            </li>
            <li>
              <strong>Usage data</strong> — IP address, browser type, operating
              system, pages visited, time spent on pages, and referring URLs,
              collected automatically via server logs and analytics tools.
            </li>
            <li>
              <strong>Communications</strong> — emails, messages, or other
              correspondence you send us.
            </li>
            <li>
              <strong>Client data (service engagements)</strong> — data provided
              in the course of delivering contracted services, governed by a
              separate data processing agreement.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to enquiries and provide requested services.</li>
            <li>Send service updates, invoices, and support communications.</li>
            <li>Improve our website and service offerings.</li>
            <li>Comply with legal and regulatory obligations in Kenya.</li>
            <li>
              Prevent fraud and maintain the security of our systems.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information to third parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <p>
            Where applicable under the Kenya Data Protection Act 2019, we
            process personal data on the following lawful bases:
          </p>
          <ul>
            <li>
              <strong>Consent</strong> — where you have given explicit consent
              (e.g. submitting our contact form).
            </li>
            <li>
              <strong>Contract</strong> — where processing is necessary to
              fulfil a contract or take pre-contractual steps.
            </li>
            <li>
              <strong>Legitimate interests</strong> — for website analytics and
              security, where these do not override your rights.
            </li>
            <li>
              <strong>Legal obligation</strong> — to comply with applicable
              Kenyan law.
            </li>
          </ul>
        </Section>

        <Section title="5. Cookies & Analytics">
          <p>
            Our website may use cookies and similar technologies to enhance your
            experience and collect analytics data. You can control cookies
            through your browser settings. Disabling cookies may affect some
            functionality of the site.
          </p>
          <p>
            We may use third-party analytics services (such as Google Analytics)
            that set their own cookies. Please review the respective privacy
            policies of those providers.
          </p>
        </Section>

        <Section title="6. Data Sharing">
          <p>
            We may share your personal information with:
          </p>
          <ul>
            <li>
              <strong>Service providers</strong> — trusted third parties who
              assist in operating our website and delivering our services (e.g.
              hosting providers, email platforms), under contractual
              confidentiality obligations.
            </li>
            <li>
              <strong>Legal authorities</strong> — where required by law, court
              order, or regulatory authority in Kenya or applicable
              jurisdictions.
            </li>
            <li>
              <strong>Business transfers</strong> — in the event of a merger,
              acquisition, or sale of assets, personal data may be transferred
              subject to equivalent protections.
            </li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain personal data only for as long as necessary to fulfil the
            purposes outlined in this policy, or as required by law. Contact
            enquiry data is typically retained for up to 3 years. Client
            engagement data is retained for the duration of the contract plus 7
            years as required under Kenyan commercial law.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p>
            We implement appropriate technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>
            Under the Kenya Data Protection Act 2019, you have the right to:
          </p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Rectify inaccurate or incomplete data.</li>
            <li>
              Request erasure of your data where it is no longer necessary.
            </li>
            <li>Object to or restrict processing in certain circumstances.</li>
            <li>
              Withdraw consent at any time where processing is based on consent.
            </li>
            <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC) Kenya.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white/70 hover:text-white underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="10. Third-Party Links">
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites. We
            encourage you to review their privacy policies.
          </p>
        </Section>

        <Section title="11. Children's Privacy">
          <p>
            Our services are not directed at individuals under the age of 18. We
            do not knowingly collect personal information from children. If you
            believe a child has provided us with personal data, please contact
            us so we can delete it.
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date. Your continued
            use of the website after changes constitutes acceptance of the
            revised policy.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>
            For any questions or concerns about this Privacy Policy or your
            personal data, please contact:
          </p>
          <address className="not-italic mt-3 space-y-1 text-white/60">
            <p className="font-semibold text-white/80">{COMPANY}</p>
            <p>Nairobi, Kenya</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-white underline transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href={WEBSITE}
                className="hover:text-white underline transition-colors"
              >
                {WEBSITE}
              </a>
            </p>
          </address>
        </Section>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-white/90">{title}</h2>
      <div className="text-sm text-white/55 leading-[1.9] space-y-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_strong]:text-white/80">
        {children}
      </div>
    </section>
  );
}
