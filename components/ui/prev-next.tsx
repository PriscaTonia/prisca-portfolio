import Link from "next/link";
import { cn } from "@/lib/utils";

type Item = { href: string; title: string; meta?: string };

export function PrevNext({ prev, next, label = "More" }: { prev?: Item; next?: Item; label?: string }) {
  if (!prev && !next) return null;
  const cell = "group flex min-h-[148px] flex-col justify-between gap-6 p-6 transition-colors duration-300 hover:bg-soft tab:p-8";
  return (
    <nav aria-label={label} className="grid overflow-hidden rounded-[20px] border border-line tab:grid-cols-2">
      {prev ? (
        <Link href={prev.href} rel="prev" className={cell}>
          <span className="label">
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>{" "}
            Previous
          </span>
          <span>
            <span className="block text-[clamp(24px,2.6vw,34px)] font-medium leading-tight tracking-[-0.03em] text-ink">
              {prev.title}
            </span>
            {prev.meta ? <span className="mt-1 block text-[15px] text-muted">{prev.meta}</span> : null}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden tab:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          rel="next"
          className={cn(cell, "border-t border-line text-right tab:border-l tab:border-t-0")}
        >
          <span className="label">
            Next{" "}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          <span>
            <span className="block text-[clamp(24px,2.6vw,34px)] font-medium leading-tight tracking-[-0.03em] text-ink">
              {next.title}
            </span>
            {next.meta ? <span className="mt-1 block text-[15px] text-muted">{next.meta}</span> : null}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
