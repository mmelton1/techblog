# michaelmelton.dev

Personal site of Michael Melton, an IT professional who builds internal tools and platforms.
Built with [Astro](https://astro.build/) (static output), deployed on Cloudflare Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check (types) + build to ./dist
npm run preview  # serve the built ./dist
```

## Structure

- `src/pages/`: routes for home, `/projects`, `/about`, `404`, and `rss.xml`
- `src/content/projects/`: every project write-up and case study (Markdown)
- `src/components/`, `src/layouts/`: UI
- `src/styles/global.css`: design tokens and all styling (locked "typewritten mono" direction)
- `src/consts.ts`: site metadata, nav links, socials, and the home intro copy

## Adding content

Everything is a project; there is no separate blog. Add a Markdown file to
`src/content/projects/` with frontmatter:

```yaml
---
title: "Project name"
summary: "One-line summary shown in the manifest record and RSS."
stack: ["Python", "PostgreSQL"]
publishDate: 2026-07-01 # required; the list sorts by this, newest first
featured: true # optional; featured projects appear on the home page
draft: false # optional; drafts are hidden in production builds
---
```

Images can be referenced relatively, e.g. `../../assets/foo.png`.

## Deploy

Cloudflare Pages — build command `npm run build`, output directory `dist`, no adapter needed (static). Node 22 is pinned by `.node-version`.
