---
trigger: always_on
---

# API & NETWORKING STANDARDS

1. **REST Resource Semantics:** Use plural nouns for resources (e.g., `/users/42`). Nest paths to a maximum of 2 levels; pass deeper relationships via query parameters (e.g., `/tasks/4?project_id=3`).
2. **Kebab-Case & Verb-Free Routing:** Keep all URLs lowercase and hyphenated. Strip action verbs from paths and let HTTP verbs dictate intent (`GET` reads, `POST` creates, `DELETE` removes).
3. **Actionable Error Payloads:** Return human-readable, actionable error bodies indicating what the client must correct (e.g., `{"error": "email is required"}`). Never leak database errors or internal stack traces to the client.
4. **Payload Size Boundaries:** Enforce strict body-size limits on all incoming request streams (rejecting payloads exceeding limits with `413 Payload Too Large`) to prevent memory exhaustion DoS.
5. **Tiered Backend Rate Limiting:** Implement rate limiting strictly on the backend:
   - **General endpoints:** Token bucket (30 req / 60s).
   - **Strict/Auth endpoints (login, signup, reset):** Fixed window (1 req / 120s) with tight threshold tiers.