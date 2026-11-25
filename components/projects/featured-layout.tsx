import type { Project } from "@/data/types";
import { ProjectTile, type TileVariant } from "./project-tile";

type Row =
  | { kind: "single"; variant: TileVariant; item: Project; index: number }
  | { kind: "pair"; items: [Project, Project]; index: number };

/**
 * Automatic rhythm (brief §4.4), so promoting a project needs no layout change:
 * 1. first project → wide
 * 2. then alternate: single split row ↔ half pair
 * 3. singles alternate split / split-reverse
 * 4. a lone leftover where a pair would go becomes a split
 * e.g. 5 projects → wide · split · pair · split-reverse
 */
export function buildRows(projects: Project[]): Row[] {
  const rows: Row[] = [];
  if (!projects.length) return rows;
  rows.push({ kind: "single", variant: "wide", item: projects[0], index: 1 });
  let i = 1;
  let wantSingle = true;
  let singles = 0;
  const nextSplit = (): TileVariant => (singles++ % 2 === 0 ? "split" : "split-reverse");

  while (i < projects.length) {
    const left = projects.length - i;
    if (wantSingle || left < 2) {
      rows.push({ kind: "single", variant: nextSplit(), item: projects[i], index: i + 1 });
      i += 1;
    } else {
      rows.push({ kind: "pair", items: [projects[i], projects[i + 1]], index: i + 1 });
      i += 2;
    }
    wantSingle = !wantSingle;
  }
  return rows;
}

export function FeaturedLayout({
  projects,
  numbered = true,
  priorityFirst = false,
}: {
  projects: Project[];
  numbered?: boolean;
  priorityFirst?: boolean;
}) {
  const rows = buildRows(projects);
  return (
    <div className="flex flex-col gap-[clamp(72px,9vw,140px)]">
      {rows.map((row, r) =>
        row.kind === "single" ? (
          <ProjectTile
            key={row.item.slug}
            project={row.item}
            variant={row.variant}
            index={numbered ? row.index : undefined}
            priority={priorityFirst && r === 0}
          />
        ) : (
          <div key={row.items[0].slug} className="grid gap-[72px] desk:grid-cols-2 desk:gap-12">
            <ProjectTile project={row.items[0]} variant="half" index={numbered ? row.index : undefined} />
            <div className="desk:mt-[120px]">
              <ProjectTile project={row.items[1]} variant="half" index={numbered ? row.index + 1 : undefined} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
