---
description: Scan router tree and regenerate public/sitemap.xml and public/robots.txt
---

# Sitemap & Robots Generation Task

1. Inspect router configuration to extract all public, indexable route paths.
2. Exclude private routes, authenticated dashboards, API paths, and error fallback pages.
3. Generate `public/sitemap.xml` conforming to standard Sitemaps XML protocol with current ISO timestamps.
4. Generate `public/robots.txt` referencing the sitemap URL and blocking restricted directories.
