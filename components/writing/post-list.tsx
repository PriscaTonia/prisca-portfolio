"use client";

import * as React from "react";
import Link from "next/link";
import type { Post } from "@/data/types";
import { cn } from "@/lib/utils";

type Row = Post & { dateLabel?: string };

/** Topic filter pills + post rows. */
export function PostList({ posts, topics }: { posts: Row[]; topics: readonly string[] }) {
  const [topic, setTopic] = React.useState<string>("All");
  const shown = topic === "All" ? posts : posts.filter((p) => p.topic === topic);
  const all = ["All", ...topics];

  return (
    <>
      <div role="group" aria-label="Filter writing by topic" className="no-scrollbar -mx-[clamp(20px,5vw,64px)] flex gap-2 overflow-x-auto px-[clamp(20px,5vw,64px)] tab:mx-0 tab:flex-wrap tab:px-0">
        {all.map((t) => {
          const on = t === topic;
          const count = t === "All" ? posts.length : posts.filter((p) => p.topic === t).length;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => setTopic(t)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14.5px] transition-[background-color,border-color,color] duration-300",
                on ? "border-ink bg-ink text-bg" : "border-line-2 text-ink hover:bg-soft"
              )}
            >
              {t}
              <span className={cn("font-mono text-[11.5px]", on ? "text-bg/70" : "text-muted")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {shown.length} {shown.length === 1 ? "post" : "posts"}
        {topic === "All" ? "" : ` in ${topic}`}
      </p>

      <ul className="mt-10 border-t border-ink">
        {shown.map((p) => {
          const meta = [p.dateLabel, p.topic, p.readingTime ? `${p.readingTime} min read` : undefined, p.externalUrl ? "on dev.to" : undefined]
            .filter(Boolean)
            .join(" · ");
          const inner = (
            <>
              <p className="mono-meta">{meta}</p>
              <p className="mt-2 flex items-start justify-between gap-6 text-[clamp(24px,2.8vw,38px)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
                <span className="u-grow-group">{p.title}</span>
                <span aria-hidden className="mt-1 shrink-0 text-[24px] transition-transform duration-300 group-hover:translate-x-1">
                  {p.externalUrl ? "↗" : "→"}
                </span>
              </p>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-muted">{p.description}</p>
            </>
          );
          return (
            <li key={p.slug} className="border-b border-line">
              {p.externalUrl ? (
                <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="group block py-8">
                  {inner}
                  <span className="sr-only"> (opens dev.to in a new tab)</span>
                </a>
              ) : (
                <Link href={`/writing/${p.slug}`} className="group block py-8">
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {shown.length === 0 ? (
        <p className="py-16 text-[17px] text-muted">Nothing in this topic yet.</p>
      ) : null}
    </>
  );
}
