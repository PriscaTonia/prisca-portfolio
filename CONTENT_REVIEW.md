# Content review — prisca.dev redesign

This is your to-do list for content. Version 1.0, at Checkpoint 4.
Legend: ❓ needs your decision · ✏️ draft for you to rewrite · 🖼 image needed · ⚠️ privacy check · ✅ resolved

Sources, in order of precedence:
1. The brief's seed facts and [supplied-content.md](docs/redesign/supplied-content.md) (your answers and the updated CV)
2. The previous site and repo
3. Placeholders

Every record in `data/` carries a `source` marker, and conflicts are kept in each project's `review` field.

---

## 1. Inventory cross-check (old site → new site)

Every item from the audit inventory ([01-audit.md §10](docs/redesign/01-audit.md)), with where it went. **Nothing was dropped without a decision.**

| Old content | New home | Status |
|---|---|---|
| Project: Surf n' Turf | `/work/surfnturf` (additional) | ✅ |
| Project: Checkref | `/work/checkref` (featured) | ✅ |
| Project: FoodEase | `/work/foodease` (featured, home) | ✅ |
| Project: I See Memories | `/work/iseememories` (full case study, home) | ✅ |
| Project: Arinze Obidiegwu portfolio | `/work/caephas-portfolio` (additional) | ✅ |
| Hero copy, taglines, "Let's build something beautiful" | Replaced by the fixed hero copy | ✅ relocated (not shown) |
| Profile photo `prisca.JPG` | About intro | ✅ |
| Profile card: "Software Engineer (Frontend)", Specialty, Focus | About → Field notes; Capabilities "Also" row | ✅ |
| CV download | About intro, Contact, footer (new PDF; old URL redirects) | ✅ |
| LinkedIn, GitHub, email | Footer, Contact, home contact band | ✅ |
| Technical Skills: Frontend Engineering, UI Systems & Styling | About → Capabilities (+ "Also" row) | ✅ |
| Technical Skills: Product Delivery, Soft Skills | About → "How I build" principles | ✅ (your decision) |
| Education + 10 courses | About → 08 Education & early experience | ✅ |
| Certifications: Genesys, HNG (with Drive links) | About → 08, "View certificate" links | ✅ |
| Contact copy, "Send Message" | Replaced by the brief's contact copy; email CTA | ✅ |
| "Schedule Call" | Removed | ✅ (your decision) |
| Blog header "My Tech Journal" | Replaced by "Notes from the work." | ✅ relocated |
| dev.to posts (2) | `/writing`, as real entries linking out | ✅ |
| Metadata, keywords, Twitter `@EbubePrisca` | `app/layout.tsx` (now "Software Engineer") | ✅ |
| OG / Twitter images | Kept; alt text fixed | ✅ |
| Favicons | Kept | ✅ |
| CV: Pake Group projects (Church of Jesus, Pake Purchase, Car Dealership) | Pake Group experience summary (text only) | ✅ (your decision) |
| CV: Hotels.ng, El Academy, Genesys | About → 08 | ✅ |
| CV: Horde Budgeting App | `/explorations` → Personal projects (in progress) | ✅ |
| `/projects/*`, `/blog`, `/Prisca-Resume.pdf`, `/#section` links | Permanent redirects / hash forwarding | ✅ |
| Unused starter SVGs | Deleted | ✅ (your decision) |

## 2. Conflicts (all resolved)

| # | Item | Old value | Used now |
|---|---|---|---|
| C1 | CheckRef engagement | Contract 10/2024–09/2025 (old CV) | Fusion Intelligence (brief + new CV) |
| C2 | CheckRef role | "Lead Frontend Engineer" | Sole Frontend Developer |
| C3 | CheckRef maintenance | "built and maintained" | "built, deployed and handed over" |
| C4 | Old CV metrics (85% / 80% / 60% / +50% retention) | Old CV | Dropped |
| C5 | Payment provider | "Paystack" | Not named |
| C6 | Stacks | Repo vs brief | Union of both, minus Paystack |
| C7 | ISeeMemories users | "1,00+… first few months" | "1,000+ users within its first year" |
| C8 | ISeeMemories role and title | "Full-stack Engineer", "I See Memories" | Full-Stack Engineer, ISeeMemories |
| C9 | FoodEase scope | Orders, kitchen, real-time order dashboards | FoodEase Office only, with a scope note |
| C10 | Contract titles | — | Frontend Engineer |
| C11 | Job title | Frontend Engineer | Software Engineer (the CV PDF is unchanged) |
| C12 | Degree | "Electronic & Computer Engineering" | B.Eng. in Computer Engineering (certificate name) |
| C13 | Soft and Tough | Brief name | Surf n' Turf (same project), Fusion Intelligence |
| C14 | Client portfolios | Generic brief entry | The Arinze Obidiegwu portfolio |
| C15 | Ednaimo dates | Unknown | Oct – Nov 2026 |
| C16 | Tools | — | + WordPress (new CV) |
| C17 | Bellviv metrics | In the CV | ✅ Shown in the Bellviv experience summary (approved) |

## 3. Missing information

