"use client";

import { ArrowRight } from "lucide-react";
import { BOOKING_URL, BOOKING_LABEL, ASSESSMENT_URL, ASSESSMENT_LABEL } from "@/lib/constants";

interface BookingCtaProps {
  variant?: "primary" | "outline";
  className?: string;
  label?: string;
  /** Optional override for the href. Defaults to BOOKING_URL (Cal.com). */
  href?: string;
}

export function BookingCta({
  variant = "outline",
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

export function AssessmentCta(props: BookingCtaProps) {
  return <BookingCta variant="primary" href={ASSESSMENT_URL} label={ASSESSMENT_LABEL} {...props} />;
}
