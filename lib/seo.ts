import { site } from "@/data/site";
import type { Project } from "@/data/types";
import { cld } from "./cloudinary";

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.jobTitle,
    url: site.url,
    email: `mailto:${site.contact.email}`,
    sameAs: [site.contact.linkedin, site.contact.github].filter(Boolean),
    knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "Express"],
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.subtitle ? `${p.title}: ${p.subtitle}` : p.title,
    description: p.summary,
    url: absoluteUrl(`/work/${p.slug}`),
    genre: p.category,
    keywords: p.stack.join(", "),
    ...(p.cover ? { image: cld(p.cover.src, { w: 1200, h: 630 }) } : {}),
    ...(p.url ? { sameAs: p.url } : {}),
    creator: { "@type": "Person", name: site.name, url: site.url },
  };
}
