import type { Project } from "./types";

/**
 * All projects. Adding a project = one new object here.
 * Promoting a project = set `featured: true` (and `showOnHome` for the homepage).
 *
 * Sources: brief §3.3 seed facts, docs/redesign/supplied-content.md (Prisca's
 * answers + updated CV), and the previous data/legacy-projects.ts. Conflicts
 * are kept in `review` and logged in CONTENT_REVIEW.md.
 */
const CLD = "https://res.cloudinary.com/prisca/image/upload";
const FOLDER = "Prisca - Portfolio Project Images";

export const projects: Project[] = [
  // ─────────────────────────────── Featured ───────────────────────────────
  {
    slug: "iseememories",
    title: "ISeeMemories",
    subtitle: "Custom photo books, from upload to checkout",
    category: "Custom photo-book platform",
    types: ["web-app", "ecommerce"],
    featured: true,
    showOnHome: true,
    order: 1,
    caseStudy: "full",
    role: "Full-Stack Engineer",
    engagement: "Independent contract",
    dates: "Oct – Dec 2024",
    duration: "3 months",
    scope: "Frontend, backend and payments, built from scratch",
    summary:
      "Built a custom photo-book platform from scratch, developing frontend and backend functionality to support the customer journey from book customisation to checkout.",
    intro:
      "A platform for turning photos into printed books. I built it from scratch, working directly with the founder, and owned both the interface customers use and the APIs behind it.",
    overview: {
      heading: "A photo-book shop where the product is built by the customer.",
      body: "ISeeMemories lets people create personalised photo books: pick a cover, upload their photos, arrange the pages, preview the result and order it. I established the application structure and developed both the frontend and the backend, delivering an MVP used by paying customers.",
    },
    requirements: {
      heading: "Make a multi-step creative process feel like one journey.",
      body: "Customers needed to move from an empty book to a paid order without losing their work along the way. Every step had to hand its data to the next, from the first customisation choice through to payment.",
      steps: [
        "Customise book",
        "Choose cover",
        "Upload photos",
        "Arrange pages",
        "Preview",
        "Account & cart",
        "Checkout & payment",
      ],
    },
    contributions: [
      {
        label: "Frontend",
        items: [
          "Developed the photo-book creation workflow",
          "Implemented cover selection",
          "Built photo upload and page arrangement",
          "Developed book previews",
        ],
      },
      {
        label: "Across the stack",
        items: [
          "Built user accounts, cart and order functionality",
          "Integrated payment processing",
          "Delivered an MVP used by paying customers",
        ],
      },
      {
        label: "Backend",
        items: [
          "Implemented backend APIs using Node.js and Express",
          "APIs for user accounts, photo uploads, customisation, cart and order management",
        ],
      },
    ],
    technical: [
      {
        area: "Interface",
        tools: "Next.js · TypeScript · Tailwind CSS",
        note: "The customer-facing creation flow, from customisation to checkout.",
      },
      {
        area: "Server state",
        tools: "React Query",
        note: "Fetching and caching data between the frontend and the APIs.",
      },
      {
        area: "Backend",
        tools: "Node.js · Express · MongoDB · Mongoose",
        note: "REST APIs for accounts, uploads, customisation, cart and orders.",
      },
      {
        area: "Payments",
        tools: "Payment provider integration",
        note: "Checkout connected to a payment processor.",
      },
    ],
    outcomes: [
      { value: "1,000+", label: "users within its first year" },
      { value: "MVP", label: "shipped and used by paying customers" },
    ],
    draftNote:
      "Technical notes are drafted from verified facts only. Add specifics you're happy to share, for example how uploads were stored or how previews were rendered.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "React Hot Toast",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "REST APIs",
    ],
    url: "https://www.iseememoriesng.com",
    urlLabel: "iseememoriesng.com",
    tone: 1,
    cover: {
      src: `${CLD}/v1763906213/${FOLDER}/Iseememories/iseememories-1_beakbv.png`,
      alt: "ISeeMemories homepage: the headline “Preserve your adventures in beautiful photobooks” over a spread of travel photo books, with a Start My Design button.",
      caption: "The ISeeMemories homepage.",
      width: 3360,
      height: 1928,
    },
    source: "merged",
    review:
      "Repo named Paystack in the stack (removed per brief). Repo title 'I See Memories'. Role: Full-Stack Engineer (Prisca's choice).",
  },
  {
    slug: "foodease",
    title: "FoodEase",
    subtitle: "FoodEase Office",
    category: "Restaurant management platform",
    types: ["web-app"],
    featured: true,
    showOnHome: true,
    order: 2,
    caseStudy: "summary",
    role: "Frontend Engineer",
    engagement: "Employment",
    employer: "Fusion Intelligence",
    scope: "FoodEase Office: admin interfaces, landing page, onboarding",
    scopeNote:
      "My work was on FoodEase Office, the administrative side of the platform. I didn't build the point-of-sale or the restaurant ordering systems.",
    summary:
      "Contributed to the redesign of FoodEase Office, developing administrative interfaces and reusable components for a restaurant management platform.",
    intro:
      "FoodEase helps restaurants run their operations. I worked on FoodEase Office, the admin side, building the interfaces restaurant managers use day to day, plus the product landing page and self-service onboarding.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Developed administrative interfaces and reusable components for FoodEase Office",
          "Implemented features across inventory, money ledgers, reporting, staff management, roles, sessions and settings",
          "Built interactive tables, forms, filters and pagination for restaurant management workflows",
          "Integrated existing backend APIs",
          "Developed the product landing page",
          "Built the self-service onboarding flow",
        ],
      },
    ],
    outcomes: [{ value: "3 weeks → 2 days", label: "average customer onboarding time, after the self-service flow" }],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "React Hook Form",
      "React Hot Toast",
    ],
    url: "https://food-ease.io",
    urlLabel: "food-ease.io",
    tone: 2,
    cover: {
      src: `${CLD}/v1763907164/${FOLDER}/Foodease/foodease-1_hz0yhn.png`,
      alt: "FoodEase product landing page: the headline “The software that makes your restaurant efficient” above a laptop and phone showing the dashboard.",
      caption: "The FoodEase product landing page.",
      width: 3360,
      height: 1926,
    },
    source: "merged",
    review:
      "Repo copy described order and kitchen processing; replaced with the FoodEase Office scope. Dates within Fusion Intelligence unknown.",
  },
  {
    slug: "nmdb",
    title: "NMDB",
    subtitle: "Nigerian Movie Database",
    category: "Movie discovery platform",
    types: ["web-app"],
    featured: true,
    showOnHome: true,
    order: 3,
    caseStudy: "summary",
    role: "Sole Frontend Developer",
    engagement: "Employment",
    employer: "Fusion Intelligence",
    dates: "Jun 2023 – Present",
    scope: "Product research, interface design and frontend",
    scopeNote:
      "The search, filtering, sorting and pagination logic runs on the server. My part was the interfaces and the integration, not the backend or its architecture.",
    summary:
      "Worked on NMDB from product research and interface design through frontend implementation.",
    intro:
      "A movie discovery and entertainment platform. As the sole frontend developer I took it from product research and interface design through to implementation, then built the interfaces on top of the backend APIs.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Conducted product research and worked on the interface design",
          "Built responsive pages and reusable components for movie discovery, film profiles and people profiles",
          "Developed user account, authentication and chat interfaces",
          "Integrated backend APIs, with data fetching, caching and refetching in React Query",
          "Developed search, filtering, sorting and pagination interfaces connected to server-side functionality",
          "Improved frontend performance and accessibility",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "Recharts"],
    url: "https://fusion-nmdb.cap.reachcinema.io",
    urlLabel: "NMDB",
    tone: 3,
    source: "brief",
    review: "Live URL approved by Prisca for now; she may replace it.",
  },
  {
    slug: "ednaimo",
    title: "Ednaimo",
    subtitle: "Redesigning a connected learning ecosystem",
    category: "Adaptive learning platform",
    types: ["web-app"],
    featured: true,
    showOnHome: true,
    order: 4,
    caseStudy: "summary",
    role: "Frontend Engineer",
    engagement: "Independent contract",
    dates: "Oct – Nov 2026",
    scope: "Redesign across four connected apps",
    scopeNote:
      "Ednaimo already existed and most integrations were in place. I worked on the redesign with another developer and the project owner. I didn't build the platform or its backend.",
    summary:
      "Worked on the redesign of an adaptive learning platform for children aged 2–16, across the children's app and the parent, teacher and admin dashboards.",
    intro:
      "Ednaimo is an adaptive learning platform for children aged 2–16. I worked on the redesign of four interconnected applications inside the existing Next.js codebase.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Redesigned the children's app and the parent, teacher and admin dashboards",
          "Improved navigation, layouts, typography, colours and spacing",
          "Refactored existing components",
          "Created reusable UI components to improve consistency across the apps",
          "Improved responsive behaviour on mobile and tablet",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    tone: 5,
    source: "brief",
    review: "Dates supplied by Prisca (still slightly ongoing).",
  },
  {
    slug: "checkref",
    title: "CheckRef",
    subtitle: "Reference checking for hiring teams",
    category: "Reference-checking platform",
    types: ["web-app"],
    featured: true,
    order: 5,
    caseStudy: "summary",
    role: "Sole Frontend Developer",
    engagement: "Employment",
    employer: "Fusion Intelligence",
    scope: "New frontend, from structure to handover",
    scopeNote: "I built and deployed the frontend, then handed it over.",
    summary:
      "Developed the frontend of a reference-checking platform using existing Figma designs and a new frontend repository.",
    intro:
      "CheckRef automates reference checks for hiring teams. Starting from existing Figma designs and an empty repository, I built the client frontend, deployed it and handed it over.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Established the frontend structure and architecture",
          "Built reusable components, layouts and routes",
          "Developed interfaces for platform administrators, companies and candidates",
          "Built referee submission forms reached through email invitations or links",
          "Integrated APIs for candidate registration, invitations, reference submissions and related workflows",
          "Deployed and handed over the frontend",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "React Hook Form"],
    url: "https://checkref.co",
    urlLabel: "checkref.co",
    tone: 6,
    cover: {
      src: `${CLD}/v1763904174/${FOLDER}/Checkref/checkref-1_z5kwjl.png`,
      alt: "CheckRef marketing page: the headline “Automate pre-onboarding in minutes” beside a desktop monitor showing the dashboard.",
      caption: "CheckRef's public landing page.",
      width: 3360,
      height: 1844,
    },
    source: "merged",
    review:
      "Repo said 'Lead Frontend Engineer' and 'built and maintained'; old CV said separate contract. Resolved: Fusion Intelligence, no maintenance. Cover shows the marketing page; confirm you built it, or pick an app screenshot instead.",
  },

  // ────────────────────────────── Additional ──────────────────────────────
  {
    slug: "sedic",
    title: "Sedic Group",
    subtitle: "Corporate website",
    category: "Corporate website",
    types: ["corporate"],
    featured: false,
    order: 6,
    caseStudy: "summary",
    role: "Frontend Engineer",
    engagement: "Independent contract",
    dates: "Jul – Aug 2026",
    scope: "Research, visual direction, design and build",
    summary:
      "Researched, designed and developed a responsive corporate website, establishing its visual direction, structure and frontend implementation.",
    intro:
      "A corporate web presence for Sedic Group. I did the product and interface research, set the visual direction and structure, then designed and built the site.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Conducted product and interface research",
          "Established the website's visual direction and structure",
          "Designed and developed the responsive website",
          "Implemented the frontend using Next.js, TypeScript and Tailwind CSS",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://www.sedicgroup.com/",
    urlLabel: "sedicgroup.com",
    tone: 4,
    source: "brief",
  },
  {
    slug: "oripa",
    title: "ORIPA",
    subtitle: "Oji River Investment Promotion Agency",
    category: "Corporate website",
    types: ["corporate"],
    featured: false,
    order: 7,
    caseStudy: "summary",
    role: "Frontend Engineer",
    engagement: "Independent contract",
    dates: "May – Jul 2026",
    scope: "Research, visual direction, design and build",
    summary:
      "Conducted product and interface research, established the website's visual direction and developed a responsive corporate website.",
    intro:
      "A corporate website for investment promotion in Oji River. I researched the product and interface, set the visual direction and page structure, then designed and built the site.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Conducted product and interface research",
          "Established the website's visual direction and page structure",
          "Designed and developed the responsive website",
          "Implemented the frontend using Next.js, TypeScript and Tailwind CSS",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://www.investojiriver.org/",
    urlLabel: "investojiriver.org",
    tone: 2,
    source: "brief",
  },
  {
    slug: "surfnturf",
    title: "Surf n' Turf",
    subtitle: "Restaurant ordering and reservations",
    category: "E-commerce website",
    types: ["ecommerce"],
    featured: false,
    order: 8,
    caseStudy: "summary",
    role: "Frontend Engineer",
    engagement: "Employment",
    employer: "Fusion Intelligence",
    summary:
      "A restaurant website where customers browse the menu, place orders, book tables and track their meals.",
    intro:
      "Surf n' Turf is a restaurant platform for browsing the menu, ordering, making reservations and tracking orders. I worked on the frontend, keeping the interface in line with the brand's upscale identity.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Built menu browsing and filtering",
          "Developed a responsive cart and checkout flow",
          "Implemented the order-tracking interface",
          "Created the reservations and booking interface",
          "Kept the responsive design consistent with the brand",
          "Implemented animations and micro-interactions",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "React Hot Toast"],
    url: "https://surfnturfng.com",
    urlLabel: "surfnturfng.com",
    tone: 1,
    cover: {
      src: `${CLD}/v1773303236/${FOLDER}/Surfnturf/surf_1_ayx44a.png`,
      alt: "Surf n' Turf homepage: the headline “Flavour, best enjoyed together” next to a photo of glazed grilled ribs, with a View Menu button.",
      caption: "The Surf n' Turf homepage.",
      width: 3360,
      height: 1930,
    },
    source: "merged",
    review:
      "Listed in the brief as 'Soft and Tough' (same project). Repo copy refined to remove marketing phrasing ('seamless', 'effortless', 'optimised for conversions'). Dates unknown.",
  },
  {
    slug: "caephas-portfolio",
    title: "Arinze Obidiegwu",
    subtitle: "Portfolio website",
    category: "Portfolio website",
    types: ["portfolio"],
    featured: false,
    order: 9,
    caseStudy: "summary",
    role: "Frontend Engineer",
    summary:
      "A responsive portfolio website presenting Arinze Obidiegwu's work, experience and contact details.",
    intro:
      "A personal portfolio for Arinze Obidiegwu, built to present his projects, background and contact details clearly.",
    contributions: [
      {
        label: "What I did",
        items: [
          "Designed and developed the portfolio layout",
          "Implemented responsive design across devices",
          "Organised the content for clarity and readability",
          "Built the sections for projects and personal information",
          "Kept navigation smooth and load performance fast",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://www.arinzeobidiegwu.com",
    urlLabel: "arinzeobidiegwu.com",
    tone: 3,
    cover: {
      src: `${CLD}/v1764173824/${FOLDER}/Caephas/caephas-1_gvde2e.png`,
      alt: "Arinze Obidiegwu's portfolio homepage in a dark theme: an introduction beside a portrait framed by a blue halftone circle.",
      caption: "The portfolio homepage.",
      width: 3360,
      height: 1924,
    },
    source: "merged",
    review:
      "The brief's 'Portfolio websites (clients)' entry. Arinze's is the only client portfolio. Slug kept for URL continuity. Engagement and dates unknown.",
  },
];
