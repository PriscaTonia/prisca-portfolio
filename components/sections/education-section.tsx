"use client";

import { motion } from "framer-motion";

const education = {
  school: "BEng, Electronic & Computer Engineering",
  institution: "Nnamdi Azikiwe University, Awka, Anambra state.",
  year: "2016 - 2021",
  details: [
    "Electronics",
    "Digital Logic Design",
    "Computer Architecture",
    "Operating Systems",
    "Computer Networks",
    "Database Systems",
    "Software Engineering",
    "Artificial Intelligence",
    "Computer Vision",
    "Embedded Systems",
  ],
};

export function EducationSection() {
  return (
    <section className="space-y-8" id="education">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Education
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Grounded in engineering fundamentals.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">{education.school}</h3>
            <p className="text-muted-foreground">{education.institution}</p>
          </div>
          <span className="rounded-full border border-border/70 px-4 py-1 text-sm font-semibold text-muted-foreground">
            {education.year}
          </span>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <p className="font-semibold text-foreground">Relevant Courses</p>
          <div className="flex flex-wrap gap-2">
            {education.details.map((course) => (
              <span
                key={course}
                className="rounded-full border border-border/50 bg-background/80 px-4 py-1 text-muted-foreground"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
