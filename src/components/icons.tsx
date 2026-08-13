"use client";

import { useId } from "react";

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function PlatformBoxLogoIcon({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="512" height="512" rx="112" fill="#09090b" />
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M 208,128 H 128 V 384 H 208" fill="none" stroke="#ffffff" strokeWidth={48} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 304,128 H 384 V 384 H 304" fill="none" stroke={`url(#${id})`} strokeWidth={48} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Server racks — Infrastructure as Code. */
export function InfrastructureIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <line x1="7" y1="17" x2="7.01" y2="17" />
      <rect x="3" y="4" width="18" height="6" rx="2" opacity="0.4" />
      <line x1="7" y1="7" x2="7.01" y2="7" opacity="0.4" />
    </svg>
  );
}

/** CI/CD pipeline flow. */
export function PipelineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="5" cy="12" r="3" />
      <line x1="8" y1="12" x2="15" y2="12" opacity="0.4" />
      <circle cx="19" cy="12" r="3" opacity="0.4" />
      <path d="M12 8 L16 12 L12 16" opacity="0.4" />
    </svg>
  );
}

/** Preview environment with arrow — Ephemeral Environments. */
export function EphemeralIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 12 A 4 4 0 0 1 16 12" opacity="0.4" />
      <path d="M16 8 V 12 H 12" opacity="0.4" />
    </svg>
  );
}

/** Upward chart — Financial ROI. */
export function ROIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="20" x2="21" y2="20" />
      <path d="M4 16 L10 10 L14 14" opacity="0.4" />
      <path d="M14 14 L20 4" />
      <polyline points="14 4 20 4 20 10" />
    </svg>
  );
}
