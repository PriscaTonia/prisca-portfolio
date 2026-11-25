# 03 — Implementation plan

Next.js 16 App Router · React 19 · Tailwind v4 · next-themes. Everything stays at the repo root (no `src/`); the `@/*` alias is unchanged.

## 1. Key decisions

| # | Decision | Why |
|---|---|---|
| D1 | **Content lives in `data/`** (the existing folder), split by domain, with selectors in `lib/content.ts`. Components never filter raw arrays. | Follows the current convention. One file per domain keeps "add a project = one object". |
| D2 | **Project images are listed explicitly in the data** (`cover`, `gallery[]`) as Cloudinary delivery URLs, with alt text and captions. The runtime Admin-API folder listing (`lib/cloudinary.ts`) and the `cloudinary` npm package are retired. | Today: random order, generic alt text, an API call on every request (rate-limited), and API secrets needed at build. The brief needs a chosen cover, an ordered gallery and real alt text. **Trade-off:** after uploading to Cloudinary you paste the URL into the project object instead of the folder being picked up automatically. A helper (`cld()`) adds `f_auto,q_auto` and a width cap so 6 MB PNGs aren't served raw. |
| D3 | **All project, work and about pages are static** (`generateStaticParams`, `dynamicParams = false`). `/writing` keeps ISR (1h) for dev.to. `/about` revalidates daily so "ongoing" timeline bars track the current month. | Performance, and the 404 behaviour the brief asks for. |
| D4 | **Theme:** keep next-themes, the `.dark` class and the `theme` storage key. Change `defaultTheme` to `"system"` and remove `disableTransitionOnChange`. Run the 0.4s colour transition on `html, body` and surfaces; disable it under reduced motion. | Reuse; meets the default order (saved → OS → light) with no flash. |
| D5 | **Tokens:** the brief's tokens become CSS variables on `:root` and `.dark` in `globals.css`, mapped into Tailwind with `@theme inline` (`bg-bg`, `bg-bg-2`, `bg-soft`, `text-ink`, `text-muted`, `text-link`, `text-accent`, `border-line`, `border-line-2`, `bg-panel`…). The shadcn token set is removed once nothing references it. | No hex values in components. |
| D6 | **Motion:** CSS only. A `.reveal` fade-up (12px, 0.6s, once) driven by one tiny client `IntersectionObserver` hook. **framer-motion is removed.** | The brief says CSS is enough; this saves ~40 KB of client JS. |
| D7 | **Writing:** dev.to posts are real entries linking out (↗). `data/writing.ts` holds a per-post topic map and any future local posts. `/writing/[slug]` serves local posts only. There are none yet, so it builds with zero pages and the template is shown on `/dev/design`. **No placeholder posts.** | Real content exists; inventing placeholders would be noise. |
| D8 | **Old URLs:** `next.config.ts` `redirects()` handles `/projects/:slug → /work/:slug` and `/blog → /writing` (308). A ~15-line client `LegacyHashRedirect` on `/` maps `#projects → /work`, `#about → /about`, `#skills → /about#capabilities`, `#education`/`#certifications → /about#education`, `#contact → /contact`. | Hashes never reach the server. |
| D9 | **SEO:** the root metadata becomes "Software Engineer" with the template `%s — Prisca Onwudebelu`. Every page exports `metadata`/`generateMetadata` with its canonical URL. Per-project OG uses the cover via a Cloudinary 1200×630 crop, falling back to the site OG. `app/sitemap.ts` and `app/robots.ts` are new and exclude placeholders and `/dev`. JSON-LD `Person` goes on Home and About, `CreativeWork` on projects. | — |
| D10 | `/dev/design` returns `notFound()` in production unless `NEXT_PUBLIC_DESIGN_PAGE=1`, carries `noindex`, and is deleted in Phase 7. | Brief §11 Phase 4. |

## 2. Dependency changes

| Change | Package | Reason |
|---|---|---|
| Remove | `framer-motion` | D6 |
| Remove | `cloudinary` | D2: no runtime Admin API. The env vars become unused; you can leave them in Vercel. |
| Remove | `@radix-ui/react-separator`, `tw-animate-css` | Unused after the rewrite |
| Keep | `next-themes`, `lucide-react` (sun/moon icons only), `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` (Button `asChild`) | Reuse |
| Add | **nothing** | — |

QA (Phase 7) runs Lighthouse via `npx lighthouse` against `next start` without adding a dependency. Accessibility is checked manually plus with Lighthouse, because there's no axe or Playwright tooling.

## 3. Content modules (`data/`)

```
data/
  types.ts         Project, ProjectImage, Role, LabEntry, Post, Provenance, ProjectType (brief §6, + Post.externalUrl)
  projects.ts      9 projects (replaces the current file; same path)
  experience.ts    Role[]: employment + contracts; earlyExperience[] (El Academy, Hotels.ng, Genesys) + education
  capabilities.ts  the 7 capability rows (+ tags)
  about.ts         paragraphs, field notes, principles, off-screen, enjoy/exploring (draft-flagged)
  lab.ts           shelves (6 areas) + entries (Horde: personal, in-progress)
  writing.ts       topics, dev.to topic map, local posts (none yet)
  site.ts          name, url, nav, contact (email, LinkedIn, GitHub, CV path), availability line
lib/
  content.ts       getFeaturedProjects, getHomeProjects, getAdditionalProjects, getProjectsByType,
                   getProject, getRelatedProjects, getAdjacentProjects, getWorkCounts, getLabCounts
  devto.ts         fetch + map dev.to → Post (moved out of app/blog/page.tsx)
  cloudinary.ts    rewritten: cld(url, opts) URL helper only
  seo.ts           pageMetadata() helper, JSON-LD builders
  utils.ts         cn() (unchanged)
```

