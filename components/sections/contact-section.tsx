"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Calendar, MessageCircle } from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@prisca.dev",
    href: "mailto:hello@prisca.dev",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "@priscacodes",
    href: "https://www.linkedin.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/priscacodes",
    href: "https://github.com",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="space-y-10 rounded-4xl border border-border/60 bg-linear-to-br from-secondary/20 via-background to-background p-8 shadow-lg dark:border-primary/25 dark:bg-none dark:bg-(--surface-sage) dark:text-foreground sm:p-12"
    >
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Let's Connect
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to build something beautiful?
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          Reach out to chat about collaborations, leadership engagements, or
          mentoring opportunities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Card
              key={channel.label}
              className="border-border/60 bg-background/80 text-center shadow-md dark:border-primary/30 dark:bg-card/70"
            >
              <CardHeader className="items-center">
                <span className="rounded-full bg-primary/10 p-3 text-primary">
                  <Icon className="size-6" />
                </span>
                <CardTitle>{channel.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={channel.href}
                  className="font-semibold text-foreground transition hover:text-primary"
                >
                  {channel.value}
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" className="gap-2">
          <MessageCircle className="size-4" />
          Send Message
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Calendar className="size-4" />
          Schedule Call
        </Button>
      </div>
    </section>
  );
}

