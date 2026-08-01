"use client";

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function PlatformBoxLogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="pb-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#pb-gradient)" strokeWidth="6">
        <polygon points="60 12 96 30 96 72 60 90 24 72 24 30" />
        <polyline points="37 48 60 34 83 48" />
        <polyline points="60 34 60 76" />
        <path d="M60 76l19-11" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ModularIaCIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <rect x="18" y="24" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="48" y="24" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="33" y="54" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <rect x="63" y="54" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" strokeWidth="6" />
      <path d="M72 28v-8l16 12-16 12v-8" stroke="#7dd3fc" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function CICDVelocityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M30 36c10-6 22-8 34-4 10 3 18 10 22 20" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" />
      <path d="M93 31 105 38 93 45" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 84c-10 6-22 8-34 4-10-3-18-10-22-20" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" />
      <path d="M27 79 15 72 27 65" fill="none" stroke="#facc15" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SecurityComplianceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M60 24l30 14v25c0 20-22 28-30 36-8-8-30-16-30-36V38l30-14z" fill="none" stroke="#22c55e" strokeWidth="6" />
      <rect x="50" y="48" width="20" height="18" rx="4" fill="none" stroke="#22c55e" strokeWidth="5" />
      <path d="M60 60v6" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="27" r="5" fill="#22c55e" />
      <circle cx="93" cy="30" r="5" fill="#22c55e" />
      <circle cx="60" cy="96" r="5" fill="#22c55e" />
      <path d="M32 30 48 45" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M92 34 78 45" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M60 87 60 66" stroke="#22c55e" strokeWidth="3" fill="none" />
    </svg>
  );
}

export function FractionalCTOIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r="26" fill="none" stroke="#a855f7" strokeWidth="6" />
      <path d="M60 26 70 58 96 58" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M28 42 62 52 82 22" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 86v22" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
      <path d="M79 54 95 70" fill="none" stroke="#a855f7" strokeWidth="4" />
      <path d="M35 74 21 86" fill="none" stroke="#a855f7" strokeWidth="4" />
      <rect x="74" y="72" width="8" height="12" rx="2" fill="#a855f7" />
      <rect x="30" y="34" width="8" height="12" rx="2" fill="#a855f7" />
    </svg>
  );
}

export function FinOpsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      <path d="M30 88h18v-28h-18zM54 88h18v-16H54zM78 88h18v-40H78z" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
      <path d="M90 72 108 60 90 48" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="10" fill="none" stroke="#f97316" strokeWidth="5" />
      <circle cx="46" cy="42" r="6" fill="#f97316" />
    </svg>
  );
}