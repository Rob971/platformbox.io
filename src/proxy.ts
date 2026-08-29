import type { NextRequest } from "next/server";

/**
 * Same-origin control-plane proxy for the delivery application (ADR-008 in
 * platformbox-delivery).
 *
 * The public marketing site and the delivery control plane are separate
 * applications on separate hosts. This proxy mounts the delivery app's Fly
 * host under `https://www.platformbox.io/admin`, so a customer watching their
 * delivery never leaves the brand or the origin.
 *
 * WHY THIS FILE EXISTS (G0):
 * The previous setup used a `vercel.json` external rewrite to
 * `https://platformbox-delivery.fly.dev`. An external rewrite is a transparent
 * Vercel-router proxy: when the upstream cannot be reached (DNS / TCP / TLS
 * handshake / timeout), Vercel returns its own generic
 * `502 ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR` page — before any PlatformBox
 * code runs. That leaks internal infrastructure detail to a customer.
 *
 * By owning the upstream `fetch()` here, PlatformBox owns the failure boundary:
 * a *transport* failure becomes a branded, customer-safe 502, while an
 * upstream *HTTP* response (including its own 4xx/5xx) is forwarded untouched —
 * the delivery app already renders branded error pages for those.
 */

const DEFAULT_UPSTREAM = "https://platformbox-delivery.fly.dev";
const UPSTREAM = (process.env.DELIVERY_UPSTREAM_URL ?? DEFAULT_UPSTREAM).replace(/\/+$/, "");

const DIAGNOSTICS = process.env.EDGE_DIAGNOSTICS === "1";

/**
 * Time-to-first-byte budget for the upstream request.
 *
 * Without this, a *hung* upstream (TCP accepted, headers never sent) is the one
 * failure mode this boundary does not own: `fetch()` would never reject, the
 * invocation would ride until the platform's own limit, and the customer would
 * get the platform's error page — precisely what this file exists to prevent.
 * A connection *reset* rejects immediately and was always handled; a silent
 * stall was not.
 *
 * The budget is bounded on both sides:
 *  - It must fire well before the platform limit, or the platform answers first
 *    and owns the failure instead of us.
 *  - It must not fire before a legitimately slow start. The delivery app runs
 *    `auto_start_machines = true`, so a stopped machine boots on first request;
 *    too tight a budget would turn a routine cold start into a false 502.
 *
 * 15s clears a Fly cold start with room to spare while leaving margin under the
 * platform ceiling.
 *
 * Deliberately a fixed constant, not an environment variable: this value is
 * only correct while it stays below a platform limit the deployer cannot see,
 * so a well-meaning override (say 60s) would silently hand the failure back to
 * the platform and defeat this entire file. Changing it is a code review.
 */
const UPSTREAM_TIMEOUT_MS = 15_000;

/**
 * Response headers owned by the PlatformBox edge. Each must appear exactly
 * once. Content-Security-Policy is deliberately NOT here: the delivery
 * application owns its own CSP (it renders the admin HTML and knows exactly
 * what resources it needs). The public site's CSP must never be combined with
 * the delivery CSP.
 */
const EDGE_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Cross-Origin-Opener-Policy", "same-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"],
  ["X-Robots-Tag", "noindex, nofollow"],
];

/** Hop-by-hop headers must never be forwarded across the proxy. */
const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "transfer-encoding",
  "upgrade",
  "keep-alive",
  "te",
  "trailer",
  "proxy-authorization",
  "proxy-authenticate",
  "proxy-connection",
  "content-length",
]);

/** Request headers the upstream actually needs. `sec-fetch-*` are passed through. */
const ALLOWED_REQUEST_HEADERS = new Set([
  "cookie",
  "accept",
  "accept-language",
  "accept-encoding",
  "content-type",
  "user-agent",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-correlation-id",
]);

function isForwardableRequestHeader(name: string): boolean {
  const lower = name.toLowerCase();
  if (HOP_BY_HOP.has(lower)) return false;
  if (lower.startsWith("sec-fetch-")) return true;
  return ALLOWED_REQUEST_HEADERS.has(lower);
}

