/**
 * About page copy. Set `draft: true` on a block to show a dashed "Draft" tag
 * while its wording is still being reviewed. All blocks approved Nov 2026.
 */

export const aboutParagraphs = [
  "I'm a Software Engineer with over four years of experience building and improving web applications across different industries.",
  "I enjoy understanding how products work, solving tricky problems and finding practical ways to turn ideas into functional applications.",
  "Most of my professional experience has been in frontend engineering, but I'm also interested in the systems behind the interfaces I build. I'm always curious about what I can learn next, and I'm intentional about expanding my engineering knowledge.",
  "Outside of engineering, I'm creative, curious and interested in exploring different things. I enjoy learning, experimenting and working on ideas that challenge me in new ways.",
];

export const portrait = {
  src: "/prisca.JPG",
  alt: "Portrait of Prisca Onwudebelu smiling, arms crossed, in a pink blazer over a white top.",
  width: 1263,
  height: 1600,
};

export const fieldNotes = {
  draft: false,
  rows: [
    { label: "Home ground", value: "React · Next.js · TypeScript" },
    { label: "Growing into", value: "Backend with Node.js and Express" },
    { label: "Off-screen", value: "Fashion and creative projects" },
  ],
};

/** Folds in the old "Product Delivery" and "Soft Skills" lists. */
export const principles = {
  draft: false,
  items: [
    {
      title: "Understand the product first",
      body: "Before I write code I want to know who it's for and what it needs to do. Product thinking, feature scoping and asking questions early save a lot of rework later.",
    },
    {
      title: "Build in reusable pieces",
      body: "Component architecture, design tokens and consistent patterns make the next feature faster and keep the interface tidy as it grows.",
    },
    {
      title: "Sweat the details people feel",
      body: "Accessibility, responsive layouts, performance and cross-browser consistency are part of the work, not a final pass.",
    },
    {
      title: "Communicate clearly, own the work",
      body: "Working closely with designers, backend engineers and clients, iterating on feedback, and being comfortable owning a frontend on my own when that's the job.",
    },
  ],
};

export const enjoy = {
  draft: false,
  body: "Products with real users and real workflows: platforms, dashboards and customer journeys where the interface has to make complicated things manageable. I especially like taking something from research and a blank repository to a working product.",
};

export const exploring = {
  draft: false,
  body: "Backend development with Node.js and Express, the systems behind the interfaces I build, plus small experiments and tools along the way.",
};

export const offScreen = {
  draft: false,
  items: [
    {
      title: "Fashion",
      body: "Style, fabric and the small choices that change how something feels. It's another place where details matter to me.",
      rule: "accent",
    },
    {
      title: "Creative projects",
      body: "Making things for the joy of making them, with no ticket or deadline attached.",
      rule: "ink",
    },
    {
      title: "Learning, generally",
      body: "New tools, new subjects, new ways of doing things. Curiosity doesn't switch off at the end of the workday.",
      rule: "line",
    },
  ] as { title: string; body: string; rule: "accent" | "ink" | "line" }[],
};

export const capabilities: {
  area: string;
  items: string;
  tag?: { text: string; variant: "soft" | "dashed" };
  tone?: "muted" | "small";
}[] = [
  {
    area: "Frontend development",
    items: "React, Next.js, Tailwind CSS, Framer Motion",
    tag: { text: "Primary", variant: "soft" },
  },
  { area: "Programming", items: "JavaScript, TypeScript, HTML, CSS" },
  { area: "State & data fetching", items: "Redux Toolkit, RTK Query, React Query, Zustand" },
  {
    area: "Backend & APIs",
    items: "Node.js, Express, REST API integration",
    tag: { text: "Practical · growing", variant: "dashed" },
  },
  { area: "Testing", items: "Cypress, Jest, Playwright" },
  { area: "Tools", items: "Git, GitHub, JIRA, Vercel, Netlify, WordPress", tone: "muted" },
  {
    area: "Also",
    items:
      "Responsive design, component architecture, Figma-to-code, performance optimisation, SEO, accessibility (WCAG), design systems and tokens, theming and dark mode, form validation, cross-browser consistency",
    tone: "small",
  },
];
