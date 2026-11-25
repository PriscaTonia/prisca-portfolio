# 02 — Content and architecture mapping

Precedence: **brief seed facts and Prisca's supplied facts** ([supplied-content.md](supplied-content.md)) → existing repo/live content → CV → placeholder.
Where the brief and the repo conflict, the brief wins and the old value is kept in a `review` note. Every conflict is listed in [CONTENT_REVIEW.md](../../CONTENT_REVIEW.md).

## 1. Projects: matched against the seed list

| New slug | Title | Match | Tier / home | Source | Notes |
|---|---|---|---|---|---|
| `iseememories` | ISeeMemories | repo `iseememories` ↔ brief | featured · **full case study** · home | merged | Live URL from repo. **Paystack removed.** Title spelling from the brief (repo: "I See Memories"). |
| `foodease` | FoodEase | repo `foodease` ↔ brief | featured · home | merged | Live URL from repo. Scope note: FoodEase Office only. Repo copy about orders and kitchen processing gets replaced. |
| `nmdb` | NMDB — Nigerian Movie Database | brief + supplied | featured · home | brief | No repo entry. Live URL and dates supplied. |
| `ednaimo` | Ednaimo | brief + supplied | featured · home | brief | Dates now Oct–Nov 2026 (supplied). Scope note included. |
| `checkref` | CheckRef | repo `checkref` ↔ brief | featured | merged | Live URL from repo. "Lead" and "maintained" dropped. **Engagement conflicts with the CV** (see Q1). |
| `oripa` | ORIPA | brief + supplied | additional | brief | — |
| `sedic` | Sedic Group | brief + supplied | additional | brief | — |
| `surfnturf` | Surf n' Turf | repo `surfnturf` ↔ brief `soft-and-tough` (confirmed by Prisca) | additional | merged | Slug stays `surfnturf` to keep the URL. Role "Frontend Engineer" comes from the repo; engagement is unknown. |
| `caephas-portfolio` | Arinze Obidiegwu — Portfolio | repo ↔ brief `client-portfolios` | additional | merged | Proposed: this specific project *is* the "client portfolios" entry. Its slug and URL stay. |

Order: featured by `order` 1–5 as listed; additional in reverse date order (Sedic, ORIPA, then the undated ones).

**CV-only work, kept but not as project pages (proposed):**
- The Pake Group items (Church of Jesus admin panel, Pake Purchase, car-dealership dashboard) → a one-line summary on the Pake Group experience entry.
- Horde Budgeting App (personal project) → a Lab entry (`area: personal`, `status: in-progress`). Its link and status need confirming.

## 2. Other content → new home

| Existing item | New home | Field / treatment |
|---|---|---|
| Hero H1, lead and taglines | **Replaced** by the fixed hero copy | Old copy logged under *Relocated* |
| Profile photo `prisca.JPG` | About intro, beside the "Field notes" card *(proposed; the brief has no photo in the hero)* | `about.portrait` |
| "Software Engineer (Frontend)", Specialty and Focus | About "Field notes" (`Home ground: React · Next.js · TypeScript`) | Merged into draft field-notes copy |
| CV download `/Prisca-Resume.pdf` | About intro button, the Contact "Elsewhere" list, and the footer | Kept at the same path |
| Technical Skills (4 groups) | About `#capabilities` | The brief's table is the base. Existing technical extras (Accessibility (WCAG), Design systems, Design tokens, Theming & dark mode, Component libraries, Form validation, Cross-browser consistency, State management, API integration) are added to the **"Also"** row. "Product delivery" and "Soft skills" → see Q7. |
| Education (degree + courses) | About **"08 — Education & early experience"** (new subsection) | Degree, dates and course chips. Degree name conflict logged. |
| Certifications (Genesys, HNG) | Same subsection, as two entries with "View certificate ↗" | Kept with their Drive links. CV internship dates added (HNG 10–12/2022, Genesys 06–09/2020). |
| Internships (CV) | Same subsection, **not** the timeline (which starts in 2022) | — |
| Contact channels | Contact page "Elsewhere", footer and home contact band | GitHub = `https://github.com/PriscaTonia` (from the repo, so no "URL to add" state is needed) |
| "Schedule Call" button | **Proposed removal**: it duplicates "Send Message" (both mailto) | Awaiting decision (Q8) |
| dev.to posts (2) | `/writing` index as **real** entries linking out to dev.to ↗ | Fetched as now (ISR 1h). Topic mapping in a small data file. No placeholder posts are needed because real ones exist. |
| Blog page header copy | Replaced by the brief's "Notes from *the work.*" | Old copy logged |
| Metadata (description, keywords, Twitter `@EbubePrisca`) | `app/layout.tsx`, updated | Title becomes "Software Engineer"; template becomes `%s — Prisca Onwudebelu` |
| OG images | Kept (app file convention) | Alt-text typo fixed |
| `public/projects/*.svg`, starter SVGs | Unused → listed for deletion at Checkpoint 2 | — |

