import Link from "next/link";
import { site } from "@/data/site";
import { getHomeProjects, getPublicProjects } from "@/lib/content";
import { personJsonLd } from "@/lib/seo";
import { Container } from "@/components/layout/section";
import { Button, Arrow } from "@/components/ui/button";
import { Chip } from "@/components/ui/tag";
import { FeaturedLayout } from "@/components/projects/featured-layout";
import { HeroVisual } from "@/components/home/hero-visual";
import { JsonLd } from "@/components/seo/json-ld";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { cn } from "@/lib/utils";

const inShort = [
  {
    title: "Four-plus years",
    line: "Building and improving web applications professionally, across different industries.",
  },
  {
    title: "Platforms and products",
    line: "Business platforms, admin dashboards, customer-facing products and websites.",
  },
  {
    title: "Ownership and teamwork",
    line: "The sole frontend developer when that's the job, part of a cross-functional team when it isn't.",
  },
  {
    title: "Frontend, plus practical backend",
    line: "React and Next.js at the core, with Node.js and Express experience that keeps growing.",
  },
];

const workedAcross = [
  "Business platforms",
  "Admin dashboards",
  "E-commerce",
  "Entertainment",
  "Education",
  "Corporate websites",
];

export default function HomePage() {
  const home = getHomeProjects();
  const all = getPublicProjects();
  const also = all.filter((p) => !home.some((h) => h.slug === p.slug));

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <LegacyHashRedirect />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading">
        <Container className="grid items-center gap-12 pb-[clamp(48px,6vw,88px)] pt-[clamp(40px,6vw,88px)] desk:grid-cols-[1.5fr_1fr]">
          <div className="fade-up">
            <p className="label">Software engineer · Digital product builder</p>
            <h1 id="hero-heading" className="t-hero mt-6">
              Hey, I&apos;m <span className="serif text-accent">Prisca.</span>
            </h1>
            <p className="t-lead mt-7 max-w-[34ch] text-ink/85">
              I build digital products, enjoy solving tricky problems and I&apos;m always{" "}
              <span className="serif">curious</span> about what I can learn next.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#selected-work">
                  Explore my work <Arrow dir="down" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-2.5 text-[15px] text-muted">
              <span aria-hidden className="size-[7px] rounded-full bg-accent" />
              {site.availability}
            </p>
          </div>
          <HeroVisual className="hidden max-w-[440px] tab:block desk:max-w-[560px]" />
        </Container>
      </section>

      {/* ── 01 — In short ──────────────────────────────────── */}
      <section aria-labelledby="in-short-heading" className="border-y border-line bg-bg-2">
        <Container className="py-[clamp(48px,6vw,80px)]">
          <p className="label">01 — In short</p>
          <h2 id="in-short-heading" className="t-h2 mt-5 max-w-[26ch]">
            Over <span className="serif text-accent">four years</span> of building and improving web applications
            across different industries.
          </h2>
          <ul className="mt-12 grid gap-8 tab:grid-cols-2 desk:grid-cols-4 desk:gap-10">
            {inShort.map((i) => (
              <li key={i.title} className="border-t border-line pt-5">
                <p className="font-medium text-ink">{i.title}</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{i.line}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-2.5">
            <p className="label mr-2">Worked across</p>
            {workedAcross.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 02 — Selected work ─────────────────────────────── */}
      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="scroll-mt-[calc(var(--header-h)+16px)] section-y"
      >
        <Container>
          <p className="label">02 — Selected work</p>
          <div className="mt-5 flex flex-col gap-6 desk:flex-row desk:items-end desk:justify-between">
            <div>
              <h2 id="selected-work-heading" className="t-display-2">
                Things I&apos;ve <span className="serif text-accent">built.</span>
              </h2>
              <p className="mt-5 max-w-[46ch] text-[18px] text-muted">
                A few of the products and platforms I&apos;m proudest of. There&apos;s more on the Work page.
              </p>
            </div>
            <Button asChild variant="secondary" className="self-start desk:self-auto">
              <Link href="/work">
                View all projects <Arrow />
              </Link>
            </Button>
          </div>

          <div className="mt-[clamp(48px,6vw,88px)]">
            <FeaturedLayout projects={home} />
          </div>

          {also.length ? (
            <div className="mt-[clamp(72px,9vw,128px)] flex flex-col gap-5 border-b border-t border-b-line border-t-ink py-6 desk:flex-row desk:items-center desk:justify-between">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <p className="label">Also</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {also.map((p, i) => (
                    <li key={p.slug} className="text-[17px]">
                      <Link href={`/work/${p.slug}`} className="u-grow text-ink">
                        {p.title}
                      </Link>
                      {i < also.length - 1 ? <span aria-hidden className="ml-5 text-line-2">/</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/work" className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-ink">
                View all {all.length} projects <Arrow />
              </Link>
            </div>
          ) : null}
        </Container>
      </section>

      {/* ── 03 — Keep reading ──────────────────────────────── */}
      <section aria-labelledby="keep-reading-heading" className="pb-[clamp(64px,8vw,120px)]">
        <Container>
          <h2 id="keep-reading-heading" className="label">
            03 — Keep reading
          </h2>
          <ul className="mt-6 grid gap-4 desk:grid-cols-3">
            {[
              {
                href: "/about",
                eyebrow: "About",
                title: (
                  <>
                    A little <span className="serif">about me.</span>
                  </>
                ),
                text: "How I got here, how I build, where I've worked and what I'm into off-screen.",
                dashed: false,
              },
              {
                href: "/explorations",
                eyebrow: "Explorations",
                title: <span className="serif">The lab</span>,
                text: "Experiments, learning projects and things in progress, separate from client work.",
                dashed: true,
              },
              {
                href: "/writing",
                eyebrow: "Writing",
                title: (
                  <>
                    Notes from <span className="serif">the work.</span>
                  </>
                ),
                text: "Development notes, lessons and reflections. Short and practical.",
                dashed: false,
              },
            ].map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={cn(
                    "group flex h-full min-h-[220px] flex-col justify-between gap-8 rounded-[20px] border p-7 transition-colors duration-300 hover:bg-soft",
                    c.dashed ? "border-dashed border-line-2" : "border-line bg-bg-2 hover:bg-soft"
                  )}
                >
                  <span className="label">{c.eyebrow}</span>
                  <span>
                    <span className="block text-[30px] font-medium leading-tight tracking-[-0.03em] text-ink">
                      {c.title}
                    </span>
                    <span className="mt-3 block text-[15.5px] leading-relaxed text-muted">{c.text}</span>
                    <span aria-hidden className="mt-5 inline-flex text-ink">
                      <Arrow />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 04 — Say hello ─────────────────────────────────── */}
      <section aria-labelledby="contact-band-heading" className="pb-[clamp(64px,8vw,120px)]">
        <Container>
          <div className="rounded-[28px] bg-panel px-[clamp(24px,5vw,72px)] py-[clamp(40px,6vw,88px)] text-panel-ink">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-panel-muted">04 — Say hello</p>
            <h2 id="contact-band-heading" className="t-display-2 mt-6 max-w-[14ch]">
              Have something <span className="serif text-panel-accent">interesting</span> in mind?
            </h2>
            <p className="mt-7 max-w-[56ch] text-[18px] text-panel-muted">
              I&apos;m open to engineering opportunities, contract collaborations and interesting projects. If
              you&apos;d like to work together or just have something worth discussing, I&apos;d love to hear from
              you.
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-10 inline-block text-[clamp(22px,3.4vw,44px)] font-medium tracking-[-0.03em] text-panel-ink underline decoration-panel-accent decoration-2 underline-offset-[0.18em] [overflow-wrap:anywhere] hover:text-panel-accent"
            >
              {site.contact.email}
            </a>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-panel-ink hover:text-panel-accent"
              >
                More ways to reach me <Arrow />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
