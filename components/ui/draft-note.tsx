import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Only render for placeholder content (brief §4.4). */
export function DraftNote({
  children,
  label = "Draft — for Prisca to fill in",
  className,
}: {
  children?: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[14px] border border-dashed border-accent px-5 py-4", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-link">{label}</p>
      {children ? <div className="mt-2 text-[15.5px] leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
