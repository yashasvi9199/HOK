# House of Kalakaar — Architecture & Onboarding Guide

## Overview
House of Kalakaar is a production-grade digital art atelier and masterclass web application engineered with React 19, TypeScript, Tailwind CSS, and Vite, deployed on Cloudflare Pages.

---

## Onboarding Quickstart

### Prerequisites
- **Node.js**: >= 20.0.0
- **PNPM**: >= 10.0.0 (Mandatory; `npm` is strictly prohibited)
- **Git**: Configured for `yashasvi9199 <yashasvi9199@gmail.com>`

### Local Setup
1. **Clone repository**:
   ```bash
   git clone https://github.com/yashasvi9199/HOK.git
   cd HOK
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Secrets**:
   ```bash
   cp .env.example .env
   cp .dev.vars.example .dev.vars
   ```

4. **Run Local Development Server**:
   ```bash
   pnpm dev
   ```
   Access at `http://localhost:3000`.

---

## Environment Variables Hierarchy

The application dynamically resolves origins using a fallback ternary hierarchy:
`deploy env (VITE_APP_URL) -> dev.vars (DEV_APP_URL) -> localhost:3000`

| Key | Description | Scope | Example |
| :--- | :--- | :--- | :--- |
| `VITE_APP_URL` | Canonical public application URL | Production / Client | `https://hok.pages.dev` |
| `VITE_API_URL` | Base API endpoint URL | Production / Client | `https://hok.pages.dev/api` |
| `DEV_APP_URL` | Local Wrangler dev server host | Local Dev / Edge | `http://localhost:3000` |
| `DEV_API_URL` | Local Wrangler dev API host | Local Dev / Edge | `http://localhost:3000/api` |
| `GEMINI_API_KEY` | Studio AI assistance key | Secret | `your_gemini_api_key_here` |
| `NODE_ENV` | Runtime environment flag | System | `production` / `development` |

---

## Cloudflare Pages & Wrangler Workflows

### Edge Simulation
To simulate the Cloudflare Pages environment locally with Wrangler:
```bash
pnpm build
pnpm pages:dev
```

### Production Deployment
To deploy production distribution artifacts to Cloudflare Pages:
```bash
pnpm deploy
```
*(Requires prior login via `pnpm wrangler login` or setting `CLOUDFLARE_API_TOKEN`)*

---

## Engineering Standards

- **Strict TypeScript**: Ban on `any`. All schemas typed under feature modules (`src/features/*/`).
- **Package Management**: Deterministic builds enforced through `pnpm-lock.yaml`.
- **Pre-commit Quality Checks**: Husky triggers `tsc --noEmit` and production build verification on each git commit.
- **Zero-Trust Input**: Inbound user data verified against Zod schemas before external redirects.
- **Better Comments**: Annotate code with standard tags (`// *`, `// !`, `// ?`, `// TODO:`).
