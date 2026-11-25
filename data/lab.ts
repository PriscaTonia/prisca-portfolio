import type { LabEntry } from "./types";

/** Lab shelves (brief §7.5). Blurbs are draft copy — see CONTENT_REVIEW.md. */
export const labAreas = [
  {
    key: "backend",
    title: "Backend experiments",
    blurb: "APIs, data models and the systems behind the interfaces I build.",
  },
  {
    key: "security",
    title: "Cybersecurity learning",
    blurb: "Notes and exercises from learning how things break, and how to keep them from breaking.",
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
    key: "experiments",
    title: "Technical experiments",
    blurb: "Trying an idea quickly to see how it behaves.",
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
