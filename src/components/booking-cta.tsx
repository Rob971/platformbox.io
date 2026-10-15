"use client";

import { ArrowRight } from "lucide-react";
import { BOOKING_URL, BOOKING_LABEL, ASSESSMENT_URL, ASSESSMENT_LABEL, SELF_SERVE_ASSESSMENT_OPEN } from "@/lib/constants";

interface BookingCtaProps {
  variant?: "primary" | "outline";
  className?: string;
  label?: string;
  /** Optional override for the href. Defaults to BOOKING_URL (Cal.com). */
  href?: string;
}

export function BookingCta({
  // With the self-serve checkout closed, the conversation is the primary call to action.
  variant = SELF_SERVE_ASSESSMENT_OPEN ? "outline" : "primary",
  className,
  label = BOOKING_LABEL,
  href = BOOKING_URL,
}: BookingCtaProps) {
  const styles =
    variant === "primary"
      ? "bg-accent-strong text-white hover:bg-accent"
      : "border border-border-strong text-foreground-secondary hover:border-border-strong";

  const classNames = `inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-colors ${styles} ${className ?? ""}`;
  if (href.startsWith("/")) {
    // Delivery serves HTML, not React Server Components: cross this boundary with a full navigation.
    return <a href={href} className={classNames}>{label}<ArrowRight className="h-4 w-4" aria-hidden /></a>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

/** Self-serve Assessment checkout. Renders nothing while SELF_SERVE_ASSESSMENT_OPEN is false. */
export function AssessmentCta(props: BookingCtaProps) {
  if (!SELF_SERVE_ASSESSMENT_OPEN) return null;
  return <BookingCta variant="primary" href={ASSESSMENT_URL} label={ASSESSMENT_LABEL} {...props} />;
}

/** The single entry-point button where no booking button sits beside it. */
export function EntryCta(props: BookingCtaProps) {
  if (SELF_SERVE_ASSESSMENT_OPEN) return <AssessmentCta {...props} />;
  return <BookingCta variant="primary" {...props} />;
}
