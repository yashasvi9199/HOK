# SECURITY & DATA VALIDATION INVARIANTS

1. **Zero-Trust Schema Validation:** Every incoming API payload, query param, and path variable must be validated against a strict schema (e.g., Zod, Valibot) checking type, length, and format. Reject non-matching data immediately; do not rely on loose sanitization.
2. **Sequential ID Masking:** Never expose raw, auto-incrementing database integers to clients or public routes. Use cryptographically secure UUIDs, ULIDs, or NanoIDs to prevent resource enumeration.
3. **Universal Injection Defense:**
   - **SQL:** Strictly enforce parameterized queries via type-safe ORMs/query builders (e.g., Drizzle, Prisma, Kysely). Manual string concatenation and raw template interpolation are strictly banned.
   - **NoSQL / Document:** Strictly map and type-cast incoming properties field-by-field. Never pass raw request objects into query filters to prevent operator injection.
4. **Mass-Assignment Defense:** Never spread raw request bodies directly into database inserts or updates (`...req.body`). Explicitly pick whitelisted attributes matching the table schema.
5. **Anti-DoS Input Capping:**
   - Enforce hard character limits (e.g., 64–72 characters) on password fields before hashing to neutralize CPU-exhaustion attacks against bcrypt/argon2.
   - Enforce execution timeouts or use pre-vetted standard patterns for regular expressions to prevent catastrophic backtracking (ReDoS).
6. **SSTI & Template Isolation:** Never concatenate user-supplied input into template strings, server renderers, or dynamic evaluators. Pass dynamic values strictly as data parameters.
7. **Storage & Binary File Isolation:**
   - Discard client-provided filenames; rename uploaded assets with server-generated UUIDs.
   - Offload binary transfers using short-lived pre-signed/signed upload URLs rather than streaming large files through application memory.
   - Validate true MIME types via binary magic numbers (file headers), not file extensions. Store uploads outside executable paths.
8. **Dynamic CORS & Transport:** 
   - Never use wildcard (`*`) origins on endpoints that exchange credentials, cookies, or auth headers.
   - Resolve allowed origins dynamically from runtime environment variables.
9. **Cryptographic Entropy:** Prohibit `Math.random()` for any security context. Always utilize the Web Crypto API (`crypto.getRandomValues`, `crypto.randomUUID`) or platform-native cryptographic libraries.

## Actionable Security Workflows
- **Dependency & Secret Leak Auditing:** Trigger `/vibe-audit-security` to run `pnpm audit` and verify `.env` secrecy.
- **HTTP Header Hardening:** Trigger `/vibe-harden-headers` to configure CSP, HSTS, frame options, and dynamic CORS middleware.