import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageNav } from "@/components/page-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { OutcomeSection } from "@/components/sections/outcome-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { DeliverySection } from "@/components/sections/delivery-section";
import { Day14Section } from "@/components/sections/day14-section";
import { WhyDifferentSection } from "@/components/sections/why-different-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { AssessmentSection } from "@/components/sections/assessment-section";
import { ScopeAssumptionsSection } from "@/components/sections/scope-assumptions-section";
import { OwnershipSection } from "@/components/sections/ownership-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { ReferenceArchitectureSection } from "@/components/sections/reference-architecture-section";
import { EvidenceSection } from "@/components/sections/evidence-section";
import { RoiSection } from "@/components/sections/roi-section";
import { FitSection } from "@/components/sections/fit-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

const pageSections = [
  { id: "outcome", label: "Path" },
  { id: "day-14", label: "Day 14" },
  { id: "why-not-build", label: "Why us" },
  { id: "pricing", label: "Pricing" },
  { id: "assessment", label: "Assessment" },
  { id: "ownership", label: "Ownership" },
  { id: "technology", label: "Stack" },
  { id: "evidence", label: "Proof" },
  { id: "faq", label: "FAQ" },
];

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header />
      <PageNav sections={pageSections} />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <ProblemSection />
        <OutcomeSection />
        <BeforeAfterSection />
        <DeliverySection />
        <Day14Section />
        <WhyDifferentSection />
        <PricingSection />
        <AssessmentSection />
        <ScopeAssumptionsSection />
        <OwnershipSection />
        <TechnologySection />
        <ReferenceArchitectureSection />
        <EvidenceSection />
        <RoiSection />
        <FitSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}

