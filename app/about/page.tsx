import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  aboutParagraphs,
  capabilities,
  enjoy,
  exploring,
  fieldNotes,
  offScreen,
  portrait,
  principles,
} from "@/data/about";
import { contracts, earlyExperience, education, employment, roles } from "@/data/experience";
import { site } from "@/data/site";
import { getProject } from "@/lib/content";
import { pad2 } from "@/lib/format";
import { personJsonLd } from "@/lib/seo";
import { Container, Section } from "@/components/layout/section";
import { Button, Arrow } from "@/components/ui/button";
import { Chip, Tag } from "@/components/ui/tag";
import { DraftNote } from "@/components/ui/draft-note";
import { TextLink } from "@/components/ui/text-link";
import { Timeline } from "@/components/about/timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

// Ongoing roles run to the current month on the timeline.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About",
  description:
    "Prisca Onwudebelu is a Software Engineer with over four years of experience building and improving web applications. Experience, capabilities and a bit about life off-screen.",
  alternates: { canonical: "/about" },
};

const DraftTag = () => <Tag variant="dashed">Draft</Tag>;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* ── Intro ──────────────────────────────────────────── */}
      <Container className="grid gap-12 pb-[clamp(56px,7vw,104px)] pt-[clamp(48px,7vw,104px)] desk:grid-cols-[1.35fr_1fr] desk:gap-16">
        <div className="fade-up flex flex-col">
          <p className="label">About</p>
          <h1 className="t-display mt-5">
            A little <span className="serif text-accent">about me.</span>
          </h1>
          <div className="mt-auto flex flex-wrap gap-3 pt-10">
            <Button asChild>
              <a href={site.cv.href}>
                {site.cv.label} <Arrow dir="down" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="#experience">Experience</Link>
            </Button>
          </div>
        </div>

        <div className="fade-up relative" style={{ ["--delay" as string]: "0.12s" }}>
          <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-[24px] border border-line bg-soft">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority
              sizes="(min-width: 960px) 420px, 90vw"
              className="h-auto w-full"
            />
          </div>
          <div className="relative mx-auto -mt-16 max-w-[380px] rounded-[18px] border border-line bg-bg-2 p-5 shadow-[0_24px_50px_-30px_var(--shadow)] desk:ml-[-48px] desk:mr-auto">
            <div className="flex items-center justify-between gap-3">
              <p className="label">Field notes</p>
              {fieldNotes.draft ? <DraftTag /> : null}
            </div>
            <dl className="mt-3 divide-y divide-line">
              {fieldNotes.rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[110px_1fr] gap-3 py-2.5 text-[15px]">
                  <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{r.label}</dt>
                  <dd className="text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      <Section label="In my words" className="pt-0">
        <div className="measure space-y-6">
          {aboutParagraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "t-lead text-ink" : "text-[18px] leading-relaxed text-muted"}>
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* ── 01 — The journey ───────────────────────────────── */}
      <section aria-labelledby="journey-heading" className="section-y bg-soft">
        <Container>
          <p className="label">01 — The journey</p>
          <div className="mt-5 flex flex-col gap-4 desk:flex-row desk:items-end desk:justify-between">
            <h2 id="journey-heading" className="t-h2">
              How I got <span className="serif text-accent">here.</span>
            </h2>
            <p className="max-w-[44ch] text-[15.5px] text-muted">
              Some of these overlap. That&apos;s real: part-time roles and contracts ran alongside full-time work.
            </p>
          </div>
          <div className="mt-12">
            <Timeline roles={roles} />
          </div>
          <div className="mt-12 grid gap-5 desk:grid-cols-[2fr_1fr] desk:items-center">
            <DraftNote label="Before 2022: draft">
              How it started. This slot is for your origin story, in your words.
            </DraftNote>
            <p className="serif text-[28px] text-ink desk:text-right">Next: still being written.</p>
          </div>
        </Container>
      </section>

      {/* ── 02 — How I build ───────────────────────────────── */}
      <Section label="02 — How I build">
        <div className="flex items-center gap-3">
          <h2 className="t-h2">
            How I <span className="serif">build.</span>
          </h2>
          {principles.draft ? <DraftTag /> : null}
        </div>
        <ol className="mt-10 grid gap-x-10 gap-y-10 tab:grid-cols-2">
          {principles.items.map((p, i) => (
            <li key={p.title} className="border-t border-line pt-5">
              <p className="font-mono text-[12px] text-link">{pad2(i + 1)}</p>
              <h3 className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-ink">{p.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 03 / 04 ────────────────────────────────────────── */}
      <Container className="grid gap-5 pb-[clamp(64px,8vw,120px)] desk:grid-cols-2">
        <section aria-labelledby="enjoy-heading" className="rounded-[24px] border border-line bg-bg-2 p-[clamp(24px,3.5vw,44px)]">
          <div className="flex items-center justify-between gap-3">
            <p className="label">03 — What I enjoy working on</p>
            {enjoy.draft ? <DraftTag /> : null}
          </div>
          <h2 id="enjoy-heading" className="t-h3 mt-6">
            Real users, <span className="serif">real workflows.</span>
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{enjoy.body}</p>
        </section>
        <section aria-labelledby="exploring-heading" className="rounded-[24px] bg-panel p-[clamp(24px,3.5vw,44px)] text-panel-ink">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-panel-muted">04 — Currently exploring</p>
            {exploring.draft ? (
              <span className="rounded-full border border-dashed border-panel-muted px-2.5 py-[3px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-panel-muted">
                Draft
              </span>
            ) : null}
          </div>
          <h2 id="exploring-heading" className="t-h3 mt-6">
            Beyond the <span className="serif text-panel-accent">interface.</span>
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-panel-muted">{exploring.body}</p>
          <Link href="/explorations" className="group mt-6 inline-flex items-center gap-2 font-medium text-panel-ink hover:text-panel-accent">
            See the lab <Arrow />
          </Link>
        </section>
      </Container>

      {/* ── 05 — Off-screen ────────────────────────────────── */}
      <Section label="05 — Off-screen" className="pt-0">
        <div className="flex items-center gap-3">
          <h2 className="t-h2">
            A whole person, <span className="serif text-accent">not a stack.</span>
          </h2>
          {offScreen.draft ? <DraftTag /> : null}
        </div>
        <ul className="mt-10 grid gap-8 desk:grid-cols-3">
          {offScreen.items.map((o) => (
            <li
              key={o.title}
              className={cn(
                "border-t-2 pt-5",
                o.rule === "accent" ? "border-accent" : o.rule === "ink" ? "border-ink" : "border-line-2"
              )}
            >
              <h3 className="text-[22px] font-medium tracking-[-0.02em] text-ink">{o.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-muted">{o.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 06 — Capabilities ──────────────────────────────── */}
      <Section id="capabilities" label="06 — Capabilities" band="bg-2" className="scroll-mt-[var(--header-h)]">
        <h2 className="t-h2">What I work with.</h2>
        <dl className="mt-10 border-t border-ink">
          {capabilities.map((c) => (
            <div key={c.area} className="grid gap-3 border-b border-line py-6 desk:grid-cols-[1fr_2.2fr] desk:gap-10">
              <dt className="flex flex-wrap items-center gap-2.5">
                <span className="label text-ink">{c.area}</span>
                {c.tag ? <Tag variant={c.tag.variant}>{c.tag.text}</Tag> : null}
              </dt>
              <dd
                className={cn(
                  "leading-snug tracking-[-0.02em]",
                  c.tone === "small"
                    ? "text-[17px] leading-relaxed tracking-normal text-muted"
                    : c.tone === "muted"
                      ? "text-[clamp(20px,2vw,27px)] text-muted"
                      : "text-[clamp(20px,2vw,27px)] text-ink"
                )}
              >
                {c.items}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── 07 — Experience ────────────────────────────────── */}
      <Section id="experience" label="07 — Experience" className="scroll-mt-[var(--header-h)]">
        <h2 className="t-h2">
          Where I&apos;ve <span className="serif text-accent">worked.</span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-[16.5px] text-muted">
          Where I worked and what kind of work I did. The project pages cover what I built.
        </p>

        <div className="mt-12 grid gap-14 desk:grid-cols-2 desk:gap-10">
          <div>
            <div className="flex items-baseline justify-between border-t border-ink pt-3">
              <h3 className="label text-ink">Employment</h3>
              <span className="font-mono text-[12px] text-muted">{pad2(employment.length)}</span>
            </div>
            <ul>
              {employment.map((r) => (
                <li key={r.org} className="border-b border-line py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[22px] font-medium tracking-[-0.02em] text-ink">{r.org}</p>
                    <p className="font-mono text-[12.5px] text-muted">{r.dates}</p>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[15.5px] text-ink">
                    {r.role}
                    {r.current ? <Tag>Current</Tag> : null}
                    {r.partTime ? <Tag variant="dashed">Part-time</Tag> : null}
                  </p>
                  {r.summary ? (
                    <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{r.summary}</p>
                  ) : (
                    <DraftNote className="mt-3">One-line summary to add.</DraftNote>
                  )}
                  {r.projectSlugs.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {r.projectSlugs.map((s) => {
                        const p = getProject(s);
                        return p ? (
                          <li key={s}>
                            <Link
                              href={`/work/${s}`}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-2 px-3.5 text-[14px] text-ink transition-colors duration-300 hover:bg-soft"
                            >
                              {p.title} <span aria-hidden className="text-muted">→</span>
                            </Link>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between border-t border-ink pt-3">
              <h3 className="label text-ink">Independent contracts</h3>
              <span className="font-mono text-[12px] text-muted">{pad2(contracts.length)}</span>
            </div>
            <ul>
              {contracts.map((r) => {
                const slug = r.projectSlugs[0];
                const inner = (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-[22px] font-medium tracking-[-0.02em] text-ink">{r.org}</p>
                      <p className="font-mono text-[12.5px] text-muted">{r.dates ?? "Contract"}</p>
                    </div>
                    <p className="mt-1 text-[15.5px] text-muted">
                      {r.role} · Contract{slug ? <span aria-hidden className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1"> →</span> : null}
                    </p>
                  </>
                );
                return (
                  <li key={r.org} className="border-b border-line">
                    {slug ? (
                      <Link href={`/work/${slug}`} className="group -mx-3 block rounded-[12px] px-3 py-6 transition-colors duration-300 hover:bg-soft">
                        {inner}
                      </Link>
                    ) : (
                      <div className="py-6">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── 08 — Education & early experience ──────────────── */}
      <Section id="education" label="08 — Education & early experience" band="soft" className="scroll-mt-[var(--header-h)]">
        <h2 className="t-h2">
          Where it <span className="serif">started.</span>
        </h2>
        <div className="mt-10 grid gap-10 desk:grid-cols-2">
          <div className="rounded-[20px] border border-line bg-bg-2 p-6">
            <p className="label">Education</p>
            <p className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-ink">{education.degree}</p>
            <p className="text-[15.5px] text-muted">
              {education.institution} · {education.dates}
            </p>
            <p className="label mt-6">Relevant courses</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.courses.map((c) => (
                <li key={c}>
                  <Chip className="text-[13.5px]">{c}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <ul className="border-t border-ink">
            {earlyExperience.map((e) => (
              <li key={e.org} className="border-b border-line py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-[19px] font-medium text-ink">{e.org}</p>
                  <p className="font-mono text-[12.5px] text-muted">{e.dates}</p>
                </div>
                <p className="text-[15px] text-ink">{e.role}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{e.summary}</p>
                {e.certificate ? (
                  <p className="mt-2 text-[14.5px]">
                    <TextLink href={e.certificate}>View certificate</TextLink>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
