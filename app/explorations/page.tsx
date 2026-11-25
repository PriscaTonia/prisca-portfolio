import type { Metadata } from "next";
import Link from "next/link";
import { labAreas, labEntries } from "@/data/lab";
import type { LabEntry } from "@/data/types";
import { pad2 } from "@/lib/format";
import { Container } from "@/components/layout/section";
import { Arrow } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Explorations",
  description:
    "The lab: experiments, learning projects and things in progress, separate from client work.",
  alternates: { canonical: "/explorations" },
};

const status: Record<LabEntry["status"], { glyph: string; label: string; cls: string }> = {
  placeholder: { glyph: "○", label: "Placeholder", cls: "border border-dashed border-muted" },
  "in-progress": { glyph: "◐", label: "In progress", cls: "border-[1.5px] border-accent" },
  shipped: { glyph: "●", label: "Shipped", cls: "bg-ink" },
};

const formats: LabEntry["format"][] = ["note", "tool", "repo", "learning-log", "pull-request"];
const formatLabel = (f: string) => f.replace("-", " ");

export default function ExplorationsPage() {
  return (
    <div className="dot-grid">
      <Container className="pb-[clamp(64px,8vw,120px)] pt-[clamp(48px,7vw,104px)]">
        <div className="fade-up">
          <p className="label">Explorations</p>
          <h1 className="t-display mt-5">
            The <span className="serif text-accent">lab.</span>
          </h1>
          <p className="t-lead mt-6 max-w-[46ch] text-muted">
            Experiments, learning projects and things in progress — separate from client work, but made by the same
            curious person. It grows as I do.
          </p>
        </div>

        {/* Legends */}
        <div className="mt-12 flex flex-col gap-4 border-y border-line bg-bg/80 py-5 font-mono text-[12.5px] text-muted desk:flex-row desk:gap-14">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="label text-ink">Status</span>
            {Object.values(status).map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2">
                <span aria-hidden className={cn("size-3 rounded-full", s.cls)} />
                {s.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="label text-ink">Formats</span>
            {formats.map((f, i) => (
              <span key={f}>
                {formatLabel(f)}
                {i < formats.length - 1 ? <span aria-hidden className="ml-3">·</span> : null}
              </span>
            ))}
          </div>
        </div>

        {/* Shelves */}
        <ul className="mt-12 grid gap-5 tab:grid-cols-2">
          {labAreas.map((area, i) => {
            const entries = labEntries.filter((e) => e.area === area.key && e.status !== "placeholder");
            return (
              <li key={area.key} className="flex flex-col rounded-[20px] border border-dashed border-line-2 bg-bg p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[12px] text-muted">{pad2(i + 1)}</span>
                  <span className="font-mono text-[12px] text-muted">
                    {entries.length} {entries.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <h2 className="mt-6 text-[24px] font-medium leading-tight tracking-[-0.025em] text-ink">{area.title}</h2>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{area.blurb}</p>
                <div className="mt-auto pt-6">
                  {entries.length ? (
                    <ul className="space-y-3">
                      {entries.map((e) => (
                        <li key={e.slug} className="rounded-[14px] border border-line bg-bg-2 p-4">
                          <p className="flex items-center gap-2 text-[16px] font-medium text-ink">
                            <span aria-hidden className="text-accent">{status[e.status].glyph}</span>
                            {e.title}
                          </p>
                          <p className="mono-meta mt-1">
                            {formatLabel(e.format)} · {status[e.status].label}
                            {e.started ? ` · ${e.started} – ${e.status === "in-progress" ? "Present" : ""}` : ""}
                          </p>
                          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{e.summary}</p>
                          {e.links?.length ? (
                            <ul className="mt-2 flex flex-wrap gap-3 text-[14px]">
                              {e.links.map((l) => (
                                <li key={l.href}>
                                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-4">
                                    {l.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-mono text-[12.5px] text-muted">
                      <span aria-hidden>○ </span>Nothing published yet
                    </p>
                  )}
                </div>
              </li>
            );
          })}
          <li className="flex min-h-[140px] flex-col items-start justify-center rounded-[20px] border border-dashed border-line-2 bg-bg/60 p-6 tab:col-span-2">
            <p className="serif text-[30px] leading-tight text-muted">+ Whatever comes next.</p>
          </li>
        </ul>

        {/* Entry template */}
        <section aria-labelledby="template-heading" className="mt-[clamp(64px,8vw,112px)]">
          <div className="flex items-baseline justify-between border-t border-ink pt-4">
            <h2 id="template-heading" className="label text-ink">How entries read</h2>
            <p className="label">Template</p>
          </div>
          <div className="mt-8 grid gap-0 overflow-hidden rounded-[20px] border border-line bg-bg-2 desk:grid-cols-[1fr_2fr]">
            <dl className="space-y-4 border-b border-line p-6 font-mono text-[12.5px] desk:border-b-0 desk:border-r">
              {["Area", "Format / status", "Started", "Links"].map((k) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd aria-hidden className="mt-2 h-2 w-2/3 rounded-full bg-line" />
                </div>
              ))}
            </dl>
            <div className="grid gap-6 p-6 tab:grid-cols-3">
              {["What I wanted to learn", "What I made", "What I'd do differently"].map((k) => (
                <div key={k}>
                  <p className="text-[16px] font-medium text-ink">{k}</p>
                  <span aria-hidden className="mt-3 block h-2 w-full rounded-full bg-line" />
                  <span aria-hidden className="mt-2 block h-2 w-4/5 rounded-full bg-line" />
                  <span aria-hidden className="mt-2 block h-2 w-3/5 rounded-full bg-line" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-[clamp(64px,8vw,112px)] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[17px] text-muted">Looking for client and product work?</p>
          <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-[16px] font-medium text-ink">
            See the professional work <Arrow />
          </Link>
        </div>
      </Container>
    </div>
  );
}
