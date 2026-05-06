import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features";
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview";
import { PricingSection } from "@/components/landing/pricing";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
