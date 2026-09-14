"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Code2,
  FileCode,
  ShieldCheck,
  Server,
  GitBranch,
  Rocket,
  Container,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data shape                                                         */
/* ------------------------------------------------------------------ */
interface ArchitectureNode {
  id: string;
  title: string;
  category: string;
  description: string;
  language: string;
  code: string;
}

/* ------------------------------------------------------------------ */
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  return (
    <div className="overflow-auto rounded-lg border border-border bg-zinc-900 p-4 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
        <FileCode className="h-3.5 w-3.5" />
        <span className="uppercase tracking-[0.15em]">{lang}</span>
      </div>
      <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MobileRow({
  node,
  expanded,
  onToggle,
}: {
  node: ArchitectureNode;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-hover"
        aria-expanded={expanded}
      >
        <span className="text-accent">{iconForCategory(node.category)}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{node.title}</p>
          <p className="mt-0.5 text-xs text-foreground-tertiary">{node.description}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <CodeBlock code={node.code} lang={node.language} />
        </div>
      )}
    </div>
  );
}

function TimelineRow({
  node,
  active,
  onSelect,
  isLast,
}: {
  node: ArchitectureNode;
  active: boolean;
  onSelect: () => void;
  isLast: boolean;
}) {
  return (
    <li
      className="relative flex cursor-pointer gap-3 transition-colors"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      aria-current={active ? "true" : undefined}
    >
      <div className="flex flex-col items-center">
        <div
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            active
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-card text-muted"
          }`}
        >
          {iconForCategory(node.category)}
        </div>
        {!isLast && (
          <div className={`mt-1 h-full w-0.5 ${active ? "bg-accent/40" : "bg-border"}`} />
        )}
      </div>
      <div
        className={`flex-1 rounded-lg border p-4 pb-2 transition-colors ${
          active
            ? "border-accent/40 bg-accent/[0.05]"
            : "border-border bg-card hover:border-border-strong"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
          {node.category}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{node.title}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground-tertiary">{node.description}</p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Code2 className="h-3 w-3" />
          {node.language}
          {active && (
            <ChevronRight className="ml-auto h-3.5 w-3.5 text-accent" aria-hidden />
          )}
        </div>
      </div>
    </li>
  );
}
/*  Icon by category                                                   */
/* ------------------------------------------------------------------ */
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Security & Identity": ShieldCheck,
  "Platform & Compute": Container,
  "Security & Governance": ShieldCheck,
  "Delivery & CI/CD": GitBranch,
  "GitOps & Delivery": Rocket,
};

function iconForCategory(cat: string) {
  const Icon = categoryIcons[cat] ?? Server;
  return <Icon className="h-5 w-5 shrink-0" aria-hidden />;
}
interface ReferenceViewerProps {
  nodes: ArchitectureNode[];
}

export function ReferenceViewer({ nodes }: ReferenceViewerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  return (
    <section className="w-full">
      {/* Mobile accordion */}
      <div className="space-y-3 lg:hidden">
        {nodes.map((node) => (
          <MobileRow
            key={node.id}
            node={node}
            expanded={mobileOpen === node.id}
            onToggle={() =>
              setMobileOpen((prev) => (prev === node.id ? null : node.id))
            }
          />
        ))}
      </div>

      {/* Desktop: 2-column grid */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-[1fr_1.4fr]">
        {/* Left: timeline */}
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <ol className="space-y-0">
            {nodes.map((node, i) => (
              <TimelineRow
                key={node.id}
                node={node}
                active={selectedId === node.id}
                onSelect={() => setSelectedId(node.id)}
                isLast={i === nodes.length - 1}
              />
            ))}
          </ol>
        </div>

        {/* Right: sticky code viewer */}
        <div className="sticky top-24 max-h-[80vh] overflow-y-auto">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
              {selectedNode?.category}
            </span>
            <span className="text-xs text-accent">&mdash;</span>
            <span className="text-sm font-semibold text-foreground">
              {selectedNode?.title}
            </span>
          </div>
          <CodeBlock code={selectedNode?.code ?? ""} lang={selectedNode?.language ?? "text"} />
        </div>
      </div>
    </section>
  );
}
