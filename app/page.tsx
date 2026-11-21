import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Process from "./components/Process";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import JourneyNav from "./components/JourneyNav";

/**
 * The homepage is told as a five-chapter journey:
 * Hero (chaos → order) → 01 Friction → 02 What we do → 03 How we work
 * → 04 Proof → 05 Next step.
 */
export default function Home() {
  return (
    <main>
      <JourneyNav />
      <Hero />
      <Manifesto />
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
