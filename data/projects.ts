export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  role: string;
  responsibilities: string[];
  techStack: string[];
  liveUrl: string;
  cloudinaryFolder?: string;
  images?: ProjectImage[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "checkref",
    title: "Checkref",
    category: "B2B SaaS",
    summary:
      "Smart reference-checking platform that streamlines candidate verification for recruiters and HR teams.",
    description:
      "Checkref is a modern B2B platform that simplifies and automates the reference-checking process for fast-paced hiring teams. I built and refined intuitive interfaces that guide recruiters through candidate reviews, feedback collection, and reporting with clarity and speed. The platform prioritises usability, data accuracy, and seamless workflows to reduce hiring friction and improve decision-making efficiency.",
    role: "Lead Frontend Engineer",
    responsibilities: [
      "Built and maintained scalable UI components for recruiter dashboards and candidate review flows.",
      "Translated complex HR workflows into clean, user-friendly interfaces with a strong focus on accessibility.",
      "Improved performance and load times by optimising component rendering and asset delivery.",
      "Collaborated with designers and backend engineers to deliver seamless, end-to-end user experiences.",
      "Ensured responsive consistency across devices and browsers.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "React Hook Form",
    ],
    liveUrl: "https://checkref.co",
    cloudinaryFolder: "Prisca - Portfolio Project Images/Checkref",
    images: [],
  },
  {
    slug: "foodease",
    title: "FoodEase",
    category: "B2B SaaS",
    summary:
      "All-in-one restaurant management system for seamless operations and customer flow.",
    description:
      "FoodEase is a comprehensive SaaS platform designed to help restaurants manage orders, menus, staff, and customer interactions from a single dashboard. I contributed to crafting interactive interfaces that simplified daily operations for restaurant owners and staff, ensuring a smooth experience from order placement to kitchen processing and analytics tracking.",
    role: "Frontend Engineer",
    responsibilities: [
      "Developed interactive dashboards for real-time order management and business insights.",
      "Implemented responsive UI for menu management, staff control, and customer order flows.",
      "Integrated form handling and validation to ensure accurate data input across admin features.",
      "Optimised user interaction patterns to reduce task completion time for restaurant staff.",
      "Maintained design consistency and enhanced visual hierarchy for better usability.",
      "Collaborated with designers and backend engineers to deliver seamless, end-to-end user experiences.",
      "Ensured responsive consistency across devices and browsers.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Hook Form",
      "React Hot Toast",
    ],
    liveUrl: "https://food-ease.io",
    cloudinaryFolder: "Prisca - Portfolio Project Images/Foodease",
    images: [],
  },
  {
    slug: "iseememories",
    title: "I See Memories",
    category: "B2C E-commerce",
    summary: "Personalised photo book and memory preservation platform.",
    description:
      "I See Memories is an e-commerce platform that allows users to curate, customise, and order personalised photo books for cherished moments. I helped bring emotion-driven design to life by building visually engaging interfaces that made the creation process intuitive, delightful, and seamless, from photo selection to checkout.",
    role: "Full-stack Engineer",
    responsibilities: [
      "Created user-friendly interfaces for photo uploads, customisation, and preview flows.",
      "Built responsive product pages to enhance storytelling and emotional connection.",
      "Enhanced checkout and order flow UX for smoother conversions.",
      "Implemented animations and micro-interactions to elevate user engagement.",
      "Ensured performance optimisation for media-heavy pages without compromising quality.",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "React Hot Toast",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Paystack",
    ],
    liveUrl: "https://www.iseememoriesng.com",
    cloudinaryFolder: "Prisca - Portfolio Project Images/Iseememories",
    images: [],
  },
];
