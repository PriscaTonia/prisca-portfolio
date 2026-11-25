# Content review — prisca.dev redesign

Prisca's to-do list for content. This is v0.2 (after Checkpoint 1 answers) and gets updated each phase.
Legend: ❓ = needs your decision · ✏️ = draft to rewrite · 🖼 = image needed · ✅ = resolved

Sources: the brief's seed facts, [supplied-content.md](docs/redesign/supplied-content.md) (your answers and the **updated CV**), then the repo and live site, then placeholders.

## 1. Inventory

The full mapping is in [docs/redesign/02-mapping.md](docs/redesign/02-mapping.md), and the source inventory is in [docs/redesign/01-audit.md §10](docs/redesign/01-audit.md).
Summary:
- 5 repo projects, all kept and merged with the brief.
- 4 brief/supplied projects added.
- Skills, education, certifications and early experience move to About.
- 2 dev.to posts → Writing.
- CV → About, Contact and footer.
- Horde → Lab.

## 2. Conflicts

| # | Item | Existing value (source) | Brief / supplied value | Decision |
|---|---|---|---|---|
| C1 | CheckRef engagement | Contract, 10/2024 – 09/2025, UK (old CV) | Fusion Intelligence employment (brief + new CV) | ✅ Fusion Intelligence |
| C2 | CheckRef role | "Lead Frontend Engineer" (repo) | Sole Frontend Developer | ✅ Brief |
| C3 | CheckRef maintenance | "Built and maintained…" (repo) | Handed over after deployment | ✅ "maintained" removed |
| C4 | Old CV metrics (85% / 80% / 60% / +50% retention) | Old CV | Not in the new CV | ✅ Dropped |
| C5 | ISeeMemories payment provider | "Paystack" (repo) | Unnamed | ✅ Removed |
| C6 | Stacks | Repo extras (React Hook Form, React Hot Toast, MongoDB, Mongoose) | Brief stacks | ✅ Union of both, minus Paystack |
| C7 | ISeeMemories outcome | "1,00+ users… first few months" (old CV) | "over 1,000 users in its first year" | ✅ Brief / new CV |
| C8 | ISeeMemories title and role | "I See Memories", "Full-stack Engineer" (repo); "Full-Stack Engineer" (new CV) | "ISeeMemories", "Full-Stack Developer" (brief) | Brief applied. ❓ Engineer or Developer? (minor) |
| C9 | FoodEase description | Orders, kitchen, real-time order dashboards (repo) | FoodEase Office only | ✅ Brief + new CV, with the scope note |
| C10 | Contract role titles | "Frontend Engineer" (new CV) | "Frontend Developer (Contract)" (supplied) | Supplied applied. ❓ (minor) |
| C11 | Job title | "Frontend Engineer" (metadata, CVs) | "Software Engineer" | ✅ Brief on the site. The CV PDF is yours to keep as it is. |
| C12 | Degree name | "BEng, Electronic & Computer Engineering" (site) | "B.Eng. in Computer Engineering" (certificate) | ✅ Certificate name |
| C13 | Surf n' Turf identity | `surfnturf` (repo) | "Soft and Tough" (brief) | ✅ The same project: Fusion Intelligence, slug `surfnturf` |
| C14 | Arinze portfolio | One named project (repo) | "Portfolio websites (clients)" (brief) | ✅ It is that entry (the only client portfolio) |
| C15 | Ednaimo dates | Unknown (brief) | Oct – Nov 2026 (supplied) | ✅ Supplied |
| C16 | Tools row | Brief table has no WordPress | New CV lists WordPress | ✅ WordPress added to Tools |

## 3. Missing information

| Page / entry | Field | Status |
|---|---|---|
| Surf n' Turf, FoodEase, CheckRef | dates within Fusion Intelligence | Omitted from the role line (only NMDB has dates) |
| Arinze Obidiegwu portfolio | engagement, dates | Placeholder |
| Horde Budgeting App (Lab) | link | Coming from you |
| `public/Prisca-Resume.pdf` | still the **old** CV | ❓ Drop the new PDF into `public/` (see Checkpoint 2) |
| About | origin story ("Before 2022: how it started") | Visible draft slot. Not written by me. |

## 4. Draft copy (to rewrite)

Written in Phase 5/6 and listed here once written:
- "How I build": four principles, folding in the old Product Delivery and Soft Skills lists ✏️ (you're sceptical, so review closely)
- "Off-screen": three blurbs ✏️
- About "Field notes" ✏️
- One-line experience summaries (Fusion Intelligence, The Pake Group, Bellviv), condensed from the new CV ✏️
- Writing topic assignment for the 2 dev.to posts ✏️
- Image alt text and captions ✏️

## 5. Images needed 🖼

Each slot is a **cover** (supply ≥ 2400×1600; keep key content in the central ~2000×1200) plus an optional **gallery of 3** (~2000px wide, with alt text and a caption).

| Project | Existing (Cloudinary) | Needed |
|---|---|---|
| ISeeMemories | 26 | Pick 1 cover + 3 gallery (full case study). I propose picks; you confirm. |
| FoodEase | 13 | Pick 1 cover (+3). Check the screenshots show only FoodEase Office and no real customer data. |
| CheckRef | 50+ | Pick 1 cover (+3). Check for real candidate or referee data. |
| Surf n' Turf | 10 | Pick 1 cover |
| Arinze portfolio | 26 | Pick 1 cover |
| NMDB | **none** | 1 cover (+3 recommended) |
| Ednaimo | **none** | 1 cover (+3 recommended). No identifiable children's data. |
| ORIPA | **none** | 1 cover |
| Sedic Group | **none** | 1 cover |
| About | `prisca.JPG` | ✅ Used on About |

## 6. Removed or relocated

| Item | Where it went | Status |
|---|---|---|
| Old hero copy and section headers | Replaced by the brief's copy | Relocated: no longer shown |
| "Schedule Call" button | Removed | ✅ Your decision; can come back later |
| "Product Delivery" and "Soft Skills" lists | Folded into "How I build" | ✅ Your decision |
| Unused `public/projects/*.svg` and starter SVGs | — | Proposed deletion (Checkpoint 2) |
