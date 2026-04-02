import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import Footer from "../components/Footer";
import Proof from "@/components/Proof";
import ProductsOverview from "@/components/ProductsOverview";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/Usecases";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import FAQ from "@/components/Faq";
import FinalCTA from "@/components/Finalcta";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      <Navbar />
      <Hero />
      <Proof />
      <ProductsOverview />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Testimonials />
      <Integrations />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
