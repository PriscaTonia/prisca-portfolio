"use client";

import { motion } from "framer-motion";

const skillAreas = [
  {
    icon: "⚙️",
    title: "Frontend Engineering",
    accent: "bg-primary/10 text-primary",
    skills: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Responsive Web Design",
      "Component Architecture",
      "State Management",
      "API Integration",
      "Form Validation",
      "Performance Optimization",
    ],
  },
  {
    icon: "🎨",
    title: "UI Systems & Styling",
    accent: "bg-accent/15 text-accent-foreground",
    skills: [
      "Tailwind CSS",
      "Design Systems",
      "Component Libraries",
      "Design Tokens",
      "Theming & Dark Mode",
      "Accessibility (WCAG)",
      "Cross-Browser Consistency",
      "Figma-to-Code Workflow",
    ],
  },
  {
    icon: "🚀",
    title: "Product Delivery",
    accent: "bg-secondary/20 text-secondary-foreground",
    skills: [
      "Agile Collaboration",
      "Feature Scoping",
      "Product Thinking",
      "Performance Audits",
      "SEO Optimization",
      "Analytics Interpretation",
      "Iteration & Feedback Loops",
      "Client Collaboration",
    ],
  },
  {
    icon: "🧠",
    title: "Soft Skills",
    accent: "bg-primary/10 text-primary",
    skills: [
      "Cross-functional Communication",
      "User-Centered Thinking",
      "Attention to Detail",
      "Problem-Solving Mindset",
      "Design-Developer Collaboration",
      "Feedback Receptiveness",
      "Time Management",
      "Adaptability",
      "Clear Technical Communication",
    ],
  },
];

const chipHoverStyles = [
  "hover:border-accent/60 hover:bg-accent/15 hover:text-accent-foreground",
  "hover:border-secondary/60 hover:bg-secondary/20 hover:text-secondary-foreground",
  "hover:border-primary/60 hover:bg-primary/15 hover:text-primary",
];

export function TechnicalSkillsSection() {
  return (
    <section className="space-y-10" id="skills">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Technical Skills
        </p>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Depth in frontend craft with empathy for design and product.
        </h2>
        <p className="text-base text-muted-foreground sm:text-lg">
          A balanced toolkit that combines engineering precision with thoughtful
          user experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skillAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm dark:border-primary/30 dark:bg-card/40"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex size-12 items-center justify-center rounded-2xl text-lg ${area.accent}`}
              >
                {area.icon}
              </span>
              <h3 className="text-xl font-semibold">{area.title}</h3>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-medium text-muted-foreground">
              {area.skills.map((skill, skillIdx) => (
                <div
                  key={skill}
                  className={`rounded-2xl border border-border/40 bg-background/70 px-4 py-2 text-center shadow-inner transition-colors duration-200 ${
                    chipHoverStyles[(index + skillIdx) % chipHoverStyles.length]
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
