import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { DevToArticle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  article: DevToArticle;
  className?: string;
}

export function BlogCard({ article, className }: BlogCardProps) {
  const formattedDate = new Date(article.published_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/30 text-muted-foreground">
            <span className="text-4xl font-bold opacity-20">Blog</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.published_at}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.reading_time_minutes} min read</span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 font-grotesk text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {article.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tag_list.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary/50 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
