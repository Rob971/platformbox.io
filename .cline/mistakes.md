# Mistakes ledger

## 2026-09-17 Same origin is not one application
Believed: Assessment purchase links could use Next.js client navigation because the destination shares the marketing origin.
Actually: The proxy serves Delivery HTML, not a React Server Component response. Purchase links need a full document navigation.
Tell: The existing workspace-link comment in header.tsx already identified this application boundary.
Rule: Before choosing client navigation for a proxied path, inspect the response type and test the actual browser click across the boundary.
