# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-22

### Added
- Comprehensive DPDP Act 2023 Statutory Privacy Notice page (`/privacy`, `src/views/pages/PrivacyPage.tsx`).
- Tailored Atelier Terms & Conditions of Service page (`/terms`, `src/views/pages/TermsPage.tsx`).
- Mandatory affirmative consent checkbox with pre-consent statutory notice summary on `LeadCaptureForm.tsx`.
- Strict Zod validation enforcing active DPDP consent prior to inquiry processing (`src/features/leads/leads.schema.ts`).
- Floating aesthetic `CookieBanner.tsx` saving non-sensitive visitor preference to `localStorage`.
- Feature-scoped legal module type definitions (`src/features/legal/legal.types.ts`).
- Append-only schema mutation in `docs/DATABASE.sql` logging `dpdp_consent_given`, `dpdp_consent_timestamp`, and `dpdp_notice_version`.
- Desktop and mobile footer integration featuring verified physical studio coordinates and legal links.

## [1.0.0] - 2024-09-22

### Added
- Cloudflare Pages edge deployment support with `wrangler.jsonc` and `wrangler.toml`.
- Multi-tier secrets management with `.env`, `.dev.vars`, `.env.example`, and `.dev.vars.example`.
- Dynamic fallback URL ternary operator for edge and local environments.
- Husky pre-commit hooks enforcing `tsc --noEmit` and build verification.
- Feature-scoped TypeScript definitions (`src/features/artworks/`, `src/features/leads/`, etc.).
- Zero-trust form validation via Zod schemas (`src/features/leads/leads.schema.ts`).
- Documentation architecture: `docs/GUIDE.md`, `docs/RELEASE.md`, `docs/CHANGELOG.md`, `docs/DATABASE.sql`.

### Changed
- Migrated package management exclusively to `pnpm` with deterministic `pnpm-lock.yaml`.
- Upgraded dependencies to modern stable versions.
- Replaced deprecated Vite `__dirname` with `import.meta.dirname`.
- Strengthened `.gitignore` to exclude `openspec/`, secrets, and `.wrangler/` artifacts.
