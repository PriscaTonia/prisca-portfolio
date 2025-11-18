import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="site-container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Project Not Found
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Hmm, that case study is still in the works.
        </h1>
        <p className="text-muted-foreground">
          Try heading back to the main page to explore live projects.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full border border-border/60 px-6 py-3 font-semibold text-primary transition hover:bg-primary/10"
      >
        Back to portfolio
      </Link>
    </div>
  );
}

