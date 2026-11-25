import type { Metadata } from "next";
import { topics, devtoUsername } from "@/data/writing";
import { formatDate, getAllPosts } from "@/lib/devto";
import { Container } from "@/components/layout/section";
import { TextLink } from "@/components/ui/text-link";
import { PostList } from "@/components/writing/post-list";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical articles, development notes, lessons and reflections by Prisca Onwudebelu.",
  alternates: { canonical: "/writing" },
};

export default async function WritingPage() {
  const posts = (await getAllPosts()).map((p) => ({ ...p, dateLabel: formatDate(p.date) }));

  return (
    <Container className="pb-[clamp(64px,8vw,120px)] pt-[clamp(48px,7vw,104px)]">
      <div className="fade-up">
        <p className="label">Writing</p>
        <h1 className="t-display mt-5">
          Notes from <span className="serif text-accent">the work.</span>
        </h1>
        <p className="t-lead mt-6 max-w-[48ch] text-muted">
          Technical articles, development notes, lessons and reflections: things I&apos;ve figured out and want to
          remember, written down in case they help someone else too.
        </p>
      </div>

      <div className="mt-[clamp(40px,5vw,72px)]">
        {posts.length ? (
          <PostList posts={posts} topics={topics} />
        ) : (
          <p className="border-t border-ink pt-8 text-[18px] text-muted">
            Nothing published yet. In the meantime, you can find me on{" "}
            <TextLink href={`https://dev.to/${devtoUsername}`}>dev.to</TextLink>.
          </p>
        )}
      </div>
    </Container>
  );
}
