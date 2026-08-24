"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card/80">
      {(title || language) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                {language}
              </span>
            )}
            {title && (
              <span className="text-xs text-foreground-tertiary">{title}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-card-hover hover:text-foreground-secondary"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground-secondary">{code}</code>
      </pre>
    </div>
  );
}
