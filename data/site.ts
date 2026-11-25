export const site = {
  name: "Prisca Onwudebelu",
  shortName: "Prisca",
  jobTitle: "Software Engineer",
  url: "https://www.prisca.dev",
  description:
    "Prisca Onwudebelu is a Software Engineer who builds digital products: web applications, platforms and websites, mostly with React, Next.js and TypeScript.",
  twitter: "@EbubePrisca",
  availability: "Open to interesting opportunities and collaborations.",
  contact: {
    email: "priscaebube@gmail.com",
    linkedin: "https://www.linkedin.com/in/prisca-ebube/",
    linkedinLabel: "in/prisca-ebube",
    github: "https://github.com/PriscaTonia" as string | undefined,
    githubLabel: "PriscaTonia",
    portfolio: "https://www.prisca.dev/",
    portfolioLabel: "prisca.dev",
  },
  cv: {
    href: "/Prisca_Onwudebelu_Frontend_Engineer.pdf",
    label: "Download CV",
  },
} as const;

export type NavItem = { label: string; href: string; match: (pathname: string) => boolean };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", match: (p) => p === "/" },
  { label: "Work", href: "/work", match: (p) => p === "/work" || p.startsWith("/work/") },
  { label: "About", href: "/about", match: (p) => p.startsWith("/about") },
  { label: "Explorations", href: "/explorations", match: (p) => p.startsWith("/explorations") },
  { label: "Writing", href: "/writing", match: (p) => p === "/writing" || p.startsWith("/writing/") },
  { label: "Contact", href: "/contact", match: (p) => p.startsWith("/contact") },
];
