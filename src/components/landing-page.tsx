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
  { id: "outcome", label: "Path", number: "02", description: "The standardized golden path from Git to production." },
  { id: "day-14", label: "Day 14", number: "05", description: "What is actually working on handover day." },
  { id: "why-not-build", label: "Why us", number: "06", description: "Why not build the platform internally." },
  { id: "pricing", label: "Pricing", number: "07", description: "Fixed price. Live in 14 working days." },
  { id: "assessment", label: "Assessment", number: "08", description: "The risk-reduction step before any commitment." },
  { id: "ownership", label: "Ownership", number: "10", description: "You own everything — no lock-in." },
  { id: "technology", label: "Stack", number: "11", description: "Integrates with the tools you already use." },
  { id: "evidence", label: "Proof", number: "12", description: "Every claim links to the public reference implementation." },
  { id: "faq", label: "FAQ", number: "15", description: "Common questions, answered directly." },
];

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header />
      <PageNav sections={pageSections} />

      <main className="relative z-10 flex-1" id="main-content">
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

