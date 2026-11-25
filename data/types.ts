// Content model (brief §6). Every record carries a provenance marker so it can
// be traced in CONTENT_REVIEW.md.
export type Provenance = "existing" | "brief" | "merged" | "placeholder";

export type ProjectType = "web-app" | "ecommerce" | "corporate" | "portfolio" | "experiment";

export type Tone = 1 | 2 | 3 | 4 | 5 | 6;

export interface ProjectImage {
  /** Full Cloudinary delivery URL (or a /public path). */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size, used for the aspect ratio of gallery images. */
  width?: number;
  height?: number;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  types: ProjectType[];
  featured: boolean;
  showOnHome?: boolean;
  order: number;
  caseStudy: "full" | "summary";
  placeholder?: boolean;

  role?: string;
  engagement?: "Employment" | "Independent contract" | (string & {});
  employer?: string;
  dates?: string;
  duration?: string;
  scope?: string;
  scopeNote?: string;

  summary: string;
  intro?: string;
  overview?: { heading: string; body: string };
  requirements?: { heading: string; body: string; steps?: string[] };
  contributions?: { label: string; items: string[] }[];
  technical?: { area: string; tools: string; note: string }[];
  outcomes?: { value: string; label: string }[];
  draftNote?: string;

  stack: string[];
  url?: string;
  urlLabel?: string;
  repoUrl?: string;
  cover?: ProjectImage;
  tone?: Tone;
  gallery?: ProjectImage[];

  source: Provenance;
  review?: string;
}

export interface Role {
  org: string;
  role: string;
  dates?: string;
  current?: boolean;
  kind: "employment" | "contract";
  partTime?: boolean;
  summary?: string;
  projectSlugs: string[];
  /** 'YYYY-MM' — used by the timeline; omit when unknown. */
  start?: string;
  end?: string | "present";
  source: Provenance;
}

export interface LabEntry {
  slug: string;
  title: string;
  area: "backend" | "security" | "tools" | "oss" | "experiments" | "personal" | (string & {});
  format: "note" | "tool" | "repo" | "learning-log" | "pull-request";
  status: "placeholder" | "in-progress" | "shipped";
  summary: string;
  started?: string;
  links?: { label: string; href: string }[];
  source: Provenance;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date?: string;
  topic: string;
  readingTime?: number;
  /** Posts published elsewhere (dev.to) link out instead of /writing/[slug]. */
  externalUrl?: string;
  placeholder?: boolean;
  source: Provenance;
}
