import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageNav } from "@/components/page-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { Day14Section } from "@/components/sections/day14-section";
import { EvidenceSection } from "@/components/sections/evidence-section";
import { NotIncludedSection } from "@/components/sections/not-included-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FounderSection } from "@/components/sections/founder-section";

const pageSections = [
  { id: "how-it-works", label: "How it works", number: "01", description: "Assess → Build → Prove → Outcome — the engagement model." },
  { id: "day-14", label: "Day 14", number: "02", description: "What is actually working on handover day." },
  { id: "evidence", label: "Proof", number: "03", description: "Technical claims backed by inspectable reference evidence." },
  { id: "pricing", label: "Pricing", number: "04", description: "Fixed price. Live in 14 working days." },
  { id: "founder", label: "Founder", number: "05", description: "Who's behind PlatformBox, and why it exists." },
  { id: "faq", label: "FAQ", number: "06", description: "Common questions, answered directly." },
];

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header />
      <PageNav sections={pageSections} />

      <main className="relative z-10 flex-1" id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <Day14Section />
        <EvidenceSection />
        <NotIncludedSection />
        <PricingSection />
        <FounderSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}

