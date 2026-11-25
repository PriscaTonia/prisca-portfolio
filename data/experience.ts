import type { Role } from "./types";

/**
 * Experience (brief §3.3 + updated CV). Where I worked and what kind of work I
 * did. The project pages cover what I built.
 */
export const roles: Role[] = [
  // ── Employment ───────────────────────────────────────────
  {
    org: "Fusion Intelligence",
    role: "Frontend Engineer",
    dates: "Jun 2023 – Present",
    current: true,
    kind: "employment",
    summary:
      "Frontend work across the company's products: FoodEase Office's admin interfaces, NMDB from research to implementation, and the CheckRef and Surf n' Turf frontends.",
    projectSlugs: ["foodease", "nmdb", "checkref", "surfnturf"],
    start: "2023-06",
    end: "present",
    source: "merged",
  },
  {
    org: "The Pake Group",
    role: "Frontend Engineer",
    dates: "Sep 2023 – Jul 2024",
    kind: "employment",
    partTime: true,
    summary:
      "Worked with other developers on Next.js apps: improved the Church of Jesus admin platform, and built the Pake Purchase e-commerce and Car Dealership admin frontends from scratch.",
    projectSlugs: [],
    start: "2023-09",
    end: "2024-07",
    source: "existing",
  },
  {
    org: "Bellviv Professionals",
    role: "WordPress Developer / Frontend Developer",
    dates: "Jan 2022 – Dec 2023",
    kind: "employment",
    partTime: true,
    summary:
      "Researched, designed and built six WordPress websites from scratch and maintained them. SEO work took website visibility from 0% to 50% and contributed to about 15% growth in website users within six months.",
    projectSlugs: [],
    start: "2022-01",
    end: "2023-12",
    source: "existing",
  },

  // ── Independent contracts & freelance ────────────────────
  {
    org: "Ednaimo",
    role: "Frontend Engineer",
    dates: "Oct – Nov 2026",
    kind: "contract",
    projectSlugs: ["ednaimo"],
    start: "2026-10",
    end: "2026-11",
    source: "brief",
  },
  {
    org: "Sedic Group",
    role: "Frontend Engineer",
    dates: "Jul – Aug 2026",
    kind: "contract",
    projectSlugs: ["sedic"],
    start: "2026-07",
    end: "2026-08",
    source: "brief",
  },
  {
    org: "ORIPA",
    role: "Frontend Engineer",
    dates: "May – Jul 2026",
    kind: "contract",
    projectSlugs: ["oripa"],
    start: "2026-05",
    end: "2026-07",
    source: "brief",
  },
  {
    org: "ISeeMemories",
    role: "Full-Stack Engineer",
    dates: "Oct – Dec 2024",
    kind: "contract",
    projectSlugs: ["iseememories"],
    start: "2024-10",
    end: "2024-12",
    source: "brief",
  },
  {
    org: "Arinze Obidiegwu",
    role: "Frontend Engineer",
    dates: "2025",
    kind: "freelance",
    projectSlugs: ["caephas-portfolio"],
    // Year only: no start/end, so it's listed under the timeline, not drawn as a bar.
    source: "existing",
  },
];

export const employment = roles.filter((r) => r.kind === "employment");
/** Independent work: contracts and freelance projects. */
export const contracts = roles.filter((r) => r.kind !== "employment");

/** Before the timeline (which starts in 2022). From the site + CV. */
export const education = {
  degree: "B.Eng. in Computer Engineering",
  institution: "Nnamdi Azikiwe University, Awka",
  dates: "2016 – 2021",
  courses: [
    "Electronics",
    "Digital Logic Design",
    "Computer Architecture",
    "Operating Systems",
    "Computer Networks",
    "Database Systems",
    "Software Engineering",
    "Artificial Intelligence",
    "Computer Vision",
    "Embedded Systems",
  ],
};

export const earlyExperience: {
  org: string;
  role: string;
  dates: string;
  summary: string;
  certificate?: string;
}[] = [
  {
    org: "Hotels.ng (HNG)",
    role: "Frontend Development Intern",
    dates: "Oct – Dec 2022",
    summary:
      "Built React interfaces for a reputation-management app with a cross-functional team in a two-week sprint, integrating backend data and writing tests.",
    certificate: "https://drive.google.com/file/d/1Ok2gicaT-1OZpjtYSZSvotnEXwfMUXns/view?usp=sharing",
  },
  {
    org: "El Academy",
    role: "Frontend Developer",
    dates: "Feb – Jun 2021",
    summary:
      "Mentored seven students in HTML, CSS, JavaScript and Bootstrap, and developed client websites, including blog platforms, with PHP and Bootstrap.",
  },
  {
    org: "Genesys Tech Hub",
    role: "Frontend Development Intern",
    dates: "Jun – Sep 2020",
    summary:
      "Learned HTML, CSS, JavaScript and React through hands-on projects, collaborating with other developers using Git, GitHub and JIRA.",
    certificate: "https://drive.google.com/file/d/1mC2EqODKYar-2_c0aKxWUV9Vh1DtyI0W/view?usp=sharing",
  },
];
