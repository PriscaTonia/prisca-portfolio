import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { Project } from "@/data/types";
import { getAdjacentProjects, getAllProjects, getProject, getRelatedProjects } from "@/lib/content";
import { cld } from "@/lib/cloudinary";
import { pad2 } from "@/lib/format";
import { projectJsonLd } from "@/lib/seo";
import { Container } from "@/components/layout/section";
import { Button, Arrow } from "@/components/ui/button";
import { Chip, Tag } from "@/components/ui/tag";
import { DraftNote } from "@/components/ui/draft-note";
import { MetaStrip } from "@/components/ui/meta-strip";
import { PrevNext } from "@/components/ui/prev-next";
import { ProjectMedia } from "@/components/projects/project-media";
import { ProjectTile } from "@/components/projects/project-tile";
import { JsonLd } from "@/components/seo/json-ld";
import { Gallery } from "@/components/projects/gallery";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = p.subtitle ? `${p.title}: ${p.subtitle}` : p.title;
  const image = p.cover ? cld(p.cover.src, { w: 1200, h: 630 }) : undefined;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    robots: p.placeholder ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title,
      description: p.summary,
      url: `/work/${p.slug}`,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: p.cover?.alt }] } : {}),
    },
    twitter: { title, description: p.summary, ...(image ? { images: [image] } : {}) },
  };
}

const typeLabel: Record<string, string> = {
  "web-app": "Web applications",
  ecommerce: "E-commerce",
  corporate: "Corporate websites",
  portfolio: "Portfolio websites",
  experiment: "Experiments",
};

/** Numbered section with a sticky mono label (1fr / 3fr). */
function DetailSection({
  id,
  n,
  name,
  children,
  className,
}: {
  id: string;
  n: number;
  name: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={cn("scroll-mt-[calc(var(--header-h)+24px)]", className)}>
      <Container>
        <div className="grid gap-6 border-t border-line pt-8 desk:grid-cols-[1fr_3fr] desk:gap-10">
          <div>
            <h2 id={`${id}-label`} className="label desk:sticky desk:top-[calc(var(--header-h)+28px)]">
              {pad2(n)} — {name}
            </h2>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </section>
  );
}

