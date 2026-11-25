import type { Post } from "./types";

export const topics = ["Development notes", "Lessons", "Reflections"] as const;
export type Topic = (typeof topics)[number];

/** dev.to username — posts are fetched at build time and refreshed hourly. */
export const devtoUsername = "priscaaa_";

/**
 * Topic for each dev.to post, keyed by the post's URL slug. Draft assignment —
 * see CONTENT_REVIEW.md. Unlisted posts default to "Development notes".
 */
export const devtoTopics: Record<string, Topic> = {
  "react-hooks-for-beginners-the-guide-i-wish-i-had-an1": "Development notes",
  "how-to-find-beginner-friendly-open-source-projects-without-feeling-overwhelmed-21p1": "Lessons",
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; code: string; lang?: string }
  | { type: "quote"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string; width: number; height: number };

/**
 * Posts written on this site (rendered at /writing/[slug]). None yet: real
 * posts live on dev.to. Never add invented articles here.
 */
export const localPosts: (Post & { body: Block[] })[] = [];
