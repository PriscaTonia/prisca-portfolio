import { projects } from "@/data/projects";
import { labEntries } from "@/data/lab";
import type { Project, ProjectType } from "@/data/types";

/** Display order: featured (by `order`), then additional (by `order`). */
const byOrder = (a: Project, b: Project) => a.order - b.order;

export function getAllProjects(): Project[] {
  return [...getFeaturedProjects(), ...getAdditionalProjects()];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort(byOrder);
}

export function getAdditionalProjects(): Project[] {
  return projects.filter((p) => !p.featured).sort(byOrder);
}

/** Curated homepage selection (max 4). */
export function getHomeProjects(): Project[] {
  return getFeaturedProjects()
    .filter((p) => p.showOnHome && !p.placeholder)
    .slice(0, 4);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return getAllProjects().filter((p) => p.types.includes(type));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublicProjects(): Project[] {
  return getAllProjects().filter((p) => !p.placeholder);
}

/** Shared type first, then featured; excludes placeholders and itself. Max 3. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const candidates = getPublicProjects().filter((p) => p.slug !== project.slug);
  const score = (p: Project) =>
    (p.types.some((t) => project.types.includes(t)) ? 2 : 0) + (p.featured ? 1 : 0);
  return [...candidates]
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p);
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}

export const workFilters: { key: "all" | ProjectType; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "web-app", label: "Web applications" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "corporate", label: "Corporate websites" },
  { key: "portfolio", label: "Portfolio websites" },
  { key: "experiment", label: "Experiments" },
];

export function getPublishedLabEntries() {
  return labEntries.filter((e) => e.status !== "placeholder");
}

export function getWorkCounts(): Record<string, number> {
  const all = getPublicProjects();
  const counts: Record<string, number> = { all: all.length };
  for (const f of workFilters) {
    if (f.key === "all") continue;
    counts[f.key] =
      f.key === "experiment"
        ? getPublishedLabEntries().length
        : all.filter((p) => p.types.includes(f.key as ProjectType)).length;
  }
  return counts;
}

export function getWorkStats() {
  const all = getPublicProjects();
  return {
    projects: all.length,
    featured: all.filter((p) => p.featured).length,
    live: all.filter((p) => p.url).length,
  };
}

export { roleLine } from "./format";
