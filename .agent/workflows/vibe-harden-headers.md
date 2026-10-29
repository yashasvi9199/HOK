---
description: Scaffold and verify strict HTTP browser security headers
---

# Security Header Hardening Task
1. Inspect the server or middleware layer (Node, Express, Hono, Edge functions).
2. Configure standard defensive headers:
   - `Content-Security-Policy` (CSP)
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
3. Ensure CORS policies resolve whitelisted origins dynamically from environment variables.
   - `Strict-Transport-Security` (HSTS for HTTPS)