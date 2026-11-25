import Link from "next/link";
import type { Project } from "@/data/types";
import { roleLine } from "@/lib/format";
import { Arrow } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { ProjectMedia } from "./project-media";

export type TileVariant = "wide" | "split" | "split-reverse" | "half" | "card";

type TileProps = {
  project: Project;
  variant: TileVariant;
  /** 1-based display number for the eyebrow ("01 · Category"). */
  index?: number;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
};

const pad = (n: number) => String(n).padStart(2, "0");
const ctaText = (p: Project) => (p.caseStudy === "full" ? "Read the case study" : "View project");
const href = (p: Project) => `/work/${p.slug}`;

function Eyebrow({ project, index }: { project: Project; index?: number }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
      {index ? <span>{pad(index)} ·</span> : null}
      <span>{project.category}</span>
      {project.placeholder ? <Tag variant="dashed">Details to come</Tag> : null}
    </p>
  );
}

/** Title link stretched over the whole tile so the tile is one click target. */
function TitleLink({
  project,
  className,
  as: H = "h3",
  withSubtitle = false,
}: {
  project: Project;
  className?: string;
  as?: "h2" | "h3";
  withSubtitle?: boolean;
}) {
  return (
    <H className={className}>
      <Link
        href={href(project)}
        className="rounded-sm after:absolute after:inset-0 after:z-[1] after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[22px] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent focus-visible:after:[outline-style:solid]"
      >
        <span className="u-grow-group">{project.title}</span>
        {withSubtitle && project.subtitle ? (
          <span className="serif text-muted"> {project.subtitle}</span>
        ) : null}
      </Link>
    </H>
  );
}

function Meta({ project, className }: { project: Project; className?: string }) {
  const line = roleLine(project);
  return (
    <div className={cn("space-y-1.5", className)}>
      {line ? <p className="text-[14.5px] text-ink">{line}</p> : null}
      <p className="mono-meta">{project.stack.slice(0, 5).join(" · ")}</p>
    </div>
  );
}

function Cta({ project, className }: { project: Project; className?: string }) {
  return (
    <p aria-hidden className={cn("inline-flex items-center gap-2 text-[15px] font-medium text-ink", className)}>
      {ctaText(project)} <Arrow />
    </p>
  );
}

function OutcomeMini({ project }: { project: Project }) {
  const o = project.outcomes?.[0];
  if (!o) return null;
  return (
    <div className="rounded-[14px] border border-line bg-bg-2 px-5 py-4">
      <p className="label">Verified outcome</p>
      <p className="serif mt-1 text-[30px] leading-tight text-accent">{o.value}</p>
      <p className="text-[14.5px] text-muted">{o.label}</p>
    </div>
  );
}

