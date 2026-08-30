# 06 — The /admin proxy boundary

`src/proxy.ts` mounts the delivery control plane at `platformbox.io/admin`
(ADR-008 in platformbox-delivery). It is the highest-risk file in this
repository: two customer-visible production incidents originated here.

Treat every rule below as load-bearing. Each one is a fix, not a preference.

## Never forward the upstream `content-encoding`

`fetch()` has ALREADY decoded the response body, so `upstream.body` is plain
bytes. Forwarding the upstream's `content-encoding` promises the browser a
gzip/br/zstd stream and hands it plaintext. The browser trusts the header,
fails to decode, and renders **nothing**.

This failure is invisible to `curl`, which does not decode without
`--compressed` — it will report `200 OK` and the correct byte count while every
real visitor sees a blank page. Verify this path with a decoding client.

`content-length` is dropped as hop-by-hop for the same reason: the decoded
length differs.

## The fetch must be time-boxed, below the platform limit

A hung upstream (TCP accepted, headers never sent) never rejects on its own.
Without a budget the invocation rides until the platform's own limit and the
platform answers the failure — which is the exact leak this file exists to
prevent. The budget must also clear a Fly cold start, or a routine machine
wake becomes a false 502.

The timer is cleared once response headers arrive, so it cannot fire mid-body
and truncate a large healthy stream. `AbortSignal.timeout()` is deliberately
not used: it keeps running through body transfer.

## The error page must be `no-store`

Without an explicit policy the platform default (`public, max-age=0,
must-revalidate`) applies, and `public` lets browsers and intermediaries
**store** a 502. A cached error page outlives the outage that produced it and
keeps a customer locked out after recovery — including through the page's own
"Try again" link.

## Delivery owns its own CSP

`next.config.ts` deliberately excludes `/admin` from the site header block.
The delivery application renders that HTML and knows what it needs. Never
combine the marketing CSP with the delivery CSP, and do not "fix" the
exclusion.

## Edge-owned headers appear exactly once

HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, COOP,
Permissions-Policy and X-Robots-Tag are set by the edge and must not be
duplicated from upstream. `Set-Cookie` is preserved individually, never
comma-joined.
