import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Sectors from "./components/Sectors";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import JourneyNav from "./components/JourneyNav";

/**
 * The homepage is told as a six-chapter journey:
 * Hero (chaos → order) → 01 Friction → 02 Who we serve → 03 What we do
 * → 04 How we work → 05 Proof → 06 Next step.
 */
export default function Home() {
  return (
    <main>
      <JourneyNav />
      <Hero />
      <Manifesto />
      <Sectors />
      <Marquee />
      <Services />
      <Process />
      <Impact />
      <Testimonials />
      <Marquee reverse />
      <CTA />
    </main>
  );
}
