# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`michaelmelton.dev` — Michael Melton's personal portfolio/blog. Astro (static output), plain hand-written CSS, deployed on Cloudflare Pages.

Michael is a **Lead IT Systems Analyst**. His employer and other private context are in `CLAUDE.local.md` (gitignored, imported below); this repo is public, so none of that goes in committed files. His focus is **post-close discovery** in M&A (working out what is actually in an acquired company's systems once the deal has closed), plus the internal tools and platforms he builds around that work. Get these right in any copy:

- **Never call him an "engineer."** He does not use that label for himself, and it has been removed from the site once already. "IT professional" is his own wording; describing what he does beats applying a title.
- **He does not lead M&A integration.** He does the discovery that feeds it; that is not the same job.
- **It is not "due diligence."** Due diligence happens before a deal closes; his work starts after. Use "discovery."
- **Never name his employer, the internal platform, or the industry in site copy.** Say "acquisition" or "a company that grows by acquisition", not "agency" (it points to his employer's industry).
- **Work write-ups: vague enough to give an attacker nothing, specific enough to show an employer what he can do.** Keep the problem, his approach and role, outcomes, and numbers. Leave out security controls, what connects to what, infrastructure, security-relevant products in his employer's environment (RMM, endpoint protection, backup, identity, firewall; say "our RMM"), internal names and form codes, and internal process detail. General skills and tools (Python, Power BI, D2) are fine. Test: would a coworker be surprised to see it posted publicly? Don't feature AI-assisted development in the discovery platform post.

Keep copy direct, specific, and quantified, and lead with the flagship project, the **M&A discovery platform** (`src/content/projects/ma-recon-tool.md`).

## Commands

Standard Astro scripts (see `package.json`). No test suite — `astro check` is the gate, and `npm run build` runs it first and fails on type errors.

## Architecture

- **Static Astro, no adapter.** `output` is default static; `astro.config.ts` sets `site` and wires integrations. Deploy is Cloudflare Pages (build `npm run build`, output `dist`).
- **One content collection** (`src/content.config.ts`, glob loader): `projects` → `src/content/projects/*.md`. There is no separate blog; project write-ups and case studies live together here, sorted by `publishDate` descending. `summary`/`stack` drive the homepage manifest records, and `featured: true` selects which projects appear on the home page (the full list is `/projects/`). Uses the Astro 5+ content-layer API: `getCollection` and `render(entry)` (from `astro:content`) for `<Content />`; entry slug is `entry.id`.
  - **Draft filtering is per-page**, inline: `getCollection("projects", ({ data }) => (import.meta.env.PROD ? !data.draft : true))`. Drafts show in dev, hidden in production. Repeat this pattern anywhere you list content.
- **Dynamic route** (`projects/[...slug].astro`) must declare a local `type Props = { ... }`. Astro does not infer `Astro.props` from `getStaticPaths` under strict TS, so omitting it makes props `unknown` and the build fails.
- **Reading time**: `minutesRead(project.body)` from `src/utils/reading-time.ts`, called in `projects/[...slug].astro`. It was a remark plugin until Astro 7.3 made Sätteri the default Markdown processor; remark plugins now need `@astrojs/markdown-remark` installed, so it was moved out rather than adding that dependency.
- **Code blocks**: `astro-expressive-code` (if MDX is ever added back, it must be listed before `mdx()` in integrations). Its themes are mapped to the site's `[data-theme]` switch via `themeCssSelector`, and `codeFontFamily` is set to the `--mono` CSS var.

## Design system

The visual direction is locked ("typewritten mono" — warm paper, teal accent, monospace, airy). **All styling lives in `src/styles/global.css` as CSS custom properties + classes — there is no Tailwind or CSS framework.** Match the existing tokens/classes rather than introducing new styling approaches.

- Theme: tokens on `:root`, redefined under `@media (prefers-color-scheme: dark)` and again under `:root[data-theme="dark"|"light"]`. An inline script in `BaseHead.astro` sets `data-theme` before first paint (anti-FOUC); the toggle script in `Base.astro` flips it and persists to `localStorage`.
- Header has two variants via `Header.astro` `variant` prop: `"home"` (big display masthead) and `"compact"` (interior pages). `Base.astro` takes `variant` and passes it through.
- `src/consts.ts` is the single source for site metadata, `NAV_LINKS`, `SOCIALS`, and the homepage `INTRO` copy — edit content there, not in components.

## Writing content

All site copy must sound like Michael, not like generic AI. **Read `WRITING-STYLE.md` before writing or editing any content** (posts, project case studies, About, taglines). Short version: first person and narrative, explain the reasoning behind decisions, be honest about tradeoffs, **no em dashes**, and avoid the usual AI tells (leverage, robust, seamless, delve, "not just X but Y", etc.). His own older write-ups in `src/content/projects/` (`horse-bot-*`, `lorcanalytics-*`, `astro-blog`, `wordpress-blog`) are the reference.

## Gotchas / TODOs

- Older write-ups (`horse-bot-*`, `lorcanalytics-*`, `astro-blog`, `wordpress-blog`) now live in the `projects` collection alongside the case studies. They reference images via `../../assets/*.png` (resolves because `src/content/projects/` sits at the same depth as the old `src/content/blog/`). They predate the new positioning. **Don't change his wording in them.** Mechanical fixes (links, alt text) were made with his OK in Sept 2026.
- **Links in `.astro` files lose the space before them when the `<a>` starts a new line** (`My\n<a>` renders `My<a>`). End the previous line with `{" "}`, which survives Prettier re-wrapping. Markdown content is unaffected.

@CLAUDE.local.md