## 4. Component tree

```
app/layout.tsx  (fonts, ThemeProvider, SkipLink, SiteHeader, <main id="main">, SiteFooter)
components/
  layout/   SiteHeader (server) → NavLinks (client: active state via usePathname), ThemeToggle (client),
            MobileMenu (client); SiteFooter; SkipLink; Container; Section (label column + content)
  ui/       Button (cva: primary|secondary, sizes), TextLink (external ↗ + sr text), Label, Tag (soft|dashed),
            Chip, ImagePlaceholder, DraftNote, MetaStrip, PrevNext, Reveal (client, IntersectionObserver)
  projects/ ProjectTile (wide|split|split-reverse|half|card), ProjectImage (next/image or placeholder),
            FeaturedLayout, FilterBar (client), WorkResults (client: reads ?type=), RoleLine
  home/     Hero, HeroFigure, InShort, SelectedWork, AlsoRow, KeepReading, ContactBand
  about/    FieldNotes, Timeline, Principles, OffScreen, Capabilities, Experience, EducationEarly
  lab/      Shelf, EntryTemplate, StatusLegend
  writing/  PostRow, TopicFilter (client), ArticleBody styles (prose classes in globals.css)
  contact/  CopyEmailButton (client), ElsewhereList
  seo/      JsonLd
  LegacyHashRedirect (client)
```

**Client components:** NavLinks, ThemeToggle, MobileMenu, FilterBar + WorkResults, CopyEmailButton, TopicFilter, Reveal, LegacyHashRedirect. Everything else is a server component.

## 5. Routes and files

| File | Status |
|---|---|
| `app/layout.tsx` | modified: fonts, metadata, shell |
| `app/globals.css` | rewritten: tokens, base, prose, motion, focus |
| `app/page.tsx` | rewritten (Home) |
| `app/work/page.tsx`, `app/work/[slug]/page.tsx` | new |
| `app/about/page.tsx`, `app/explorations/page.tsx`, `app/contact/page.tsx` | new |
| `app/writing/page.tsx`, `app/writing/[slug]/page.tsx` | new |
| `app/not-found.tsx` | new ("Lost?") |
| `app/sitemap.ts`, `app/robots.ts` | new |
| `app/dev/design/page.tsx` | new (temporary) |
| `app/blog/`, `app/projects/` | **deleted** (covered by redirects) |
| `next.config.ts` | `redirects()` added; `images.remotePatterns` kept (cloudinary, dev.to) |
| `components/sections/*`, `components/projects/project-carousel.tsx`, `components/ui/{card,badge,separator,blog-card}.tsx`, `components/common/site-navbar.tsx` | deleted after replacement |
| `components/common/theme-toggle.tsx`, `components/providers/theme-provider.tsx`, `components/ui/button.tsx` | adapted / moved |
| `public/projects/*.svg`, `public/{file,globe,next,vercel,window}.svg` | **deleted** (unused) ❓ |
| `public/Prisca-Resume.pdf` | replaced with your new CV ❓ |
| `data/projects.ts` | rewritten in the new shape |

## 6. Implementation order (commit after each step; build must pass)

1. **Phase 4: design system.** Tokens, fonts, globals, reduced motion, focus; Container/Section; Button, TextLink, Tag/Chip/Label, ImagePlaceholder, DraftNote; header, theme toggle, mobile menu, footer, skip link; `/dev/design`. → ⏸ Checkpoint 3
2. **Phase 5: pages.**
   1. Types and selectors
   2. ProjectTile and FeaturedLayout
   3. Work
   4. Project detail
   5. Home
   6. About
   7. Contact
   8. Explorations
   9. Writing
   10. 404, redirects, sitemap, robots, JSON-LD

   The old pages stay live until their replacements exist.
3. **Phase 6: content.** Full data population, Cloudinary cover/gallery picks (I'll propose them from thumbnails), alt text and captions, finalise `CONTENT_REVIEW.md` with the inventory cross-check. → ⏸ Checkpoint 4
4. **Phase 7: QA.** `07-qa.md`, remove `/dev/design`, Lighthouse.

## 7. Risks

| Risk | Mitigation |
|---|---|
| `useSearchParams` on a static `/work` page needs a Suspense boundary or the build bails out | The filter island is wrapped in `<Suspense>` with the unfiltered list as the fallback, so it renders without JS |
| next-themes toggle label hydration mismatch | Render a fixed-size neutral pill before mount (no layout shift), then the correct label |
| dev.to unavailable at build | Same as today: catch, then render the honest "Nothing published yet" line plus a link to the dev.to profile |
| Tailwind v4 token rename leaves stale shadcn classes | Grep for old token classes before deleting them; the build plus a visual check on `/dev/design` |
| Removing the Admin API changes your image workflow | Documented in D2. ❓ Needs your OK. |
| Timeline "current month" frozen at build | `/about` revalidates every 24h |
| Hero figure and display type at 390px | Hidden under 620px per spec; display sizes use clamp() |
