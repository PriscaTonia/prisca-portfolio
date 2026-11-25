import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getAdditionalProjects,
  getFeaturedProjects,
  getPublishedLabEntries,
  getWorkCounts,
  getWorkStats,
  workFilters,
} from "@/lib/content";
import { WorkView, WorkViewWithParams } from "@/components/projects/work-view";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products, platforms and websites Prisca Onwudebelu has worked on: web applications, e-commerce, corporate and portfolio websites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const featured = getFeaturedProjects().filter((p) => !p.placeholder);
  const additional = getAdditionalProjects();
  const lab = getPublishedLabEntries();
  const counts = getWorkCounts();
  const stats = getWorkStats();
  const props = { featured, additional, lab, filters: workFilters, counts };

  return (
    <>
      <header className="container-x pb-[clamp(40px,5vw,72px)] pt-[clamp(48px,7vw,104px)]">
        <div className="grid items-end gap-10 desk:grid-cols-[1fr_auto]">
          <div className="fade-up">
            <p className="label">Work</p>
            <h1 className="t-display mt-5">
              Things I&apos;ve <span className="serif text-accent">built.</span>
            </h1>
            <p className="t-lead mt-6 max-w-[38ch] text-muted">
              A collection of products, platforms, websites and experiments I&apos;ve worked on.
            </p>
          </div>
          <dl className="hidden grid-cols-3 gap-8 border-t border-line pt-5 tab:grid desk:min-w-[340px]">
            {[
              ["Projects", stats.projects],
              ["Featured", stats.featured],
              ["With live sites", stats.live],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse">
                <dt className="label mt-1">{k}</dt>
                <dd className="serif text-[clamp(44px,4.6vw,64px)] leading-none text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Suspense fallback={<WorkView {...props} />}>
        <WorkViewWithParams {...props} />
      </Suspense>

      <div className="h-[clamp(64px,8vw,120px)]" />
    </>
  );
}