| Where | Field | Status |
|---|---|---|
| FoodEase | dates | ✅ Jun 2023 – Present (ongoing) |
| CheckRef | dates | ✅ Duration only: "About 8 months" (no exact dates, on purpose) |
| Surf n' Turf | dates | ✅ Nov – Dec 2025 |
| Arinze Obidiegwu portfolio | engagement, dates | ✅ Freelance, 2025 (listed under the timeline because the month is unknown) |
| Horde Budgeting App | link | ✅ No public link. Shown as personal · in progress · Jun 2024 – Present |
| About → Journey | origin story ("Before 2022") | ⏳ Placeholder kept on purpose until you write it |
| ISeeMemories | storage and preview implementation | ✅ Deliberately not described (not confirmed) |

**Classification (as you specified):** Fusion Intelligence = FoodEase, NMDB, CheckRef, Surf n' Turf · Independent contracts = Ednaimo, ORIPA, Sedic, ISeeMemories · Freelance = Arinze Obidiegwu · Personal = Horde.

## 4. Draft copy (rewrite in your voice)

Each of these shows a dashed **Draft** tag on the page, except where noted.

| Page | Copy | File |
|---|---|---|
| About | Field notes (4 rows) | `data/about.ts` → `fieldNotes` |
| About | "How I build" (4 principles, folding in Product Delivery and Soft Skills). You were sceptical; read this closely. | `data/about.ts` → `principles` |
| About | "What I enjoy working on", "Currently exploring" | `data/about.ts` |
| About | Off-screen: Fashion, Creative projects, Learning | `data/about.ts` → `offScreen` |
| About | Experience one-liners (Fusion Intelligence, Pake Group, Bellviv), condensed from the CV | `data/experience.ts` (no tag) |
| Home | "In short" four columns | `app/page.tsx` → `inShort` (no tag) |
| Explorations | Six shelf blurbs | `data/lab.ts` → `labAreas` (no tag) |
| Writing | Intro lead ("things I've figured out and want to remember…") | `app/writing/page.tsx` (no tag) |
| Writing | Topic for each dev.to post (React Hooks → Development notes; Open source → Lessons) | `data/writing.ts` |
| ISeeMemories | Overview and brief headings and bodies (technical notes are verified facts only) | `data/projects.ts` (no tag) |
| All projects | Subtitles, intros, image alt text and captions | `data/projects.ts` (no tag) |

## 5. Images

**How to add images:** upload to a Cloudinary folder (name the files `cover`, `01`, `02`, `03`), then run `npm run images "Prisca - Portfolio Project Images/<Folder>"` and paste the output into the project.
- **Cover:** ≥ 2400×1600, with key content in the central ~2000×1200. It gets cropped to 2:1, 4:3, 5:4 and 16:10.
- **Gallery:** up to 10 images, ~2000px wide, shown uncropped. The first 3 appear on the page and all of them open in the lightbox (“View all N images”).

| Project | Cover | Gallery (3) | Notes |
|---|---|---|---|
| ISeeMemories | ✅ homepage (#1) | ✅ #15 upload · #17 cover options · #16 page overview | Proposed picks; swap any you like |
| FoodEase | ✅ landing page (#1) | ✅ #11, #12 onboarding · #8 landing (inventory/analytics) | 🖼 **No FoodEase Office admin screenshots exist.** That's the work the page describes, so 2–3 admin screens (inventory, ledger, staff) would help a lot. |
| CheckRef | ✅ company dashboard (recruiter-4) | ✅ admin-1 · recruiter-6 · signup | Switched from the marketing page to an app screen (it's certain you built it). Shows your test data. |
| NMDB | ✅ cover | ✅ 03 movie browsing · 06 film profile · 10 people profile | Uploaded by you (Nov 2026) |
| Ednaimo | ✅ cover (landing page) | ✅ 03 children's library · 05 parent overview · 09 teacher assignments | Landing page confirmed as part of the redesign (Prisca). Shows test names (e.g. “Ada Jnr”). |
| Sedic Group | ✅ cover | ✅ 01 about · 03 subsidiaries · 05 gallery | |
| ORIPA | ✅ cover | ✅ 01 mandate · 04 sectors · 06 opportunities | |
| Surf n' Turf | ✅ homepage | optional (10 in Cloudinary) | |
| Arinze portfolio | ✅ homepage | optional (26 in Cloudinary) | |

### ✅ Privacy: images in Cloudinary

With your approval, these were **replaced in Cloudinary** with versions where the phone number, street address and zipcode are pixelated:
- `Iseememories/iseememories-11` (profile)
- `Iseememories/iseememories-20` (checkout, now used in the case study gallery)
- `Iseememories/iseememories-21` (address modal)
- `Checkref/checkref-recruiter-13` (candidate phone)

The original unblurred files are kept locally only, in the session scratchpad. CheckRef screens still show your name and `priscaebube+…` test emails; you've said that's fine.

## 6. Removed or relocated

| Item | Why |
|---|---|
| "Schedule Call" button | Duplicated email; your call to remove for now |
| Old hero and section headings | Replaced by the brief's copy |
| Starter SVGs, old shadcn components, framer-motion, `cloudinary` package | Unused after the redesign |
