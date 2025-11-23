"use client";

import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prisca-ebube",
  },
  { icon: Github, label: "GitHub", href: "https://github.com/PriscaTonia" },
  { icon: Mail, label: "Email", href: "mailto:priscaebube@gmail.com" },
];

export function HeroSection() {
  const { push } = useRouter();

  return (
    <section
      id="about"
      className="grid items-center gap-12 rounded-3xl border border-border/60 bg-linear-to-br from-background via-secondary/15 to-background p-6 shadow-lg dark:border-primary/30 dark:bg-none dark:bg-(--surface-rose) dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)] md:p-10 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent-foreground">
          <span className="size-2 rounded-full bg-accent" />
          Let&apos;s build something beautiful
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Prisca Onwudebelu
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl xl:text-6xl">
            Crafting elegant digital experiences that feel effortless.
          </h1>
          <p className="text-lg text-muted-foreground">
            Frontend engineer focused on rich product storytelling,
            high-performing interfaces, and systems that scale gracefully across
            teams and devices.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          {/* <div className="flex items-center gap-2 font-medium text-foreground">
            <MapPin className="size-4 text-accent" />
            San Francisco, CA
          </div> */}
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Briefcase className="size-4 text-accent" />
            5+ years experience
          </div>
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Award className="size-4 text-accent" />
            Product-focused builder
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            onClick={() => push("/#projects")}
            className="gap-2"
          >
            <ExternalLink className="size-4" />
            View My Work
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a
              href="/Prisca-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-4" />
              Download CV
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="border border-border/60 text-muted-foreground hover:text-foreground"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <Icon className="size-5" />
                </a>
              </Button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-none bg-card/90 shadow-xl ring-1 ring-border/40">
          <div className="absolute inset-0 -z-10 rotate-6 rounded-4xl bg-accent/40 blur-3xl" />
          <CardHeader className="items-center text-center">
            <div className="size-28 rounded-full border border-border/60 bg-linear-to-br from-primary/20 to-accent/30 shadow-inner" />
            <CardTitle className="text-2xl font-semibold">
              Prisca Onwudebelu
            </CardTitle>
            <CardDescription className="text-base">
              Software Engineer (Frontend)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* <div className="flex items-center justify-center gap-1 text-accent">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="size-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              5.0 rating from 50+ collaborators
            </p> */}
            <div className="grid gap-4 rounded-2xl bg-background/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Specialty</span>
                <span className="font-medium text-foreground">
                  React, Next.js, TypeScript
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Focus</span>
                <span className="font-medium text-foreground">
                  Design Systems & Product UI
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Helping teams launch intentional, human-centered experiences.
            </p>
            <CardAction className="w-full">
              <Button onClick={() => push("/#contact")} className="w-full">
                Get in Touch
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
}
