import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import Customization from "@/components/Customization";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-[#15171e]">
        <Hero />
        <Features />
        <DeviceShowcase />
        <Customization />
        <Testimonials />
        <CallToAction />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
