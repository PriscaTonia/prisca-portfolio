"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Frontend Development (Internship)",
    issuer: "Genesys",
    link: "https://drive.google.com/file/d/1mC2EqODKYar-2_c0aKxWUV9Vh1DtyI0W/view?usp=sharing",
    summary:
      "Built a strong foundation in frontend development, learning the core essentials of HTML, CSS, JavaScript, and React. This program introduced me to modern web workflows and best practices, shaping my problem-solving mindset and setting the stage for scalable UI development.",
  },
  {
    id: 2,
    title: "Frontend Development (Internship)",
    issuer: "HNG - Hotels.ng",
    link: "https://drive.google.com/file/d/1Ok2gicaT-1OZpjtYSZSvotnEXwfMUXns/view?usp=sharing",
    summary:
      "Applied frontend skills to real-world projects, strengthening my ability to build responsive, production-ready interfaces. Expanded my toolkit with Tailwind CSS, Styled Components, and advanced React patterns while collaborating in fast-paced team environments to deliver functional, user-focused applications.",
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
            key={cert.id}
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
            <Button
              size="sm"
              variant="outline"
              className="gap-2 mt-3 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href={cert.link} target="_blank">
                View
                <ExternalLink className="size-3.5" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
