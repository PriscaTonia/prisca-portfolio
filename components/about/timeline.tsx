import type { Role } from "@/data/types";
import { cn } from "@/lib/utils";

const AXIS_START_YEAR = 2022;

const toMonths = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/**
 * Horizontal timeline (brief §7.4): one bar per dated role on a
 * 2022 → current-year axis. Bars are decorative; the label column carries the
 * same information as text.
 */
export function Timeline({ roles, now = new Date() }: { roles: Role[]; now?: Date }) {
  const currentYear = now.getFullYear();
  const axisStart = AXIS_START_YEAR * 12;
  const axisEnd = (currentYear + 1) * 12; // end of the current year
  const span = axisEnd - axisStart;
  const nowMonths = currentYear * 12 + now.getMonth() + 1; // through the current month

  const dated = roles
    .filter((r) => r.start)
    .sort((a, b) => toMonths(a.start!) - toMonths(b.start!));
  const undated = roles.filter((r) => !r.start);
  const years = Array.from({ length: currentYear - AXIS_START_YEAR + 1 }, (_, i) => AXIS_START_YEAR + i);

  const pos = (r: Role) => {
    const s = Math.max(toMonths(r.start!), axisStart);
    const e = r.end === "present" || !r.end ? nowMonths : toMonths(r.end) + 1;
    return { left: ((s - axisStart) / span) * 100, width: (Math.max(e - s, 1) / span) * 100 };
  };

  return (
    <div>
      {/* Sticky key: stays under the header while the bars scroll, and
          releases when the timeline ends (sticky is scoped to this wrapper). */}
      <div className="sticky top-[var(--header-h)] z-10 -mx-[clamp(20px,5vw,64px)] border-b border-line bg-soft px-[clamp(20px,5vw,64px)] pb-3 pt-4">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-2 w-6 rounded-full bg-ink" /> Employment
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-2 w-6 rounded-full bg-ink/40" /> Part-time
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-2 w-6 rounded-full bg-accent" /> Contract / freelance
          </li>
          {undated.length ? (
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-6 rounded-full border border-dashed border-accent" />
              Not drawn (month unknown):{" "}
              {undated.map((u) => `${u.org} (${u.kind === "freelance" ? "freelance" : "contract"}${u.dates ? `, ${u.dates}` : ""})`).join("; ")}
            </li>
          ) : null}
        </ul>
        {/* Year ticks (desktop) */}
        <div aria-hidden className="mt-4 hidden desk:grid desk:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] desk:gap-8">
          <span />
          <div className="relative h-6">
            {years.map((y) => (
              <span
                key={y}
                className="absolute top-0 -translate-x-px border-l border-line-2 pl-2 font-mono text-[11.5px] text-muted"
                style={{ left: `${((y * 12 - axisStart) / span) * 100}%` }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <ol className="divide-y divide-line border-y border-line">
          {dated.map((r) => {
            const { left, width } = pos(r);
            return (
              <li
                key={r.org}
                className="grid gap-2 py-4 desk:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] desk:items-center desk:gap-8"
              >
                <div className="min-w-0">
                  <p className="font-medium text-ink">{r.org}</p>
                  <p className="text-[14px] text-muted">
                    {r.role} · {r.dates}
                    {r.partTime ? " · Part-time" : ""}
                    {r.kind === "contract" ? " · Contract" : r.kind === "freelance" ? " · Freelance" : ""}
                  </p>
                </div>
                <div aria-hidden className="relative h-3 rounded-full bg-bg/60">
                  {/* faint year gridlines */}
                  {years.slice(1).map((y) => (
                    <span
                      key={y}
                      className="absolute inset-y-[-6px] hidden border-l border-line desk:block"
                      style={{ left: `${((y * 12 - axisStart) / span) * 100}%` }}
                    />
                  ))}
                  <span
                    className={cn(
                      "absolute inset-y-0 rounded-full",
                      r.kind !== "employment" ? "bg-accent" : r.partTime ? "bg-ink/40" : "bg-ink"
                    )}
                    style={{ left: `${left}%`, width: `max(${width}%, 8px)` }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
