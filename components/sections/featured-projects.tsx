"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

const badgeColors = [
  "bg-primary/15 text-primary border-primary/20",
  "bg-accent/15 text-accent-foreground border-accent/30",
  "bg-secondary/20 text-secondary-foreground border-secondary/30",
];

type FeaturedProjectsSectionProps = {
  projects: PortfolioProject[];
};

export function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="space-y-10">
      {/* header */}
      <div className="space-y-4 text-center">
        <Badge variant="secondary" className="mx-auto w-fit px-4 py-1.5">
          Featured Projects
        </Badge>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Recently shipped work that balances polish with performance.
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            A sampling of product stories across industries, each focused on
            usability, detail, and measurable outcomes.
          </p>
        </div>
      </div>

      {/* projects */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const firstImage =
            project.images && project.images.length > 0
              ? project.images[0]
              : null;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border-border/70 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="gap-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs uppercase">
                      {project.category}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-muted-foreground hover:text-foreground"
                      asChild
                    >
                      <Link href={`/projects/${project.slug}`}>
                        View Project
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription>{project.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  {firstImage ? (
                    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card">
                      <Image
                        src={firstImage.src}
                        alt={firstImage.alt}
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/70 bg-linear-to-br from-secondary/20 via-background to-background px-4 py-6 text-center text-sm text-muted-foreground">
                      Visual placeholder for {project.category}
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={tech}
                        className={`rounded-2xl border px-3 py-1 text-xs font-semibold ${
                          badgeColors[idx % badgeColors.length]
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
