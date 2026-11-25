import { devtoTopics, devtoUsername, localPosts } from "@/data/writing";
import type { Post } from "@/data/types";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  url: string;
  slug: string;
  reading_time_minutes: number;
}

/** dev.to posts as Post records. Returns [] if dev.to is unreachable. */
export async function getDevtoPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${devtoUsername}&per_page=100`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PriscaPortfolio/1.0)" },
    });
    if (!res.ok) throw new Error(`dev.to responded ${res.status}`);
    const articles: DevToArticle[] = await res.json();
    return articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
      date: a.published_at,
      topic: devtoTopics[a.slug] ?? "Development notes",
      readingTime: a.reading_time_minutes,
      externalUrl: a.url,
      source: "existing",
    }));
  } catch (error) {
    console.error("Error fetching dev.to articles:", error);
    return [];
  }
}

/** All real posts, newest first (placeholders excluded). */
export async function getAllPosts(): Promise<Post[]> {
  const devto = await getDevtoPosts();
  return [...localPosts, ...devto]
    .filter((p) => !p.placeholder)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : undefined;
