# Staging Release Records (Ephemeral)

<!-- Staging buffer tracking changes pending release candidate publication -->

## Pending Staging Release: v1.0.0-rc.1

- **Release Date**: Pending
- **Author**: yashasvi9199 <yashasvi9199@gmail.com>
- **Target Platform**: Cloudflare Pages

### Staged Items
- [x] Cloudflare Wrangler configuration (`wrangler.jsonc`, `wrangler.toml`)
- [x] Multi-tier secrets architecture (`.env`, `.dev.vars`, `.env.example`, `.dev.vars.example`)
- [x] Git hygiene with `openspec/`, secrets, and build output exclusions
- [x] Package manager transition to `pnpm` exclusively
- [x] Pre-commit hook validation via Husky (`tsc --noEmit`, `pnpm build`)
- [x] Modularized feature type systems (`src/features/*/`) with strict TypeScript
- [x] Zero-trust runtime input validation via Zod schemas
- [x] Better Comments notation throughout codebase
- [x] India DPDP Act 2023 Statutory Privacy Notice (`/privacy`)
- [x] Binding Terms & Conditions of Service page (`/terms`)
- [x] Mandatory affirmative consent checkbox & notice summary on `LeadCaptureForm.tsx`
- [x] Zod validation enforcing explicit consent before form submission
- [x] Aesthetic, persistent `CookieBanner.tsx` with `localStorage` state
- [x] SQLite / D1 schema migration ledger tracking affirmative consent in `docs/DATABASE.sql`
- [x] Verified studio physical address displayed across desktop and mobile shells
