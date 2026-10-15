/**
 * Self-serve Assessment checkout (signup → payment → activation) is CLOSED.
 *
 * Decision by Roberto, 2026-10-15: legal work is on hold until there is genuine
 * customer interest, so strangers must not be able to sign up and pay through
 * the site. Every engagement now starts with a conversation with Roberto.
 *
 * While false: the start routes (/assessment/start, /start,
 * /admin/public/assessment) redirect to /assessment in src/proxy.ts, and
 * AssessmentCta renders nothing. Activation, resend-activation, complete and
 * cancelled stay proxied, so existing accounts keep working.
 *
 * Deliberately a constant, not an environment variable: a misconfigured deploy
 * must not be able to reopen it. Reopening is a code-reviewed one-line change
 * (set it to true) — also review the copy that describes how to start.
 */
export const SELF_SERVE_ASSESSMENT_OPEN: boolean = false;

export const ASSESSMENT_URL = "/assessment/start";
export const ASSESSMENT_LABEL = "Start Assessment — €2,500";

export const BOOKING_URL = "https://cal.com/roberto-platformbox/platform-assessment";

export const BOOKING_LABEL = "Talk to Roberto";

export const BOOKING_NOTE =
  "Every PlatformBox engagement starts with a conversation with Roberto. The €2,500 Platform Readiness Assessment follows if it is the right next step.";

// Public reference implementation — the single source of truth for the
// /architecture diagrams and every verifiable evidence link on the site.
export const IDP_REPO_URL = "https://gitlab.com/platform-box-group/platformbox-idp";

/** The authenticated delivery control plane entry point. Same origin — the /admin base proxy to app.platformbox.io's Fly app — see ADR-008 in platformbox-delivery. */
export const WORKSPACE_PATH = "/admin";