/** Generate a PlatformBox correlation id at the edge. Never reuse a Vercel/internal id. */
function newCorrelationId(): string {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return (
    "PB-" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/**
 * Map the browser-facing `/admin` path onto the upstream path, preserving the
 * exact semantics of the old `vercel.json` rewrite table:
 *
 *   /admin                    → /
 *   /admin/:match*            → /:match*           (prefix stripped)
 *   /admin/delivery           → /admin             (console keeps its own prefix)
 *   /admin/delivery/:match*   → /admin/:match*
 */
function upstreamPath(pathname: string): string {
  if (pathname === "/admin" || pathname === "/admin/") return "/";
  if (pathname === "/admin/delivery" || pathname.startsWith("/admin/delivery/")) {
    return "/admin" + pathname.slice("/admin/delivery".length);
  }
  return pathname.slice("/admin".length);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });
}

/**
 * Self-contained, on-brand network-failure page. Proxy runs before rendering,
 * so it does not receive layout.tsx, next/font Geist, or globals.css — the HTML
 * is fully standalone (inline CSS, system font fallback). No Vercel/Fly/router
 * identifiers, hostnames, error codes, or stack traces are exposed.
 */
function networkFailurePage(correlationId: string, retryPath: string): string {
  const logo = `
    <svg width="44" height="44" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#09090b" stroke="rgba(255,255,255,0.14)" stroke-width="8"/>
      <defs>
        <linearGradient id="pb-r" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#60a5fa"/>
        </linearGradient>
      </defs>
      <path d="M 208,128 H 128 V 384 H 208" fill="none" stroke="#ffffff" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 304,128 H 384 V 384 H 304" fill="none" stroke="url(#pb-r)" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Something went wrong — PlatformBox</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #09090b;
    color: #fafafa;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card { width: 100%; max-width: 440px; text-align: center; }
  .logo { display: inline-flex; margin-bottom: 20px; }
  h1 { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
  p { color: #a1a1aa; font-size: 15px; line-height: 1.6; margin-top: 12px; }
  .ref { color: #71717a; font-size: 13px; margin-top: 20px; }
  .ref code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #e4e4e7; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    height: 44px; padding: 0 20px; margin-top: 28px; border-radius: 8px;
    background: #3b82f6; color: #ffffff; font-size: 14px; font-weight: 500;
    text-decoration: none; transition: background 0.15s ease;
  }
  .btn:hover { background: #60a5fa; }
  .btn:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }
</style>
</head>
<body>
  <div class="card">
    <span class="logo">${logo}</span>
    <h1>Something went wrong</h1>
    <p>PlatformBox is temporarily unable to reach the administration service. Please try again in a moment.</p>
    <p class="ref">Reference <code>${escapeHtml(correlationId)}</code></p>
    <a class="btn" href="${escapeHtml(retryPath)}">Try again</a>
  </div>
</body>
</html>`;
}


/** CSP for the edge-generated 502 page only (delivery is unreachable, so it supplies no CSP). */
const ERROR_PAGE_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";

type FailureReason = "network-error" | "timeout";

function edgeFailureResponse(
  correlationId: string,
  retryPath: string,
  reason: FailureReason,
): Response {
  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Content-Security-Policy", ERROR_PAGE_CSP);
  // An error page must never outlive the outage that produced it. Without an
  // explicit policy the platform default (`public, max-age=0, must-revalidate`)
  // applies, and `public` permits browsers, corporate proxies and ISP caches to
  // STORE this 502 for /admin. A stored copy can keep a customer staring at a
  // failure page — and re-serve it to the "Try again" link — long after the
  // delivery app has recovered. This response is never reusable.
  headers.set("Cache-Control", "no-store, must-revalidate");
  for (const [name, value] of EDGE_HEADERS) headers.set(name, value);
  if (DIAGNOSTICS) {
    headers.set("x-pb-diag-upstream", reason);
    headers.set("x-pb-diag-correlation-id", correlationId);
  }
  return new Response(networkFailurePage(correlationId, retryPath), {
    status: 502,
    statusText: "Bad Gateway",
    headers,
  });
}

