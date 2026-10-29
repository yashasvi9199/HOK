# SEO, CORE WEB VITALS & TELEMETRY STANDARDS

1. **Page Metadata & Structured Data:**
   - Every routable view must expose a unique `<title>` and `<meta name="description">`.
   - Indexable views must include a `<link rel="canonical">` tag pointing to the production domain, stripping marketing/tracking query parameters to prevent duplicate content indexing.
   - Every key indexable page must inject validated JSON-LD schema (`<script type="application/ld+json">`) defining standard entities (`WebSite`, `SoftwareApplication`, `Organization`).

2. **Core Web Vitals & Cumulative Layout Shift (CLS):**
   - All `<img>`, `<video>`, `<iframe>`, and canvas containers must specify explicit `width`/`height` or CSS `aspect-ratio` properties.
   - Dynamic UI elements rendered above the fold must reserve layout height using skeletons or fixed min-height containers to keep Cumulative Layout Shift below 0.1.

3. **Telemetry Privacy & Event Contracts:**
   - Telemetry and analytics pings must remain strictly disabled until explicit user consent is confirmed.
   - All analytics events must adhere to a strict, centralized TypeScript dictionary (`event_name`, `timestamp`, `session_id`, typed properties). Caching or transmitting personally identifiable information (PII), plain passwords, or form inputs is banned.
   - In SPA routing (React/Vite), attach a router-level observer to dispatch a virtual `page_view` telemetry event on every route transition.