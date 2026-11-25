import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Arrow } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { Chip, Label, Tag } from "@/components/ui/tag";
import { ImagePlaceholder, type Tone } from "@/components/ui/image-placeholder";
import { DraftNote } from "@/components/ui/draft-note";
import { Container, Section } from "@/components/layout/section";

// TEMPORARY (brief Phase 4) — removed in Phase 7.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const tokens = [
  ["--bg", "Page background"],
  ["--bg-2", "Cards, elevated"],
  ["--soft", "Blush bands, hover"],
  ["--accent", "Large text / decor"],
  ["--link", "Links, small accent"],
  ["--ink", "Primary text"],
  ["--muted", "Secondary text"],
  ["--line", "Hairlines"],
  ["--line-2", "Stronger borders"],
  ["--btn", "Primary button"],
  ["--panel", "Dark panels"],
  ["--panel-accent", "Accent on panels"],
  ["--ph", "Placeholder base"],
  ["--tone-1", "Tone 1"],
  ["--tone-2", "Tone 2"],
  ["--tone-3", "Tone 3"],
  ["--tone-4", "Tone 4"],
  ["--tone-5", "Tone 5"],
  ["--tone-6", "Tone 6"],
] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-10">
      <Label className="mb-6">{title}</Label>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_DESIGN_PAGE !== "1") notFound();

  return (
    <>
      <Container className="pb-6 pt-16 desk:pt-24">
        <Label>Dev · temporary · noindex</Label>
        <h1 className="t-display mt-4">
          Design <span className="serif text-accent">system.</span>
        </h1>
        <p className="t-lead mt-6 max-w-[46ch] text-muted">
          Every primitive from Phase 4. Use the theme toggle in the header to check both themes.
        </p>
      </Container>

      <Container>
        <Block title="Colour tokens">
          <ul className="grid grid-cols-2 gap-3 tab:grid-cols-3 desk:grid-cols-5">
            {tokens.map(([name, use]) => (
              <li key={name} className="overflow-hidden rounded-[14px] border border-line bg-bg-2">
                <div className="h-16 border-b border-line" style={{ background: `var(${name})` }} />
                <div className="p-3">
                  <p className="font-mono text-[12px] text-ink">{name}</p>
                  <p className="text-[13px] text-muted">{use}</p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Typography">
          <div className="space-y-8">
            <div>
              <p className="mono-meta mb-2">Hero H1 · clamp(58px, 10vw, 156px) / 500 / .92 / −0.055em</p>
              <p className="t-hero">
                Hey, I&apos;m <span className="serif text-accent">Prisca.</span>
              </p>
            </div>
            <div>
              <p className="mono-meta mb-2">Display 2 · clamp(40px, 6.4vw, 92px)</p>
              <p className="t-display-2">
                Things I&apos;ve <span className="serif text-accent">built.</span>
              </p>
            </div>
            <div>
              <p className="mono-meta mb-2">H2 · clamp(30px, 4vw, 54px)</p>
              <p className="t-h2">
                A whole person, <span className="serif">not a stack.</span>
              </p>
            </div>
            <div>
              <p className="mono-meta mb-2">H3 · clamp(26px, 3vw, 40px)</p>
              <p className="t-h3">ISeeMemories</p>
            </div>
            <div className="measure">
              <p className="mono-meta mb-2">Lead · clamp(19px, 1.9vw, 24px)</p>
              <p className="t-lead">
                I build digital products, enjoy solving tricky problems and I&apos;m always{" "}
                <span className="serif">curious</span> about what I can learn next.
              </p>
            </div>
            <div className="measure">
              <p className="mono-meta mb-2">Body · 17px / 1.6</p>
              <p className="text-muted">
                Most of my professional experience has been in frontend engineering, but I&apos;m also interested in the
                systems behind the interfaces I build. This paragraph contains an{" "}
                <TextLink href="/about">internal link</TextLink> and an{" "}
                <TextLink href="https://www.linkedin.com/in/prisca-ebube/">external link</TextLink>.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <p className="label">Label · 02 — Selected work</p>
              <p className="mono-meta">Mono meta · Next.js · TypeScript · Tailwind CSS</p>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              Explore my work <Arrow dir="down" />
            </Button>
            <Button variant="secondary">Get in touch</Button>
            <Button variant="secondary">
              View all projects <Arrow />
            </Button>
            <Button size="header">
              Say hello <Arrow />
            </Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </Block>

        <Block title="Tags & chips">
          <div className="flex flex-wrap items-center gap-2.5">
            <Tag>Featured</Tag>
            <Tag>Current</Tag>
            <Tag>Primary</Tag>
            <Tag variant="dashed">Draft</Tag>
            <Tag variant="dashed">Details to come</Tag>
            <Tag variant="dashed">Part-time</Tag>
            <Tag variant="dashed">Practical · growing</Tag>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Business platforms", "Admin dashboards", "E-commerce", "Entertainment", "Education", "Corporate websites"].map(
              (c) => (
                <Chip key={c}>{c}</Chip>
              )
            )}
          </div>
        </Block>

        <Block title="Image placeholders">
          <div className="grid gap-5 desk:grid-cols-2">
            <ImagePlaceholder ratio="16/8" label="ISeeMemories cover" tone={1} />
            <ImagePlaceholder ratio="4/3" label="FoodEase cover" tone={2} />
            <ImagePlaceholder ratio="5/4" label="NMDB cover" tone={3} />
            <div className="rounded-[20px] border border-line bg-bg-2 p-4">
              <ImagePlaceholder ratio="16/10" label="Card cover" tone={4} inCard />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 desk:grid-cols-6">
            {([1, 2, 3, 4, 5, 6] as Tone[]).map((t) => (
              <ImagePlaceholder key={t} ratio="1/1" label={`tone ${t}`} tone={t} inCard />
            ))}
          </div>
        </Block>

        <Block title="Draft note">
          <DraftNote>Before 2022: how it started. This slot stays empty until you write it.</DraftNote>
        </Block>

        <Block title="Surfaces">
          <div className="grid gap-5 desk:grid-cols-3">
            <div className="rounded-[20px] border border-line bg-bg-2 p-6">
              <p className="label">--bg-2 card</p>
              <p className="mt-3 text-muted">Bordered card surface, 20px radius.</p>
            </div>
            <div className="rounded-[20px] bg-soft p-6">
              <p className="label">--soft band</p>
              <p className="mt-3 text-muted">
                Muted text on soft. <TextLink href="/work">Link on soft</TextLink>.
              </p>
            </div>
            <div className="rounded-[28px] bg-panel p-6 text-panel-ink">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-panel-muted">04 — Say hello</p>
              <p className="t-h3 mt-3">
                Something <span className="serif text-panel-accent">interesting?</span>
              </p>
              <p className="mt-2 text-panel-muted">Secondary text on panel.</p>
            </div>
          </div>
        </Block>
      </Container>

      <Section label="01 — Section primitive" band="soft">
        <h2 className="t-h2">
          A sticky label on the left, <span className="serif">content</span> on the right.
        </h2>
        <p className="measure mt-5 text-muted">
          Below 960px the label sits above the content. The section uses clamp(64px, 8vw, 120px) vertical padding.
        </p>
      </Section>
      <Section label="02 — Band: bg-2" band="bg-2" compact>
        <p className="t-lead">Compact band with top and bottom hairlines.</p>
      </Section>
      <Section label="03 — Band: dots" band="dots">
        <p className="t-lead">
          Dot grid for the lab. <Link href="/" className="text-link underline">Back home</Link>
        </p>
      </Section>
    </>
  );
}
