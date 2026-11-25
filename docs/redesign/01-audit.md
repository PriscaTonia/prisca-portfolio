# 01 — Repository audit

Branch: `redesign/v2`, created from `main` @ `c7ef2a6` (identical in content to `prisca_dev`). This audit is read-only; no code was changed.
Sources: the repo, the live site https://www.prisca.dev (7 pages, all HTTP 200), the Cloudinary project folders (read-only listing), and `public/Prisca-Resume.pdf`.

## 1. Stack and tooling

| Item | Finding |
|---|---|
| Next.js | **16.0.7** (`^16.0.7`), **App Router** (`app/`) |
| React | 19.2.1 |
| TypeScript | 5, `strict: true`, path alias `@/*` → repo root (no `src/`) |
| Package manager | npm (`package-lock.json`); Node v23.5.0 locally |
| Scripts | `dev`, `build`, `start`, `lint` (`eslint`, flat config using `eslint-config-next` core-web-vitals + typescript). No `typecheck` script (`npx tsc --noEmit` passes). No `test` script. |
| Baseline | `build` ✅, `lint` ✅ (0 issues), `tsc` ✅. The only noise is a `baseline-browser-mapping` "data is over two months old" notice. |
| Deployment | Vercel is implied (`.vercel` in `.gitignore`, no `vercel.json`). |
| Env vars (names only) | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (in `.env.local`; `.env*` is git-ignored) |

