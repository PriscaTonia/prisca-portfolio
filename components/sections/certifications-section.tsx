"use client";

import { motion } from "framer-motion";

const certifications = [
  {
    title: "Product Design for Engineers",
    issuer: "SuperHi",
    summary: "Experience design, prototyping, and storytelling for engineers.",
  },
  {
    title: "Advanced React Patterns",
    issuer: "EpicReact",
    summary: "Performance, accessibility, and state patterns for modern apps.",
  },
  {
    title: "Human-Centered Design",
    issuer: "IDEO U",
    summary: "Research synthesis, journey mapping, and facilitation methods.",
  },
  {
    title: "Web Accessibility Specialist",
    issuer: "Deque University",
    summary: "Auditing interfaces and building inclusive component systems.",
  },
];

export function CertificationsSection() {
  return (
    <section className="space-y-8" id="certifications">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Certifications & Highlights
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Continuous learning keeps my practice sharp.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-inner"
          >
            <p className="text-sm font-semibold text-accent-foreground">
              {cert.issuer}
            </p>
            <h3 className="text-xl font-semibold text-foreground">
              {cert.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{cert.summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

