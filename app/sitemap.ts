import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { localPosts } from "@/data/writing";
import { getPublicProjects } from "@/lib/content";

/** Placeholder projects/posts and /dev are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const pages = ["/", "/work", "/about", "/explorations", "/writing", "/contact"].map((p) => ({
    url: url(p),
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : 0.8,
  }));
  const projects = getPublicProjects().map((p) => ({
    url: url(`/work/${p.slug}`),
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.7 : 0.5,
  }));
  const posts = localPosts
    .filter((p) => !p.placeholder)
    .map((p) => ({ url: url(`/writing/${p.slug}`), lastModified: p.date, priority: 0.5 }));
  return [...pages, ...projects, ...posts];
}
