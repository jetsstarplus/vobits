import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Products from "./components/Products";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SectionColorManager from "./components/SectionColorManager";

export default function Home() {
  return (
    <>
      <SectionColorManager />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Testimonials />
      <Products />
      <CTA />
      <Footer />
    </>
  );
}
