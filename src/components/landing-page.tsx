import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { OutcomeSection } from "@/components/sections/outcome-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { DeliverySection } from "@/components/sections/delivery-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { RoiSection } from "@/components/sections/roi-section";
import { FitSection } from "@/components/sections/fit-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <ProblemSection />
        <OutcomeSection />
        <BeforeAfterSection />
        <DeliverySection />
        <TechnologySection />
        <PricingSection />
        <RoiSection />
        <FitSection />
        <CaseStudySection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
