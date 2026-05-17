import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Products from "./components/Products";
import SectionColorManager from "./components/SectionColorManager";

export default function Home() {
  return (
    <>
      <SectionColorManager />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Testimonials />
      <Products />
    </>
  );
}