function sectionsFor(p: Project) {
  const s: { id: string; name: string }[] = [{ id: "overview", name: "Overview" }];
  if (p.requirements) s.push({ id: "brief", name: "The brief" });
  if (p.contributions?.length) s.push({ id: "what-i-did", name: "What I did" });
  if (p.technical?.length) s.push({ id: "technical", name: "Technical notes" });
  else if (p.stack.length) s.push({ id: "stack", name: "Stack" });
  if (p.gallery?.length) s.push({ id: "showcase", name: "Showcase" });
  if (p.outcomes?.length) s.push({ id: "outcome", name: "Outcome" });
  return s;
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const sections = sectionsFor(p);
  const num = (id: string) => sections.findIndex((s) => s.id === id) + 1;
  const related = getRelatedProjects(p);
  const { prev, next } = getAdjacentProjects(p.slug);
  const primaryType = p.types[0];
  const isFull = p.caseStudy === "full";
  const contributionsCols = (p.contributions?.length ?? 0) >= 2;
  // Titles that can't sit beside the intro at display size span the full width.
  const longTitle = p.title.length > 8;

  return (
    <article>
      <JsonLd data={projectJsonLd(p)} />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="container-x pt-8 desk:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <li>
                <Link href="/work" className="hover:text-ink">Work</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/work?type=${primaryType}`} className="hover:text-ink">
                  {typeLabel[primaryType] ?? p.category}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{p.title}</li>
            </ol>
          </nav>
          <Link href="/work" className="group inline-flex items-center gap-1.5 text-[14px] text-ink">
            <Arrow dir="left" /> All projects
          </Link>
        </div>

        <div className="fade-up mt-[clamp(40px,6vw,88px)]">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="label">{p.category}</p>
            {p.featured ? <Tag>Featured</Tag> : null}
            <Tag variant="dashed">{isFull ? "Case study" : "Project summary"}</Tag>
          </div>
          <div
            className={cn(
              "mt-5 grid gap-8",
              longTitle ? "desk:grid-cols-[1fr_1fr]" : "desk:grid-cols-[1.25fr_1fr] desk:items-end desk:gap-14"
            )}
          >
            <div className={cn(longTitle && "desk:col-span-2")}>
              <h1
                className={cn("t-display [overflow-wrap:break-word]", longTitle && "text-[clamp(44px,9.4vw,148px)]")}
              >
                {p.title}
              </h1>
              {p.subtitle ? (
                <p className="serif mt-3 text-[clamp(24px,2.6vw,36px)] leading-tight text-muted">{p.subtitle}</p>
              ) : null}
            </div>
            {p.intro ? <p className={cn("t-lead text-ink/90", longTitle && "desk:col-start-2")}>{p.intro}</p> : null}
          </div>
        </div>

        <MetaStrip
          className="mt-[clamp(40px,5vw,64px)]"
          items={[
            { label: "Role", value: p.role },
            {
              label: "Duration",
              value: p.dates ? (p.duration ? `${p.dates} (${p.duration})` : p.dates) : p.duration,
            },
            {
              label: p.employer ? "Employer" : "Engagement",
              value: p.employer ? `${p.employer} · ${p.engagement ?? "Employment"}` : p.engagement,
            },
            { label: "Scope", value: p.scope },
            { label: "Stack", value: <span className="font-mono text-[13.5px]">{p.stack.join(" · ")}</span>, wide: true },
          ]}
        />

        {p.placeholder ? (
          <DraftNote className="mt-8" label="Details to come">
            This project page is a placeholder. Content and images are still being gathered.
          </DraftNote>
        ) : null}

        {p.url ? (
          <div className="mt-8">
            <Button asChild variant="secondary">
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                Visit {p.urlLabel ?? "the live site"} <Arrow dir="up-right" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        ) : null}
      </header>

      {/* ── Hero image ─────────────────────────────────────── */}
      <div className="container-x mt-[clamp(40px,5vw,72px)]">
        <figure className="rounded-[28px] bg-soft p-[clamp(12px,2.6vw,36px)]">
          <ProjectMedia
            image={p.cover}
            ratio="16/8"
            label={`${p.title} cover`}
            tone={p.tone}
            priority
            zoom={false}
            sizes="(min-width: 1280px) 1180px, 92vw"
          />
          <figcaption className="mono-meta mt-4 px-1">
            {p.cover?.caption ?? `${p.title}: screenshots to come.`}
          </figcaption>
        </figure>
      </div>

      {/* ── On this page (full case studies) ───────────────── */}
      {isFull ? (
        <nav aria-label="On this page" className="container-x mt-10">
          <div className="no-scrollbar -mx-[clamp(20px,5vw,64px)] flex items-center gap-2 overflow-x-auto px-[clamp(20px,5vw,64px)]">
            <span className="label mr-2 shrink-0">On this page</span>
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line-2 px-4 text-[14px] text-ink transition-colors duration-300 hover:bg-soft"
              >
                <span className="font-mono text-[11px] text-muted">{pad2(i + 1)}</span>
                {s.name}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      <div className="mt-[clamp(64px,8vw,120px)] flex flex-col gap-[clamp(64px,8vw,112px)]">
        {/* Overview */}
        <DetailSection id="overview" n={num("overview")} name="Overview">
          <p className={cn("max-w-[24ch]", p.overview ? "t-h2" : "t-h3 max-w-[30ch]")}>
            {p.overview?.heading ?? p.summary}
          </p>
          {p.overview?.body ? <p className="measure mt-6 text-[18px] text-muted">{p.overview.body}</p> : null}
          {p.scopeNote ? (
            <p className="measure mt-8 border-l-2 border-accent py-1 pl-5 text-[16.5px] text-ink">
              <span className="label mb-1 block">Scope</span>
              {p.scopeNote}
            </p>
          ) : null}
        </DetailSection>

        {/* The brief */}
        {p.requirements ? (
          <DetailSection id="brief" n={num("brief")} name="The brief">
            <p className="t-h2 max-w-[24ch]">{p.requirements.heading}</p>
            <p className="measure mt-6 text-[18px] text-muted">{p.requirements.body}</p>
            {p.requirements.steps?.length ? (
              <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3">
                {p.requirements.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line-2 bg-bg-2 px-4 text-[14.5px] text-ink">
                      <span className="font-mono text-[11px] text-link">{pad2(i + 1)}</span>
                      {step}
                    </span>
                    {i < p.requirements!.steps!.length - 1 ? (
                      <span aria-hidden className="text-muted">→</span>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </DetailSection>
        ) : null}

        {/* What I did */}
        {p.contributions?.length ? (
          <DetailSection id="what-i-did" n={num("what-i-did")} name="What I did">
            {contributionsCols ? (
              <div className="grid gap-4 desk:grid-cols-3">
                {p.contributions.map((g, i) => (
                  <div
                    key={g.label}
                    className={cn(
                      "rounded-[20px] border p-6",
                      i === 1 ? "border-transparent bg-soft" : "border-line bg-bg-2"
                    )}
                  >
                    <h3 className="label text-ink">{g.label}</h3>
                    <ul className="mt-4 space-y-3">
                      {g.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[16px] leading-snug text-ink">
                          <span aria-hidden className="text-muted">–</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid gap-x-10 gap-y-4 tab:grid-cols-2">
                {p.contributions[0].items.map((it) => (
                  <li key={it} className="flex gap-3 border-t border-line pt-4 text-[17px] leading-snug text-ink">
                    <span aria-hidden className="text-muted">–</span>
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </DetailSection>
        ) : null}

        {/* Technical notes or stack */}
        {p.technical?.length ? (
          <DetailSection id="technical" n={num("technical")} name="Technical notes">
            <dl className="border-t border-ink">
              {p.technical.map((t) => (
                <div key={t.area} className="grid gap-1 border-b border-line py-5 desk:grid-cols-[1fr_1.4fr_2fr] desk:gap-6">
                  <dt className="font-medium text-ink">{t.area}</dt>
                  <dd className="font-mono text-[13px] text-ink">{t.tools}</dd>
                  <dd className="text-[15.5px] text-muted">{t.note}</dd>
                </div>
              ))}
            </dl>
            {p.draftNote ? <DraftNote className="mt-8">{p.draftNote}</DraftNote> : null}
          </DetailSection>
        ) : p.stack.length ? (
          <DetailSection id="stack" n={num("stack")} name="Stack">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s}>
                  <Chip className="font-mono text-[13px]">{s}</Chip>
                </li>
              ))}
            </ul>
          </DetailSection>
        ) : null}

        {/* Showcase */}
        {p.gallery?.length ? (
          <DetailSection id="showcase" n={num("showcase")} name="Showcase">
            <Gallery images={p.gallery} title={p.title} />
          </DetailSection>
        ) : null}

        {/* Outcome */}
        {p.outcomes?.length ? (
          <DetailSection id="outcome" n={num("outcome")} name="Outcome">
            <div className="rounded-[28px] bg-panel p-[clamp(28px,4vw,56px)] text-panel-ink">
              <dl className="grid gap-10 tab:grid-cols-2">
                {p.outcomes.map((o) => (
                  <div key={o.label} className="flex flex-col-reverse">
                    <dt className="mt-3 max-w-[28ch] text-[16px] text-panel-muted">{o.label}</dt>
                    <dd className="serif text-[clamp(44px,5.6vw,80px)] leading-none text-panel-accent">{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </DetailSection>
        ) : null}

        {/* Format note (summaries) */}
        {!isFull ? (
          <Container>
            <p className="rounded-[14px] border border-line px-5 py-4 text-[15px] text-muted">
              {p.types.includes("corporate")
                ? "Short project page: the right length for a website build."
                : "Project summary: a fuller case study can slot into this same template."}
            </p>
          </Container>
        ) : null}

        {/* Related */}
        {related.length ? (
          <section aria-labelledby="related-heading">
            <Container>
              <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4">
                <h2 id="related-heading" className="label text-ink">Related projects</h2>
                <Link href="/work" className="text-[14.5px] text-link underline underline-offset-4">
                  All work
                </Link>
              </div>
              <ul className="mt-10 grid gap-5 tab:grid-cols-2 desk:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <ProjectTile project={r} variant="card" />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}

        <Container className="pb-[clamp(64px,8vw,120px)]">
          <PrevNext
            label="Project navigation"
            prev={prev && { href: `/work/${prev.slug}`, title: prev.title, meta: prev.category }}
            next={next && { href: `/work/${next.slug}`, title: next.title, meta: next.category }}
          />
        </Container>
      </div>
    </article>
  );
}
