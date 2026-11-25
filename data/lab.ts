import type { LabEntry } from "./types";

/** Lab shelves (brief §7.5). Four shelves approved by Prisca (Nov 2026). */
export const labAreas = [
  {
    key: "backend",
    title: "Backend experiments",
    blurb: "APIs, data models and the systems behind the interfaces I build.",
  },
  {
    key: "tools",
    title: "Small engineering tools",
    blurb: "Little utilities that make everyday development a bit smoother.",
  },
  {
    key: "oss",
    title: "Open-source contributions",
    blurb: "Pull requests and fixes to projects I use or learn from.",
  },
  {
    key: "personal",
    title: "Personal projects",
    blurb: "Things I build for myself, at my own pace.",
  },
] as const;

/** Do not invent entries. Only real work goes here. */
export const labEntries: LabEntry[] = [
  {
    slug: "horde",
    title: "Horde Budgeting App",
    area: "personal",
    format: "tool",
    status: "in-progress",
    summary:
      "A budgeting app for tracking monthly income, expenses and spending categories, with financial insights, reports and notifications for upcoming bills.",
    started: "Jun 2024",
    links: [],
    source: "existing",
  },
];
