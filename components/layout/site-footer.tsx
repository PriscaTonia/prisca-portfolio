import Link from "next/link";
import { mainNav, site } from "@/data/site";
import { TextLink } from "@/components/ui/text-link";
import { Tag } from "@/components/ui/tag";
import { Wordmark } from "./site-header";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, linkedin, github } = site.contact;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-x grid gap-12 py-16 desk:grid-cols-[1.4fr_1fr_1fr] desk:gap-10">
        <div>
          <Link href="/" aria-label="Prisca Onwudebelu, home" className="inline-block rounded-sm">
            <Wordmark />
          </Link>
          <p className="serif mt-4 max-w-[22ch] text-[26px] leading-[1.15] text-ink">
            Made with curiosity and a little bit of code.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label mb-4">Pages</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[15.5px] text-muted transition-colors duration-300 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label mb-4">Elsewhere</p>
          <ul className="space-y-2.5 text-[15.5px]">
            <li className="[overflow-wrap:anywhere]">
              <TextLink href={`mailto:${email}`}>{email}</TextLink>
            </li>
            <li>
              <TextLink href={linkedin}>LinkedIn</TextLink>
            </li>
            <li>
              {github ? (
                <TextLink href={github}>GitHub</TextLink>
              ) : (
                <span className="inline-flex items-center gap-2 text-muted">
                  GitHub <Tag variant="dashed">URL to add</Tag>
                </span>
              )}
            </li>
            <li>
              <TextLink href={site.cv.href}>CV (PDF)</TextLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-5">
          <p className="mono-meta">
            © {year} {site.name}
          </p>
          <p className="mono-meta">prisca.dev</p>
        </div>
      </div>
    </footer>
  );
}
