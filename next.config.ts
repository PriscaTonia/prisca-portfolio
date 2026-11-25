import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "media2.dev.to" },
    ],
  },
  async redirects() {
    return [
      // Old project URLs (before the 2026 redesign)
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      { source: "/blog", destination: "/writing", permanent: true },
      // The CV file was renamed when the updated CV was added (Nov 2026).
      {
        source: "/Prisca-Resume.pdf",
        destination: "/Prisca_Onwudebelu_Frontend_Engineer.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
