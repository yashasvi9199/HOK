---
description: Scaffold type-safe analytics taxonomy, consent gate, and SPA route change listeners
---

# Telemetry Setup Task

1. Create `src/types/telemetry.types.ts` defining strict event unions without PII.
2. Scaffold `src/lib/telemetry.ts` with runtime environment checks (suppressing pings on localhost).
3. Bind consent-checking middleware so events drop silently until consent is granted.
4. Inject an SPA route observer into the top-level router to trigger virtual page views on route changes.