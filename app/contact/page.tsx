import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Chapter, LineReveal, Reveal } from "../components/ui/Motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Vobits Limited — bespoke software, Microsoft Dynamics 365 Business Central and outsourced HR & payroll in Nairobi and across East Africa.",
  alternates: { canonical: "https://vobits.ke/contact" },
};

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-hidden px-5 pb-28 pt-36 sm:px-8 md:pt-44">
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/4 -z-10 aspect-square w-[90vw] rounded-full bg-[radial-gradient(closest-side,rgba(200,255,77,0.12),transparent)]"
      />
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div>
          <Chapter n="→" label="Start a project" className="mb-8" />
          <LineReveal
            as="h1"
            animateOnMount
            className="text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
            lines={[
              "Tell us where",
              "things get",
              <span key="l" className="font-serif font-normal italic text-accent">
                stuck.
              </span>,
            ]}
          />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
              A few lines is enough. We&apos;ll come back with questions, a
              rough approach and next steps — no obligation.
            </p>

            <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href="mailto:hello@vobits.ke"
                    className="text-lg text-white transition-colors hover:text-accent"
                  >
                    hello@vobits.ke
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  Based in
                </dt>
                <dd className="mt-2 text-lg text-white">Nairobi, Kenya</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40}>
          <ContactForm />
        </Reveal>
      </div>
    </main>
  );
}
