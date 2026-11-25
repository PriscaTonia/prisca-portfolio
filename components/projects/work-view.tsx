"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { LabEntry, Project, ProjectType } from "@/data/types";
import { Button, Arrow } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FeaturedLayout } from "./featured-layout";
import { ProjectTile } from "./project-tile";

type FilterKey = "all" | ProjectType;
type Filter = { key: FilterKey; label: string };

type Props = {
  featured: Project[];
  additional: Project[];
  lab: LabEntry[];
  filters: Filter[];
  counts: Record<string, number>;
};

const statusGlyph: Record<LabEntry["status"], string> = {
  placeholder: "○",
  "in-progress": "◐",
  shipped: "●",
};

/** Reads ?type= — must be rendered inside <Suspense>. */
export function WorkViewWithParams(props: Props) {
  const params = useSearchParams();
  const raw = params.get("type") ?? "all";
  const active = (props.filters.some((f) => f.key === raw) ? raw : "all") as FilterKey;
  return <WorkView {...props} active={active} interactive />;
}

export function WorkView({
  featured,
  additional,
  lab,
  filters,
  counts,
  active = "all",
  interactive = false,
}: Props & { active?: FilterKey; interactive?: boolean }) {
  const setFilter = React.useCallback((key: FilterKey) => {
    const url = key === "all" ? "/work" : `/work?type=${key}`;
    // Shallow update: Next.js keeps useSearchParams in sync with history.
    window.history.replaceState(null, "", url);
  }, []);

  const match = (p: Project) => active === "all" || p.types.includes(active as ProjectType);
  const f = featured.filter(match);
  const a = additional.filter(match);
  const showLab = active === "all" || active === "experiment";
  const activeLabel = filters.find((x) => x.key === active)?.label ?? "All work";
  const shown = active === "experiment" ? lab.length : f.length + a.length;
  const noun =
    active === "experiment" ? (shown === 1 ? "experiment" : "experiments") : shown === 1 ? "project" : "projects";
  const empty = active !== "experiment" && f.length + a.length === 0;

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-bg">
        <div className="container-x">
          <div className="flex items-center gap-3 py-3.5">
            <div
              role="group"
              aria-label="Filter work by type"
              className="no-scrollbar -mx-[clamp(20px,5vw,64px)] flex flex-1 gap-2 overflow-x-auto px-[clamp(20px,5vw,64px)] tab:mx-0 tab:flex-wrap tab:overflow-visible tab:px-0"
            >
              {filters.map((fl) => {
                const on = fl.key === active;
                return (
                  <button
                    key={fl.key}
                    type="button"
                    aria-pressed={on}
                    disabled={!interactive}
                    onClick={() => setFilter(fl.key)}
                    className={cn(
                      "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14.5px]",
                      "transition-[background-color,border-color,color] duration-300 disabled:cursor-default",
                      on ? "border-ink bg-ink text-bg" : "border-line-2 text-ink hover:bg-soft"
                    )}
                  >
                    {fl.label}
                    <span className={cn("font-mono text-[11.5px]", on ? "text-bg/70" : "text-muted")}>
                      {counts[fl.key] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
            {active !== "all" ? (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="hidden min-h-11 shrink-0 items-center rounded-full px-3 text-[14.5px] text-link underline underline-offset-4 tab:inline-flex"
              >
                Show all
              </button>
            ) : null}
          </div>
          <p aria-live="polite" className="pb-3 text-[14px] text-muted">
            {active === "all" ? (
              <>Showing all {shown} projects</>
            ) : (
              <>
                Showing {shown} {noun} in {activeLabel} ·{" "}
                <button type="button" onClick={() => setFilter("all")} className="text-link underline underline-offset-4">
                  Back to all work
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="container-x">
        {empty ? (
          <div className="py-28 text-center">
            <p className="t-h2">
              Nothing here <span className="serif">yet.</span>
            </p>
            <Button variant="secondary" className="mt-8" onClick={() => setFilter("all")}>
              Show all work
            </Button>
          </div>
        ) : null}

        {f.length ? (
          <section aria-labelledby="featured-heading" className="pt-[clamp(48px,6vw,88px)]">
            <div className="mb-[clamp(40px,5vw,64px)] flex items-baseline justify-between gap-4 border-t border-ink pt-4">
              <h2 id="featured-heading" className="label text-ink">
                Featured projects
              </h2>
              <p className="label">Detailed write-ups</p>
            </div>
            <FeaturedLayout projects={f} priorityFirst />
          </section>
        ) : null}

        {a.length ? (
          <section aria-labelledby="more-heading" className="pt-[clamp(88px,10vw,150px)]">
            <div className="grid gap-4 border-t border-ink pt-4 desk:grid-cols-[1fr_3fr] desk:gap-10">
              <p className="label text-ink">More client work</p>
              <h2 id="more-heading" className="t-h2 max-w-[18ch]">
                Websites and smaller builds, <span className="serif">each made with care.</span>
              </h2>
            </div>
            <ul className="mt-12 grid gap-5 tab:grid-cols-2 desk:grid-cols-3">
              {a.map((p) => (
                <li key={p.slug}>
                  <ProjectTile project={p} variant="card" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {showLab ? (
          <section aria-labelledby="lab-heading" className="pb-4 pt-[clamp(88px,10vw,150px)]">
            <div className="dot-grid rounded-[24px] border border-dashed border-line-2 p-[clamp(24px,4vw,56px)]">
              <p className="label">Experiments</p>
              <h2 id="lab-heading" className="t-h2 mt-4 max-w-[20ch]">
                Personal experiments live in <span className="serif">the lab.</span>
              </h2>
              {lab.length ? (
                <ul className="mt-8 space-y-3">
                  {lab.map((e) => (
                    <li key={e.slug} className="flex flex-wrap items-baseline gap-x-3 text-[16px]">
                      <span aria-hidden className="text-accent">
                        {statusGlyph[e.status]}
                      </span>
                      <span className="font-medium text-ink">{e.title}</span>
                      <span className="mono-meta">{e.status === "in-progress" ? "In progress" : "Shipped"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 max-w-[56ch] text-muted">
                  Nothing is published there yet. It&apos;s the place for side projects and learning, kept separate
                  from client work.
                </p>
              )}
              <Link
                href="/explorations"
                className="group/btn mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-line-2 bg-bg px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-soft"
              >
                Visit the lab <Arrow />
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
