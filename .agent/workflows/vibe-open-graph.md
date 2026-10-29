---
description: Generate optimized Open Graph preview assets (1200x630), favicons, and social cards
---

# Open Graph & Asset Generation Task

1. **Context Ingestion:**
   - Inspect user arguments passed to the command (e.g., `/vibe-open-graph generate images based on README and UI`).
   - If no arguments are provided, read `README.md`, `package.json`, and the main landing page UI to determine app theme, brand name, primary colors, and tagline.

2. **Asset Generation:**
   - **Open Graph Social Card (1200x630):** Generate an SVG template incorporating brand title, category tag, product illustration/mockup layout, and tagline. Export or convert to high-contrast social image specifications.
   - **Favicon Suite:** Generate `public/icon.svg` (scalable vector), `public/favicon.ico`, and `public/apple-touch-icon.png` (180x180) following the primary visual mark.

3. **HTML Metadata Integration:**
   - Ensure `index.html` (or the root `<head>` component) includes matching Open Graph tags:
     - `og:image` pointing to the generated preview card.
     - `og:image:width` (1200) and `og:image:height` (630).
     - Standard favicon `<link rel="icon">` references.