**Dependencies:** `next-themes`, `framer-motion` 12, `lucide-react`, `cloudinary` (Node SDK), shadcn-style primitives (`class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `@radix-ui/react-separator`). Dev dependencies: `tailwindcss` 4, `@tailwindcss/postcss`, `tw-animate-css`.

## 2. Structure

```
app/
  layout.tsx            Root layout: fonts, metadata, ThemeProvider, SiteNavbar
  page.tsx              Home (async server component; fetches Cloudinary images for every project)
  blog/page.tsx         "My Tech Journal": fetches dev.to articles (ISR 1h)
  projects/[slug]/page.tsx       Project detail (dynamic, ƒ; Cloudinary Admin API on every request)
  projects/[slug]/not-found.tsx  Project 404
  globals.css           Tailwind v4 + shadcn token set
  favicon/icons, opengraph-image.jpg (+ .alt.txt), twitter-image.jpg (+ .alt.txt)
components/
  common/site-navbar.tsx         Sticky header: wordmark image + 5 hash links + ThemeToggle. No mobile menu (links wrap onto a second row).
  common/theme-toggle.tsx        Icon-only toggle; renders null until mounted; continuous animate-pulse glow
  providers/theme-provider.tsx   next-themes wrapper
  sections/hero-section.tsx      Hero + profile card (photo, title, specialty, focus), CV download, socials
  sections/featured-projects.tsx Grid of identical project cards (framer-motion)
  sections/technical-skills.tsx  4 skill groups as chips
  sections/education-section.tsx Degree + relevant courses
  sections/certifications-section.tsx  2 internship certificates (Drive links)
  sections/contact-section.tsx   3 channel cards + "Send Message" / "Schedule Call" (both mailto)
  projects/project-carousel.tsx  Client carousel for project images
  ui/button|card|badge|separator.tsx  shadcn primitives (cva)
  ui/blog-card.tsx               dev.to article card
data/projects.ts        PortfolioProject[] (5 projects) + types
lib/cloudinary.ts       Admin-API folder listing → ProjectImage[]
lib/types.ts            DevToArticle type
lib/utils.ts            cn()
public/                 Prisca-Resume.pdf, prisca.JPG (profile photo), prisca-wordmark.svg, opengraph-image.jpg,
                        projects/*.svg (6 illustrative SVGs, UNUSED), Next/Vercel starter SVGs (UNUSED)
```

## 3. Styling

- **Tailwind v4** using `@import "tailwindcss"` and `@theme inline` in `app/globals.css`. There is no `tailwind.config`.
- **Tokens** are the shadcn set (`--background`, `--foreground`, `--primary` dusty rose, `--secondary` blush, `--accent` sage green, `--muted`, `--border`…) in OKLCH, plus `--surface-rose` and `--surface-sage`. The dark theme uses a cool "midnight plum" palette at hue 260; the brief asks for a warm one instead.
- **Dark mode** is `@custom-variant dark (&:is(.dark *))` with a `.dark` class on `<html>`.
- **Custom utilities:** `.site-container` (max-w-360 = 1440px, px 4/6/12), `font-grotesk`, `font-inter`.
- **Fonts:** `next/font/google` loads Space Grotesk (`--font-grotesk`, headings) and Inter (`--font-inter`, body). Both get replaced; the mechanism stays.
- The current design uses many gradients, blurs, glows and large rounded cards, all of which the brief excludes.

## 4. Theme

- `next-themes` 0.4.6, `attribute="class"`, **`defaultTheme="light"`** with `enableSystem`, and `disableTransitionOnChange`. The storage key is the default, `theme`.
- `<html suppressHydrationWarning>`. next-themes injects its own no-flash script.
- **Gaps vs the brief:**
  - The default is light, not system.
  - `disableTransitionOnChange` blocks the 0.4s theme transition the brief wants.
  - The toggle's label is generic ("Toggle theme") and it has no text label.
  - The toggle renders nothing before mount, which causes a layout shift.

## 5. Routing

| Route | Type | Notes |
|---|---|---|
| `/` | static (Cloudinary fetched at build) | Sections: `#about` (hero), `#projects`, `#skills`, `#education`, `#certifications`, `#contact` |
| `/blog` | ISR 1h | dev.to feed, then Education, Certifications and Contact repeated |
| `/projects/[slug]` | **dynamic, rendered per request** | No `generateStaticParams`. Calls the Cloudinary Admin API on every visit (rate-limited, slow). |
| `/projects/[slug]` not-found | — | Custom 404 for projects only; no global `not-found.tsx` |

- **Nav:** About (`/#about`), Projects (`/#projects`), Blog (`/blog`), Skills (`/#skills`), Contact (`/#contact`).
- **No** redirects, middleware, sitemap or robots.

## 6. Motion

- `framer-motion` is used for entrance fade/slide on the hero, project cards, skills, education and certifications. There is **no reduced-motion handling**.
- The theme toggle has a continuous `animate-pulse`.
- The hero uses `router.push("/#projects")` buttons instead of links.

## 7. SEO, analytics, integrations

- **Metadata** lives in `app/layout.tsx`:
  - Title default "Prisca Onwudebelu | Frontend Engineer", with the template `"%s | Prisca Onwudebelu "` (trailing space).
  - Description, keywords, canonical (`https://www.prisca.dev`, set on all pages, which is wrong for subpages), Open Graph and Twitter (`creator: @EbubePrisca`).
  - The OG image is a Cloudinary URL, and `app/opengraph-image.jpg` and `app/twitter-image.jpg` also exist.
  - The OG alt text is a placeholder with a typo ("This is the alterantive text…").
- **No per-page metadata.** Project and blog pages inherit the home title and canonical.
- No JSON-LD. No sitemap or robots.
- **Analytics:** none found (no `@vercel/analytics` or GA script).
- **Contact:** no form. All actions are `mailto:priscaebube@gmail.com`; "Schedule Call" is also a mailto, with no booking link.
- **CV download:** `/Prisca-Resume.pdf`, linked from the hero ("Download CV").
- **Blog:** `fetch("https://dev.to/api/articles?username=priscaaa_")` with revalidate 3600. Images are allowed from `media2.dev.to`.
- **Images:**
  - `next.config.ts` allows `res.cloudinary.com` and `media2.dev.to`.
  - Every project image is fetched from Cloudinary by folder prefix (`cloudinaryFolder`). Order is whatever the API returns, which is alphabetical, so `-10` sorts before `-2`.
  - Alt text and captions are generic ("Project screenshot 1" / "Feature showcase 1") because **no image in Cloudinary has context metadata**.

### Cloudinary inventory (`Prisca - Portfolio Project Images/…`)

| Folder | Images | Notes |
|---|---|---|
| Surfnturf | 10 | 3360×~1928 PNG (16:9-ish), 0.3–2.9 MB |
| Checkref | **50+** | The listing hit the 50-item cap. Includes `checkref-*`, `-admin-*`, `-candidate-*`, `-recruiter-*` and login screens. |
| Foodease | 13 | Several are wide crops (3360×1438–1548) |
| Iseememories | 26 | Up to 3.5 MB each |
| Caephas | 26 | Up to 6 MB each |
| NMDB, Ednaimo, ORIPA, Sedic | — | **No folders** |

All are desktop screenshots at about 1.74:1. Nothing has alt text or captions.

## 8. Responsive and known issues

- No mobile menu: the nav wraps onto a second row under the logo.
- No footer and no skip link.
- Contact links open `mailto:` with `target="_blank"`.
- The project page "View Live" falls back to `/` when there is no URL.
- The carousel image is `priority` on every slide.
- The project page canonical points to the homepage.
- Image weights are heavy (up to 6 MB). `next/image` handles resizing, but the Admin API call on every request is the bigger cost.

## 9. Tests

None: no test runner, Playwright or axe.

## 10. Content inventory

### 10.1 Projects (`data/projects.ts`; live site matches)

| Slug | Title | Category | Role (repo) | Live URL | Stack (repo) | Cloudinary |
|---|---|---|---|---|---|---|
| `surfnturf` | Surf n' Turf | B2C E-commerce | Frontend Engineer | https://surfnturfng.com | Next.js, TS, Tailwind, React Query, React Hot Toast | 10 imgs |
| `checkref` | Checkref | B2B SaaS | **Lead** Frontend Engineer | https://checkref.co | Next.js, TS, Tailwind, React Query, React Hook Form | 50+ |
| `foodease` | FoodEase | B2B SaaS | Frontend Engineer | https://food-ease.io | Next.js, TS, Tailwind, Redux Toolkit, React Hook Form, React Hot Toast | 13 |
| `iseememories` | I See Memories | B2C E-commerce | Full-stack Engineer | https://www.iseememoriesng.com | Next.js, TS, Tailwind, React Query, React Hot Toast, Node.js, Express, MongoDB, Mongoose, **Paystack** | 26 |
| `caephas-portfolio` | Portfolio - Arinze Obidiegwu | Personal Branding / Portfolio | Frontend Engineer | https://www.arinzeobidiegwu.com | Next.js, TS, Tailwind | 26 |

Each project also has a `summary`, a `description` (one paragraph) and 5–7 `responsibilities` (see the file). None has dates.

### 10.2 Home and other copy

- **Hero:** pill "Let's build something beautiful"; name; H1 "Crafting elegant digital experiences that feel effortless."; lead about product storytelling and scalable systems; "Building delightful web experiences." / "Product-focused engineer."; "View My Work"; "Download CV"; LinkedIn, GitHub and Email icons.
- **Profile card:** photo `/prisca.JPG`; "Software Engineer (Frontend)"; Specialty "React, Next.js, TypeScript"; Focus "Design Systems & Product UI"; "Helping teams launch intentional, human-centered experiences."; "Get in Touch".
- **Featured Projects header:** "Recently shipped work that balances polish with performance." plus an intro line.
- **Technical Skills**, with the header "Depth in frontend craft with empathy for design and product.":
  - Frontend Engineering: React; Next.js (App Router); TypeScript; JavaScript (ES6+); Responsive Web Design; Component Architecture; State Management; API Integration; Form Validation; Performance Optimization.
  - UI Systems & Styling: Tailwind CSS; Design Systems; Component Libraries; Design Tokens; Theming & Dark Mode; Accessibility (WCAG); Cross-Browser Consistency; Figma-to-Code Workflow.
  - Product Delivery: Agile Collaboration; Feature Scoping; Product Thinking; Performance Audits; SEO Optimization; Analytics Interpretation; Iteration & Feedback Loops; Client Collaboration.
  - Soft Skills: Cross-functional Communication; User-Centered Thinking; Attention to Detail; Problem-Solving Mindset; Design-Developer Collaboration; Feedback Receptiveness; Time Management; Adaptability; Clear Technical Communication.
- **Education**, with the header "Grounded in engineering fundamentals.":
  - BEng, Electronic & Computer Engineering, Nnamdi Azikiwe University, Awka, Anambra State, 2016–2021.
  - 10 relevant courses: Electronics, Digital Logic Design, Computer Architecture, Operating Systems, Computer Networks, Database Systems, Software Engineering, Artificial Intelligence, Computer Vision, Embedded Systems.
- **Certifications & Highlights**, with the header "Continuous learning keeps my practice sharp.":
  - Genesys, Frontend Development (Internship), with a summary and a Drive certificate link.
  - HNG (Hotels.ng), Frontend Development (Internship), with a summary and a Drive certificate link.
- **Contact:**
  - "Let's Connect" / "Ready to build something beautiful?" and an intro line.
  - Email: Priscaebube@gmail.com.
  - LinkedIn: `https://www.linkedin.com/in/prisca-ebube` ("Prisca Onwudebelu").
  - **GitHub: `https://github.com/PriscaTonia`**.
  - "Send Message" and "Schedule Call" (both mailto).
- **Blog:** "My Tech Journal" / "Bite-sized dev stories, lessons, and experiments from my learning journey."
- **Metadata:** description "Frontend Engineer specializing in React, Next.js, and TypeScript…"; keywords; Twitter `@EbubePrisca`.

### 10.3 Blog posts (dev.to, live, real)

1. "React Hooks for Beginners: The Guide I Wish I Had". 8 Dec 2025, 7 min. #react #beginners #javascript. https://dev.to/priscaaa_/react-hooks-for-beginners-the-guide-i-wish-i-had-an1
2. "How to Find Beginner-Friendly Open Source Projects (Without Feeling Overwhelmed)". 27 Nov 2025, 2 min. #opensource #beginners #frontend. https://dev.to/priscaaa_/how-to-find-beginner-friendly-open-source-projects-without-feeling-overwhelmed-21p1

### 10.4 CV (`public/Prisca-Resume.pdf`). Content not shown on the site.

- **Title:** "Frontend Engineer"
- **Profile:** "over 4 years of experience…"
- **Fusion Intelligence**, Frontend Engineer, 06/2023 – Present, Lagos:
  - feature work on a restaurant-management SaaS;
  - an onboarding redesign that cut setup from 3 weeks to 2 days, "*boosting user retention by 50%*";
  - maintenance and performance work;
  - a *sales reporting module*.
- **Checkref (Contract)**, Frontend Engineer, **10/2024 – 09/2025, United Kingdom**:
  - "Led the end-to-end development";
  - "cut manual reference checking time by 85%", "reduced HR costs by 80%";
  - "Improved app load time by 60%".
- **ISeeMemories (Contract)**, Full-Stack Developer, 10/2024 – 12/2024:
  - MVP;
  - worked with the founder;
  - backend APIs for uploads, accounts and orders;
  - "1,00+ users within the first few months" (typo in the CV).
- **The Pake Group**, Frontend Engineer, 09/2023 – 07/2024, Frisco TX:
  - admin panel for the *Church of Jesus* mobile app (scheduling, groups, daily Bible notifications);
  - *Pake Purchase* e-commerce platform;
  - *car dealership* admin dashboard (inventory, listings, FAQs).
- **Hotels.ng**, Frontend Development Intern, 10/2022 – 12/2022: a reputation-management app built in a two-week sprint, using React, with tests.
- **Genesys Tech Hub**, Frontend Development Intern, 06/2020 – 09/2020, Enugu.
- **Skills:** JavaScript, TypeScript, Next.js, HTML & CSS, JIRA, Tailwind, Git/GitHub, Cypress, ES6, React, Node, React Query, Express, Framer Motion, Zustand, Jest.
- **Extra-curricular:** *Horde Budgeting App*, Frontend Developer, personal project, 06/2024 – Present (income/expense tracking, reports, alerts). It has a link icon in the PDF, but the URL isn't recoverable from the text.
- **Education:** B.Eng. Computer Engineering, Nnamdi Azikiwe University, 2016–2021. The site says "Electronic & Computer Engineering".
- **Not in the CV:** Bellviv Professionals, NMDB, Ednaimo, ORIPA, Sedic.

### 10.5 Assets

- `prisca.JPG` (profile photo)
- `prisca-wordmark.svg` (current logo)
- `opengraph-image.jpg` (public/ and app/, plus a Cloudinary copy)
- favicons
- `Prisca-Resume.pdf`
- `public/projects/{commerce,insight,momentum}-{1,2}.svg`: unused starter illustrations
