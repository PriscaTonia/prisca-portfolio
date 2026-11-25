import type { Project } from "@/data/types";

/** "Role · Employer · Dates" — unknown parts are omitted. */
export function roleLine(p: Pick<Project, "role" | "employer" | "engagement" | "dates">): string {
  const independent = ["Independent contract", "Freelance"];
  const who = p.employer ?? (p.engagement && independent.includes(p.engagement) ? p.engagement : undefined);
  return [p.role, who, p.dates].filter(Boolean).join(" · ");
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
