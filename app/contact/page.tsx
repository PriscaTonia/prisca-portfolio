import type { Metadata } from "next";
import { site } from "@/data/site";
import { Container } from "@/components/layout/section";
import { Button, Arrow } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { CopyEmailButton } from "@/components/contact/copy-email-button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prisca Onwudebelu about engineering opportunities, contract collaborations and interesting projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, linkedin, linkedinLabel, github, githubLabel, portfolio, portfolioLabel } = site.contact;
  const elsewhere = [
    { label: "LinkedIn", value: linkedinLabel, href: linkedin },
    { label: "Portfolio", value: portfolioLabel, href: portfolio },
    { label: "GitHub", value: githubLabel, href: github },
  ];

  return (
    <Container className="pb-[clamp(64px,8vw,120px)] pt-[clamp(48px,7vw,104px)]">
      <div className="fade-up">
        <p className="label">Contact</p>
        <h1 className="mt-5 max-w-[12ch] text-[clamp(48px,8.4vw,124px)] font-medium leading-[0.94] tracking-[-0.055em]">
          Have something <span className="serif text-accent">interesting</span> in mind?
        </h1>
      </div>

      <div className="mt-[clamp(48px,6vw,88px)] grid gap-12 desk:grid-cols-[7fr_5fr] desk:gap-16">
        <div>
          <p className="t-lead max-w-[46ch] text-ink/85">
            I&apos;m open to engineering opportunities, contract collaborations and interesting projects. If you&apos;d
            like to work together or just have something worth discussing, I&apos;d love to hear from you.
          </p>

          <div className="mt-10 rounded-[24px] bg-soft p-[clamp(24px,3.5vw,44px)]">
            <p className="label">The quickest way</p>
            <a
              href={`mailto:${email}`}
              className="mt-4 block py-1.5 text-[clamp(24px,3.4vw,44px)] font-medium tracking-[-0.03em] text-ink underline decoration-accent decoration-2 underline-offset-[0.18em] [overflow-wrap:anywhere] hover:text-link"
            >
              {email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${email}`}>
                  Write an email <Arrow />
                </a>
              </Button>
              <CopyEmailButton email={email} />
            </div>
          </div>

          <div className="mt-10">
            <p className="label">Useful things to include</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {["What you're working on", "Where I'd fit in", "A rough timeline"].map((t, i) => (
                <li key={t} className="flex items-baseline gap-4 py-3.5 text-[17px] text-ink">
                  <span className="font-mono text-[12px] text-muted">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside aria-labelledby="elsewhere-heading">
          <h2 id="elsewhere-heading" className="label">
            Elsewhere
          </h2>
          <ul className="mt-4 border-t border-ink">
            {elsewhere.map((e) => (
              <li key={e.label} className="border-b border-line">
                {e.href ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-[22px] font-medium tracking-[-0.02em] text-ink">{e.label}</span>
                      <span className="mono-meta">{e.value}</span>
                    </span>
                    <span aria-hidden className="text-[20px] text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between py-5">
                    <span className="text-[22px] font-medium text-muted">{e.label}</span>
                    <Tag variant="dashed">URL to add</Tag>
                  </div>
                )}
              </li>
            ))}
            <li className="border-b border-line">
              <a href={site.cv.href} className="group flex items-center justify-between gap-4 py-5">
                <span>
                  <span className="block text-[22px] font-medium tracking-[-0.02em] text-ink">CV</span>
                  <span className="mono-meta">PDF</span>
                </span>
                <span aria-hidden className="text-[20px] text-ink transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </li>
          </ul>
          <p className="mt-8 flex items-center gap-2.5 text-[15px] text-muted">
            <span aria-hidden className="size-[7px] rounded-full bg-accent" />
            {site.availability}
          </p>
        </aside>
      </div>
    </Container>
  );
}
