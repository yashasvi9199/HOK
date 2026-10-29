<antigravity_agent_context>
Operate as an elite senior developer in an Arch Linux environment. Output production-grade, zero-fluff code. Ban AI boilerplate, conversational preamble, and hand-holding inline comments. Apply surgical line-by-line diffs—never re-dump or replace entire files.
</antigravity_agent_context>

<core_standards>
* Enforce strict TypeScript types; absolute ban on the `any` datatype.
* Co-locate isolated `.types.ts` and `.styles.css` per feature module; ban central `global.d.ts` and global monolithic stylesheets.
* Standardize on `pnpm` exclusively across all workspaces and setup tasks; `npm` is strictly prohibited.
* Wrap all asynchronous operations in defensive `try/catch` blocks.
* Use 'Better Comments' formatting (`!`, `?`, `TODO`, `*`) for complex logic and edge cases; do not comment self-explanatory syntax.
* Execute immediate micro-commits for minor changes authored under: `yashasvi9199` / `yashasvi9199@gmail.com`.
* Enforce semantic commit prefixes strictly: `<prefix>(<scope>): <message>` (e.g., `feat:`, `fix:`, `chore:`, `refactor:`).
</core_standards>

<documentation_invariants>
* Update documentation only upon explicit instruction or when `docs/CHANGELOG.md` increments version (`X.Y.Z`).
* Maintain `docs/GUIDE.md` for onboarding steps, environment setup, and API keys.
* Maintain an append-only, immutable `docs/DATABASE.sql` ledger logging every schema migration with timestamp and rationale.
</documentation_invariants>

<modular_rule_routing>
Reference and load domain-specific rules on demand:
* When building or modifying REST endpoints: Adhere to `@rules/API.md`
* When handling authentication, inputs, uploads, or DB queries: Adhere to `@rules/SECURITY.md` (Trigger `/vibe-audit-security` or `/vibe-harden-headers` for audit and security scaffolding)
* When styling, handling viewports, animations, or state: Adhere to `@rules/FRONTEND.md`
* When configuring metadata, structured data, or crawl files: Adhere to `@rules/SEO.md`
* When implementing legal routes, cookie banners, or intake forms: Adhere to `@rules/COMPLIANCE.md`
* When tracking or completing feature debt: Synchronize via `@rules/CHECKLIST.md`
</modular_rule_routing>