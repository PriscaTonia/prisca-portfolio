import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** <dl> grid, 4 / 2 / 1 columns. Renders only fields that have data. */
export function MetaStrip({
  items,
  className,
}: {
  items: { label: string; value?: ReactNode; wide?: boolean }[];
  className?: string;
}) {
  const shown = items.filter((i) => i.value !== undefined && i.value !== null && i.value !== "");
  if (!shown.length) return null;
  return (
    <dl className={cn("grid gap-x-8 gap-y-6 border-t border-line pt-6 tab:grid-cols-2 desk:grid-cols-4", className)}>
      {shown.map((i) => (
        <div key={i.label} className={cn("min-w-0", i.wide && "tab:col-span-2 desk:col-span-4")}>
          <dt className="label">{i.label}</dt>
          <dd className="mt-1.5 text-[16px] leading-snug text-ink [overflow-wrap:anywhere]">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
