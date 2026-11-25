import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localPosts, type Block } from "@/data/writing";
import { formatDate } from "@/lib/devto";
import { Arrow } from "@/components/ui/button";
import { PrevNext } from "@/components/ui/prev-next";

export const dynamicParams = false;

/** Only posts written on this site. dev.to posts link out from /writing. */
export function generateStaticParams() {
  return localPosts.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = localPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    robots: post.placeholder ? { index: false, follow: true } : undefined,
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="t-h3 mt-14">{block.text}</h2>;
    case "code":
      return (
        <pre className="mt-8 overflow-x-auto rounded-[18px] bg-panel p-6 font-mono text-[14px] leading-relaxed text-panel-ink">
          <code>{block.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="serif my-12 border-l-2 border-accent pl-6 text-[clamp(26px,3vw,36px)] leading-snug text-ink">
          {block.text}
        </blockquote>
      );
    case "img":
      return (
        <figure className="mt-10">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 860px) 780px, 92vw"
            className="h-auto w-full rounded-[18px] border border-line"
          />
          {block.caption ? <figcaption className="mono-meta mt-3">{block.caption}</figcaption> : null}
        </figure>
      );
    default:
      return <p className="mt-6 text-[18px] leading-[1.7] text-ink/90">{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const i = localPosts.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const post = localPosts[i];
  const prev = localPosts[i + 1];
  const next = localPosts[i - 1];
  const meta = [formatDate(post.date), post.topic, post.readingTime ? `${post.readingTime} min read` : undefined]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="pb-[clamp(64px,8vw,120px)]">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 pt-8 desk:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
            <li>
              <Link href="/writing" className="hover:text-ink">Writing</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{post.title}</li>
          </ol>
        </nav>
        <Link href="/writing" className="group inline-flex items-center gap-1.5 text-[14px] text-ink">
          <Arrow dir="left" /> All writing
        </Link>
      </div>

      <div className="mx-auto mt-[clamp(40px,6vw,88px)] max-w-[780px] px-[clamp(20px,5vw,64px)] tab:px-0">
        <p className="mono-meta">{meta}</p>
        <h1 className="t-display-2 mt-4">{post.title}</h1>
        <p className="t-lead mt-6 text-muted">{post.description}</p>
        <div className="mt-10 border-t border-line pt-4">
          {post.body.map((b, k) => (
            <BlockView key={k} block={b} />
          ))}
        </div>
        <div className="mt-16">
          <PrevNext
            label="More writing"
            prev={prev && { href: `/writing/${prev.slug}`, title: prev.title, meta: prev.topic }}
            next={next && { href: `/writing/${next.slug}`, title: next.title, meta: next.topic }}
          />
        </div>
      </div>
    </article>
  );
}
