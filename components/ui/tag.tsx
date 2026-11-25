import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Mono uppercase label, e.g. section labels "02 — Selected work". */
export function Label({
  as: Tag = "p",
  children,
  className,
  ...props
}: { as?: "p" | "span" | "dt" | "h2" | "h3" | "div"; children: ReactNode; className?: string; id?: string }) {
  return (
    <Tag className={cn("label", className)} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Tag (brief §4.4)
 * - soft:   "Featured", "Current", "Primary"
 * - dashed: "Draft", "Details to come", "Part-time", "Practical · growing"
 */
export function Tag({
  variant = "soft",
  children,
  className,
}: {
  variant?: "soft" | "dashed";
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-[3px] font-mono text-[10.5px] uppercase leading-[1.4] tracking-[0.08em]",
        variant === "soft" && "bg-soft text-link",
        variant === "dashed" && "border border-dashed border-muted text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Neutral pill used for chip rows ("Worked across", stacks, On-this-page). */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-2 px-3.5 py-1.5 text-[14px] leading-tight text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