export function proxy(request: NextRequest): Promise<Response> | Response {
  // Only /admin is proxied; the matcher below keeps every other route untouched.
  const { pathname, search, origin } = request.nextUrl;
  const method = request.method.toUpperCase();
  const target = `${UPSTREAM}${upstreamPath(pathname)}${search}`;

  const reqHeaders = new Headers();
  request.headers.forEach((value, name) => {
    if (isForwardableRequestHeader(name)) reqHeaders.set(name, value);
  });
  // Derive the origin-forwarding headers from the trusted incoming request,
  // never from client-supplied input.
  if (!reqHeaders.has("x-forwarded-host")) {
    reqHeaders.set("x-forwarded-host", request.headers.get("host") ?? "www.platformbox.io");
  }
  if (!reqHeaders.has("x-forwarded-proto")) {
    reqHeaders.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", "") || "https");
  }
  const correlationId = reqHeaders.get("x-correlation-id") ?? newCorrelationId();
  reqHeaders.set("x-correlation-id", correlationId);

  const hasBody = method !== "GET" && method !== "HEAD" && !!request.body;

  // Abort the upstream request if it stalls before sending headers. An
  // AbortController with a cleared timer is used rather than
  // AbortSignal.timeout(): the latter keeps running once the response begins
  // and would truncate a large but healthy body mid-stream.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  const init: RequestInit = {
    method,
    headers: reqHeaders,
    redirect: "manual", // forward 3xx to the browser; never let fetch follow and drop Set-Cookie
    cache: "no-store",
    signal: controller.signal,
  };
  if (hasBody) {
    init.body = request.body as BodyInit;
    (init as RequestInit & { duplex: "half" }).duplex = "half";
  }

  return fetch(target, init)
    .then((upstream) => {
      // Headers are in: the upstream is alive, so the budget has been met.
      // Stop the timer before it can fire mid-body and truncate the stream.
      // The body itself is intentionally unguarded — status and headers are
      // already committed to the browser, so a stall there can no longer be
      // turned into an error page.
      clearTimeout(timer);

      const resHeaders = new Headers();
      upstream.headers.forEach((value, name) => {
        const lower = name.toLowerCase();
        if (HOP_BY_HOP.has(lower)) return;
        if (lower === "set-cookie") return; // handled individually below
        if (lower === "content-security-policy") {
          // Delivery owns CSP: pass it through untouched, exactly once.
          resHeaders.set(name, value);
          return;
        }
        resHeaders.set(name, value);
      });
      // Preserve every upstream Set-Cookie individually (never comma-join).
      for (const cookie of upstream.headers.getSetCookie()) {
        resHeaders.append("set-cookie", cookie);
      }
      // The delivery app emits browser-facing relative redirects (e.g.
      // `/admin/`, `/admin/auth/login`). Next.js rejects a relative Location
      // header, so resolve path-only Locations against the browser-facing
      // origin. Absolute and protocol-relative URLs pass through unchanged.
      const location = upstream.headers.get("location");
      if (location && location.startsWith("/") && !location.startsWith("//")) {
        resHeaders.set("location", origin + location);
      }
      // Canonical edge-owned headers (exactly once; upstream duplicates replaced).
      for (const [name, value] of EDGE_HEADERS) resHeaders.set(name, value);
      if (DIAGNOSTICS) {
        resHeaders.set("x-pb-diag-upstream", String(upstream.status));
        resHeaders.set("x-pb-diag-correlation-id", correlationId);
        resHeaders.set("x-pb-diag-upstream-url", target);
        resHeaders.set("x-pb-diag-xff", request.headers.get("x-forwarded-for") ?? "(absent)");
      }
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: resHeaders,
      });
    })
    .catch(() => {
      // Transport-level failure (DNS / TCP / TLS handshake) or a stall that
      // exhausted the budget above. Either way the delivery app is effectively
      // unreachable, so PlatformBox owns this response. The customer-facing
      // page is identical in both cases; only diagnostics tell them apart.
      clearTimeout(timer);
      const reason = controller.signal.aborted ? "timeout" : "network-error";
      return edgeFailureResponse(correlationId, pathname + search, reason);
    });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

