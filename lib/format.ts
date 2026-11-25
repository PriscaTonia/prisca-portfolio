import type { Project } from "@/data/types";

/** "Role · Employer · Dates" — unknown parts are omitted. */
export function roleLine(p: Pick<Project, "role" | "employer" | "engagement" | "dates">): string {
  const who = p.employer ?? (p.engagement === "Independent contract" ? "Independent contract" : undefined);
  return [p.role, who, p.dates].filter(Boolean).join(" · ");
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
