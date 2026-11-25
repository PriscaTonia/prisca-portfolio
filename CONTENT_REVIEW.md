# Content review — prisca.dev redesign

Prisca's to-do list for content. This is v0.1 (Checkpoint 1) and gets updated each phase.
Legend: ❓ = needs your decision · ✏️ = draft to rewrite · 🖼 = image needed · ✅ = resolved

## 1. Inventory

The full mapping is in [docs/redesign/02-mapping.md](docs/redesign/02-mapping.md), and the source inventory is in [docs/redesign/01-audit.md §10](docs/redesign/01-audit.md).
Summary: 5 repo projects (all kept, merged with the brief), 4 brief/supplied projects added, skills/education/certifications moved to About, 2 dev.to posts → Writing, CV → About, Contact and footer.

## 2. Conflicts

| # | Item | Existing value (source) | Brief / supplied value | Decision taken |
|---|---|---|---|---|
| C1 | CheckRef engagement and dates | **CV:** "Checkref (Contract)", 10/2024 – 09/2025, United Kingdom | Brief: Employment, Fusion Intelligence, no dates | ❓ **Q1.** The brief is used until you answer. |
| C2 | CheckRef role | "Lead Frontend Engineer" (repo); "Led the end-to-end development" (CV) | Sole Frontend Developer | Brief applied |
| C3 | CheckRef maintenance | "Built and maintained…" (repo) | No ongoing maintenance after handover | Brief applied; "maintained" removed |
| C4 | CheckRef metrics | 85% less checking time, 80% lower HR costs, 60% faster load (CV) | None verified | Left out. ❓ Q2: are any verifiable? |
| C5 | ISeeMemories payment provider | "Paystack" in the stack (repo, live) | Don't name the provider | Removed |
| C6 | ISeeMemories stack | + React Hot Toast, MongoDB, Mongoose (repo) | Next.js, TS, Tailwind, React Query, Node.js, Express, REST APIs | ❓ Q3. Brief stack used for now. |
| C7 | ISeeMemories outcome wording | "1,00+ users within the first few months" (CV, typo) | "over 1,000 users within its first year" | Brief applied. You may want to fix the CV. |
| C8 | ISeeMemories title and role | "I See Memories", "Full-stack Engineer" | "ISeeMemories", "Full-Stack Developer" | Brief applied |
| C9 | FoodEase description | Orders, kitchen processing, real-time order dashboards (repo) | FoodEase Office only: admin, inventory, ledgers, reporting, staff, onboarding | Brief applied, with the scope note |
| C10 | FoodEase stack | + React Hook Form, React Hot Toast; no RTK Query (repo) | Next.js, TS, Tailwind, Redux Toolkit, RTK Query | ❓ Q3. Brief stack used for now. |
| C11 | FoodEase metrics | "boosting user retention by 50%"; "sales reporting module" (CV) | Onboarding: about 3 weeks → 2 days (verified) | Only the verified outcome is used. ❓ Q2: retention figure? |
| C12 | CheckRef stack | + React Hook Form (repo) | Next.js, TS, Tailwind, React Query | ❓ Q3 |
| C13 | Ednaimo dates | — | Brief: unknown → **supplied: Oct – Nov 2026** | Supplied value used. ❓ Q9: finished or ongoing? |
| C14 | Job title | "Frontend Engineer" (metadata, CV) / "Software Engineer (Frontend)" (profile card) | "Software Engineer" | Brief applied to the site. The CV PDF is unchanged (yours to update). |
| C15 | Degree name | "BEng, Electronic & Computer Engineering" (site) | "B.Eng. in Computer Engineering" (CV) | Site value kept. ❓ Q10: which is correct? |
| C16 | Surf n' Turf identity | `surfnturf` in the repo | "Soft and Tough" in the brief | ✅ The same project (confirmed). One entry, slug `surfnturf`. |
| C17 | Arinze portfolio vs "Portfolio websites (clients)" | One named project (repo) | A generic group entry (brief) | ❓ Q5. Proposed: the named project *is* that entry. |

## 3. Missing information

| Page / entry | Field | Status |
|---|---|---|
| Surf n' Turf | engagement (employment at Fusion Intelligence, contract or other?), dates | ❓ Q4 |
| Arinze Obidiegwu portfolio | engagement, dates | placeholder |
| FoodEase, CheckRef | dates (within Fusion Intelligence?) | placeholder (omitted from the role line) |
| Bellviv Professionals | one-line summary | placeholder ✏️ |
| ISeeMemories case study | `overview`, `requirements` copy, `technical` notes | Drafted from brief facts in Phase 6 ✏️ |
| Horde Budgeting App (Lab) | link, current status | ❓ Q6 |
| About | origin story ("Before 2022: how it started") | Visible draft slot. Not written by me. |

## 4. Draft copy (to rewrite)

The following get written in Phase 5/6 and are listed here once written:
- "How I build": the four principles ✏️
- "Off-screen": the three blurbs (Fashion · Creative projects · Learning) ✏️
- About "Field notes": Now · Home ground · Growing into · Off-screen ✏️
- Fusion Intelligence and The Pake Group one-line summaries (written from brief + CV facts) ✏️
- Writing topic assignment for the 2 dev.to posts ✏️

## 5. Images needed 🖼

Each slot is a **cover** (supply ≥ 2400×1600; keep key content in the central ~2000×1200) plus an optional **gallery of 3** (~2000px wide, with alt text and a caption).

| Project | Existing (Cloudinary) | Needed |
|---|---|---|
| ISeeMemories | 26 screenshots | Pick 1 cover + 3 gallery (full case study). I'll propose picks; you confirm. |
| FoodEase | 13 | Pick 1 cover (+3 gallery optional). **Check the screenshots show only FoodEase Office screens and no real customer data.** |
| CheckRef | 50+ | Pick 1 cover (+3). Check for real candidate or referee data. |
| Surf n' Turf | 10 | Pick 1 cover |
| Arinze portfolio | 26 | Pick 1 cover |
| NMDB | **none** | 1 cover (+3 gallery recommended, since it's featured) |
| Ednaimo | **none** | 1 cover (+3 recommended). Avoid identifiable children's data. |
| ORIPA | **none** | 1 cover |
| Sedic Group | **none** | 1 cover |
| About | `prisca.JPG` exists | Confirm use (Q11) |

None of the existing images has alt text or a caption yet. I'll draft them; you review.

## 6. Removed or relocated

| Item | Where it went | Status |
|---|---|---|
| Old hero copy ("Crafting elegant digital experiences…", "Let's build something beautiful", taglines) | Replaced by the fixed hero | Relocated: no longer shown |
| Section headers ("Recently shipped work…", "Depth in frontend craft…", "Grounded in engineering fundamentals.", "Continuous learning keeps my practice sharp.", "Ready to build something beautiful?") | Replaced by the brief's headings | Relocated: no longer shown |
| "Schedule Call" button (mailto) | — | ❓ Q8: proposed removal |
| "Product Delivery" and "Soft Skills" skill groups | — | ❓ Q7 |
| Unused `public/projects/*.svg` and starter SVGs | — | Proposed deletion (Checkpoint 2) |
