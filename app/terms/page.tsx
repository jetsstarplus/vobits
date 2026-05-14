import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Vobits Limited — the conditions governing your use of our website and services.",
  alternates: { canonical: "https://vobits.ke/terms" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "1 May 2026";
const CONTACT_EMAIL = "hello@vobits.ke";
const COMPANY = "Vobits Limited";
const WEBSITE = "https://vobits.ke";

export default function TermsOfService() {
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
          <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
          <p className="text-sm text-white/40 mt-4">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using the website at{" "}
            <a href={WEBSITE} className="text-white/70 hover:text-white underline">
              {WEBSITE}
            </a>{" "}
            or engaging any services provided by {COMPANY} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by
            these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree,
            please do not use our website or services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and{" "}
            {COMPANY}, a company incorporated in Kenya.
          </p>
        </Section>

        <Section title="2. Services">
          <p>
            {COMPANY} provides bespoke software development, Microsoft Dynamics
            365 Business Central implementation and support, outsourced HR and
            payroll services, and related digital consulting services
            (collectively, &ldquo;Services&rdquo;).
          </p>
          <p>
            The specific scope, deliverables, timelines, and fees for any
            engagement are governed by a separate written agreement or Statement
            of Work (&ldquo;SOW&rdquo;) agreed between the parties. In the event
            of a conflict between these Terms and an SOW, the SOW shall prevail.
          </p>
        </Section>

        <Section title="3. Website Use">
          <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
          <ul>
            <li>Infringe any applicable local or international law or regulation.</li>
            <li>
              Transmit any unsolicited, unauthorised advertising or promotional
              material.
            </li>
            <li>
              Attempt to gain unauthorised access to any part of our systems or
              infrastructure.
            </li>
            <li>
              Introduce viruses, trojans, worms, or any other malicious or
              technologically harmful material.
            </li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <p>
            All content on this website — including text, graphics, logos,
            images, and software — is the property of {COMPANY} or its content
            suppliers and is protected by Kenyan and international intellectual
            property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative
            works from any content on this website without our prior written
            consent.
          </p>
          <p>
            With respect to deliverables produced under a service engagement,
            intellectual property ownership is as agreed in the relevant SOW or
            contract. Unless otherwise agreed in writing, all custom code,
            designs, and materials created for a client become the client&apos;s
            property upon full payment of all fees.
          </p>
        </Section>

        <Section title="5. Client Responsibilities">
          <p>Where you engage us for Services, you agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and timely information required for
              delivery of the Services.
            </li>
            <li>
              Ensure you hold all necessary rights and licences for any materials
              or data provided to us.
            </li>
            <li>
              Appoint an appropriate point of contact and make necessary
              personnel available in a timely manner.
            </li>
            <li>Pay all fees as agreed in the relevant SOW or contract.</li>
          </ul>
        </Section>

        <Section title="6. Payment Terms">
          <p>
            Fees for Services are as set out in the applicable SOW or invoice.
            Unless otherwise agreed:
          </p>
          <ul>
            <li>Invoices are due within 30 days of issue.</li>
            <li>
              Late payments may accrue interest at the rate of 1.5% per month on
              the outstanding balance.
            </li>
            <li>
              We reserve the right to suspend Services for overdue accounts
              after reasonable notice.
            </li>
          </ul>
          <p>All prices are in Kenyan Shillings (KES) unless otherwise stated.</p>
        </Section>

        <Section title="7. Confidentiality">
          <p>
            Both parties agree to keep confidential all non-public information
            received from the other party in connection with the Services, using
            at least the same degree of care as they apply to their own
            confidential information, and not to disclose such information to
            third parties without prior written consent, except as required by
            law.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, {COMPANY} shall not be
            liable for any:
          </p>
          <ul>
            <li>
              Indirect, incidental, special, consequential, or punitive damages.
            </li>
            <li>Loss of profits, revenue, data, goodwill, or business.</li>
            <li>
              Damages arising from reliance on content on this website or
              interruption to website availability.
            </li>
          </ul>
          <p>
            Our total liability to you for any claim arising under these Terms
            shall not exceed the total fees paid by you to us in the 3 months
            preceding the event giving rise to the claim.
          </p>
        </Section>

        <Section title="9. Warranties & Disclaimers">
          <p>
            This website and its content are provided on an &ldquo;as is&rdquo;
            and &ldquo;as available&rdquo; basis without warranties of any kind,
            whether express or implied, including merchantability, fitness for a
            particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the website will be uninterrupted, error-free,
            or free of viruses or other harmful components.
          </p>
        </Section>

        <Section title="10. Third-Party Links">
          <p>
            Our website may contain links to third-party websites or services.
            We have no control over and assume no responsibility for the content,
            privacy policies, or practices of any third-party sites. We encourage
            you to review the terms and privacy policies of any third-party sites
            you visit.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            We reserve the right to terminate or suspend access to our website
            or Services, with or without notice, for conduct that we believe
            violates these Terms or is harmful to other users, us, third parties,
            or for any other reason in our sole discretion.
          </p>
          <p>
            Either party may terminate a service engagement in accordance with
            the terms set out in the relevant SOW or contract.
          </p>
        </Section>

        <Section title="12. Governing Law & Dispute Resolution">
          <p>
            These Terms are governed by the laws of Kenya. Any dispute arising
            out of or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts of Nairobi, Kenya.
          </p>
          <p>
            The parties agree to attempt to resolve any dispute through good-faith
            negotiation before initiating formal legal proceedings.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We may update these Terms from time to time. The updated Terms will
            be posted on this page with a revised effective date. Your continued
            use of the website or Services after any changes constitutes your
            acceptance of the new Terms.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            If you have any questions about these Terms, please contact:
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