export function ProjectTile({ project, variant, index, priority, headingLevel = "h3" }: TileProps) {
  const label = `${project.title} cover`;

  if (variant === "wide") {
    const o = project.outcomes?.[0];
    return (
      <article className="group relative">
        <div className="rounded-[28px] bg-soft p-[clamp(12px,2.6vw,36px)]">
          <ProjectMedia
            image={project.cover}
            ratio="16/8"
            fit="natural"
            label={label}
            tone={project.tone}
            priority={priority}
            sizes="(min-width: 1280px) 1180px, 92vw"
          />
        </div>
        <div className="mt-8 grid gap-6 desk:grid-cols-[1.05fr_1.35fr_0.9fr] desk:gap-10">
          <div>
            <Eyebrow project={project} index={index} />
            <TitleLink project={project} as={headingLevel} className="t-h3 mt-3" />
            {project.subtitle ? <p className="serif mt-1 text-[22px] leading-snug text-muted">{project.subtitle}</p> : null}
          </div>
          <div className="space-y-4">
            <p className="text-ink/90">{project.summary}</p>
            <Meta project={project} />
          </div>
          <div className="flex flex-col justify-between gap-6 desk:border-l desk:border-line desk:pl-8">
            {o ? (
              <div>
                <p className="serif text-[clamp(40px,4.4vw,60px)] leading-none text-accent">{o.value}</p>
                <p className="mt-2 text-[14.5px] text-muted">{o.label}</p>
              </div>
            ) : null}
            <Cta project={project} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === "split" || variant === "split-reverse") {
    const reverse = variant === "split-reverse";
    return (
      <article
        className={cn(
          "group relative grid items-center gap-8 desk:gap-14",
          reverse ? "desk:grid-cols-[7fr_5fr]" : "desk:grid-cols-[5fr_7fr]"
        )}
      >
        <div className={cn("order-2", reverse ? "desk:order-2" : "desk:order-1")}>
          <Eyebrow project={project} index={index} />
          <TitleLink project={project} as={headingLevel} className="t-h3 mt-3" />
          {project.subtitle ? <p className="serif mt-1 text-[22px] leading-snug text-muted">{project.subtitle}</p> : null}
          <p className="mt-5 text-ink/90">{project.summary}</p>
          {project.outcomes?.length ? (
            <div className="mt-6">
              <OutcomeMini project={project} />
            </div>
          ) : null}
          <Meta project={project} className="mt-6" />
          <Cta project={project} className="mt-6" />
        </div>
        <div className={cn("order-1", reverse ? "desk:order-1" : "desk:order-2")}>
          <ProjectMedia
            image={project.cover}
            ratio="4/3"
            label={label}
            tone={project.tone}
            priority={priority}
            sizes="(min-width: 1280px) 680px, (min-width: 960px) 56vw, 92vw"
          />
        </div>
      </article>
    );
  }

  if (variant === "half") {
    return (
      <article className="group relative">
        <ProjectMedia
          image={project.cover}
          ratio="4/3"
          label={label}
          tone={project.tone}
          sizes="(min-width: 1280px) 580px, (min-width: 960px) 46vw, 92vw"
        />
        <div className="mt-6">
          <Eyebrow project={project} index={index} />
          <TitleLink
            project={project}
            as={headingLevel}
            withSubtitle
            className="mt-3 text-[clamp(26px,2.6vw,34px)] leading-[1.1] tracking-[-0.03em]"
          />
          <p className="mt-4 text-ink/90">{project.summary}</p>
          <Meta project={project} className="mt-5" />
          <Cta project={project} className="mt-5" />
        </div>
      </article>
    );
  }

  // card
  return (
    <article className="group relative flex h-full flex-col rounded-[20px] border border-line bg-bg-2 p-4 transition-[border-color] duration-300 hover:border-line-2">
      <ProjectMedia
        image={project.cover}
        ratio="16/10"
        label={label}
        tone={project.tone}
        inCard
        sizes="(min-width: 1280px) 380px, (min-width: 960px) 30vw, (min-width: 620px) 46vw, 92vw"
      />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{project.category}</span>
          {project.dates ? <span>· {project.dates}</span> : null}
          {project.placeholder ? <Tag variant="dashed">Details to come</Tag> : null}
        </p>
        <TitleLink
          project={project}
          as={headingLevel}
          className="mt-2.5 text-[24px] font-medium leading-[1.15] tracking-[-0.025em]"
        />
        <p className="mt-3 line-clamp-3 text-[15.5px] leading-relaxed text-muted">{project.summary}</p>
        {roleLine({ ...project, dates: undefined }) ? (
          <p className="mt-3 text-[14px] text-ink">{roleLine({ ...project, dates: undefined })}</p>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[14.5px]">
          <span aria-hidden className="inline-flex items-center gap-1.5 font-medium text-ink">
            View project <Arrow />
          </span>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[2] text-link underline decoration-[color-mix(in_srgb,currentColor_35%,transparent)] underline-offset-[0.22em] hover:decoration-current"
            >
              Live site<span aria-hidden> ↗</span>
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
