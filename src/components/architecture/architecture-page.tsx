import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Boxes,
  GitBranch,
  GitMerge,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Terminal,
  Gauge,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingCta } from "@/components/booking-cta";
import { PageNav, type PageNavSection } from "@/components/page-nav";
import { LiveArchitectureDiagrams } from "@/components/architecture/live-diagrams";
import { technicalReference, architecture, finalCta, evidence } from "@/lib/content";

const sectionIcons = [
  Layers,
  Server,
  GitBranch,
  GitMerge,
  Workflow,
  Lock,
  ShieldCheck,
  Gauge,
  Boxes,
];

const evidenceIcons = [
  GitBranch,
  ShieldCheck,
  GitMerge,
  Layers,
  Boxes,
  Terminal,
];

const pageSections: PageNavSection[] = [
  { id: "overview", label: "Overview", description: "The PlatformBox reference architecture at a glance." },
  { id: "path", label: "Path", description: "The step-by-step flow from developer to production." },
  { id: "components", label: "Components", description: "Each layer and who owns it." },
  { id: "diagrams", label: "Diagrams", description: "Live architecture diagrams, pre-rendered from the IDP repo." },
  { id: "verify", label: "Verify", description: "Links to the reference implementation — proof, not promises." },
  { id: "book", label: "Book", description: "Schedule your Platform Assessment." },
];

export function ArchitecturePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-glow" aria-hidden />

      <Header showHomeLink />
      <PageNav sections={pageSections} />

      <main className="relative z-10 flex-1" id="main-content">
        <section id="overview" className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center sm:pt-24 md:pt-28">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {technicalReference.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.08]">
            {technicalReference.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground-tertiary sm:text-lg">
            {technicalReference.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BookingCta />
            <Link
              href="/showcase"
              prefetch={false}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
            >
              See the 14-Day Blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>

        <section id="path" className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The path from developer to production
            </h2>
            <ol className="space-y-1">
              {architecture.flow.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && (
                    <li aria-hidden className="flex justify-center py-1 text-muted">
                      <ArrowDown className="h-4 w-4" />
                    </li>
                  )}
                  <li
                    className={`rounded-lg border px-5 py-3.5 text-center text-sm font-medium ${
                      i === 1
                        ? "border-accent/40 bg-accent/10 text-accent-hover"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {step}
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </section>

        <section id="components" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground-tertiary">
                The components
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What each layer does — and who owns it.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {technicalReference.sections.map((section, i) => {
                const Icon = sectionIcons[i];
                return (
                  <div
                    key={section.name}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{section.name}</p>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-accent-hover">
                      {section.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary">{section.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diagrams" className="border-t border-border">
          <div className="mx-auto max-w-none px-6 py-16 md:py-24">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Verified vs. planned
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What&apos;s actually built today.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
                Drawn from applied Terraform state, not the roadmap. Solid green marks
                what&apos;s built and checked today; dashed blue is verified but
                on-demand; dashed grey is target state we haven&apos;t built yet. Every
                verified claim traces to a decision record in the reference
                implementation — pre-rendered from it, not a snapshot.
              </p>
            </div>
            <LiveArchitectureDiagrams />
          </div>
        </section>

        <section id="verify" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {evidence.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {evidence.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-tertiary sm:text-base">
                {evidence.sub}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {evidence.links.map((link, i) => {
                const Icon = evidenceIcons[i];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40 hover:bg-surface-hover"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{link.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-tertiary">{link.description}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="book" className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {finalCta.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground-tertiary sm:text-base">
              {finalCta.sub}
            </p>
            <div className="mt-8">
              <BookingCta />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