## 3. Experience (new; the repo has none)

| Org | Kind | Dates | Summary source |
|---|---|---|---|
| Fusion Intelligence | employment, current | Jun 2023 – Present | One sentence written from the brief + CV (no unverified metrics) |
| The Pake Group | employment, part-time | Sep 2023 – Jul 2024 | **CV** (admin panel, e-commerce, dealership dashboard), condensed to one line |
| Bellviv Professionals | employment, part-time | Jan 2022 – Dec 2023 | **Placeholder**: nothing in the repo or the CV |
| Sedic Group | contract | Jul – Aug 2026 | → `/work/sedic` |
| ORIPA | contract | May – Jul 2026 | → `/work/oripa` |
| Ednaimo | contract | Oct – Nov 2026 | → `/work/ednaimo` |
| ISeeMemories | contract | Oct – Dec 2024 | → `/work/iseememories` |

## 4. Components: reuse, adapt or replace

| Existing | Decision | Reason |
|---|---|---|
| `providers/theme-provider.tsx` (next-themes) | **Reuse** | Works. Change `defaultTheme` to `system` and drop `disableTransitionOnChange`. Same `theme` storage key and `.dark` class. |
| `common/theme-toggle.tsx` | **Adapt** | Becomes a 44px pill with a text label and an accurate aria-label; render a sized placeholder before mount; remove the pulse. |
| `common/site-navbar.tsx` | **Adapt (rewrite)** | New nav, active state and mobile menu. The wordmark becomes typographic `PRISCA.` (the SVG asset is kept). |
| `ui/button.tsx` (cva) | **Adapt** | Keep the cva pattern; replace the variants with `primary` and `secondary`. |
| `ui/card.tsx`, `ui/badge.tsx`, `ui/separator.tsx` | **Replace** with Tag/Chip/Label and plain markup | The shadcn styling conflicts with the spec. Radix separator can go if unused. |
| `ui/blog-card.tsx` | **Replace** with Writing rows | — |
| `projects/project-carousel.tsx` | **Replace** with the Showcase grid | The spec uses a static 7/5 gallery. |
| `sections/*` | **Replace** with new page sections | Content migrates into data files. |
| `lib/cloudinary.ts` | **Adapt** | Fetch at build time (static), honour an explicit cover and gallery per project instead of "everything in the folder". |
| `lib/utils.ts` `cn()` | **Reuse** | — |
| `framer-motion` | **Proposed: stop using it, then remove the dependency** at Checkpoint 2 | CSS is enough for the fade-ups, and it's ~40 KB of client JS. |

## 5. Route map and redirects

| New route | Replaces | Redirect (permanent, `next.config.ts` `redirects()`) |
|---|---|---|
| `/` | `/` | — |
| `/work`, `/work/[slug]` | `/#projects`, `/projects/[slug]` | `/projects/:slug` → `/work/:slug` |
| `/about` (`#experience`, `#capabilities`) | `/#about`, `/#skills`, `#education`, `#certifications` | Hash links can't be redirected server-side (the browser never sends the hash). **Proposed:** a tiny client script on `/` that sends old hashes to their new pages. |
| `/explorations` | — | — |
| `/writing`, `/writing/[slug]` | `/blog` | `/blog` → `/writing` |
| `/contact` | `/#contact` | (hash, as above) |
| `not-found.tsx` (global) | `projects/[slug]/not-found.tsx` | — |
| `sitemap.ts`, `robots.ts` | — (missing) | New |

There are no dedicated Experience or Skills routes today, so none are needed. Those sections live at `/about#experience` and `/about#capabilities`.
