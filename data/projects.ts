export type ProjectImage = {
  src: string
  alt: string
  caption: string
}

export type PortfolioProject = {
  slug: string
  title: string
  category: string
  summary: string
  description: string
  role: string
  responsibilities: string[]
  techStack: string[]
  liveUrl: string
  images: ProjectImage[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "intelligent-commerce-suite",
    title: "Intelligent Commerce Suite",
    category: "E-commerce Experience",
    summary:
      "Full-stack commerce experience with personalized storefronts and Stripe-powered checkout.",
    description:
      "Delivered an adaptive storefront where merchandising, content, and checkout respond to shopper intent in real time. Built reusable interface primitives, integrated product storytelling, and ensured performance targets across desktop and mobile.",
    role: "Lead Frontend Engineer & Product Partner",
    responsibilities: [
      "Architected a modular design system shared across marketing and product",
      "Implemented advanced filtering, wishlists, and localized pricing flows",
      "Led accessibility and performance audits to keep LCP under 1.7s",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Framer Motion"],
    liveUrl: "#",
    images: [
      {
        src: "/projects/commerce-1.svg",
        alt: "Commerce landing hero",
        caption: "Personalized storefront hero showcasing curated products.",
      },
      {
        src: "/projects/commerce-2.svg",
        alt: "Commerce dashboard",
        caption: "Analytics dashboard used by merchandisers to tune campaigns.",
      },
    ],
  },
  {
    slug: "insightops-dashboard",
    title: "InsightOps Dashboard",
    category: "Data Visualization",
    summary:
      "Real-time operations dashboard with role-based views and configurable widgets.",
    description:
      "Partnered with the ops team to translate dense data streams into friendly UI. Designed card-based layouts, contextual drill-downs, and alert surfaces that helped teams act faster.",
    role: "Senior Frontend Engineer",
    responsibilities: [
      "Shipped live data visualizations with streaming updates",
      "Crafted dark/light theming for mission control workspaces",
      "Collaborated with backend to optimize websocket payloads",
    ],
    techStack: ["Next.js", "Zustand", "Tailwind CSS", "TypeScript", "Chart.js"],
    liveUrl: "#",
    images: [
      {
        src: "/projects/insight-1.svg",
        alt: "InsightOps overview",
        caption: "Executive overview summarizing KPIs across regions.",
      },
      {
        src: "/projects/insight-2.svg",
        alt: "InsightOps detail",
        caption: "Detailed incident timeline with collaborative notes.",
      },
    ],
  },
  {
    slug: "momentum-fitness",
    title: "Momentum Fitness",
    category: "Mobile Experience",
    summary:
      "Motivation-first fitness app blending habit tracking with community challenges.",
    description:
      "Crafted a wellness companion focused on streaks, social accountability, and celebrating progress. Built gesture-friendly UI and micro-interactions that keep users engaged.",
    role: "Product Designer & Frontend Dev",
    responsibilities: [
      "Defined motion language and prototyped micro-interactions",
      "Implemented progressive onboarding with save-state recovery",
      "Integrated community features including squads and shoutouts",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "#",
    images: [
      {
        src: "/projects/momentum-1.svg",
        alt: "Momentum fitness feed",
        caption: "Community feed with progress updates and encouragements.",
      },
      {
        src: "/projects/momentum-2.svg",
        alt: "Momentum goals view",
        caption: "Goal tracker displaying streaks and upcoming sessions.",
      },
    ],
  },
]

