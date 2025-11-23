import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectWithImages } from "@/lib/cloudinary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { ExternalLink, ArrowLeft } from "lucide-react";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  //  const params = useParams<{ slug: string }>();
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();

  const project = await getProjectWithImages(normalizedSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className="site-container space-y-12 py-12">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to work
        </Link>
        <span className="text-muted-foreground">/ Projects</span>
      </div>

      <header className="space-y-6 rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="secondary" className="px-4 py-1.5">
            {project.category}
          </Badge>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild className="gap-2">
            <Link href={project.liveUrl || "/"}>
              View Live
              <ExternalLink className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/#contact">Discuss this project</Link>
          </Button>
        </div>
      </header>

      <section className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ProjectCarousel images={project.images || []} />
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Project Snapshot</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="font-semibold text-foreground">{project.role}</p>
              </div>
              <div>
                <p className="text-muted-foreground">What I Delivered</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
                  {project.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
