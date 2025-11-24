import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteNavbar } from "@/components/common/site-navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const website_url = "https://prisca.vercel.app";
const og_image_url =
  "https://res.cloudinary.com/prisca/image/upload/v1763980377/Other%20Images/opengraph-image_jqge8m.jpg";

export const metadata: Metadata = {
  title: {
    default: "Prisca Onwudebelu | Frontend Engineer",
    template: "%s | Prisca Onwudebelu ",
  },
  description:
    "Frontend Engineer specializing in React, Next.js, and TypeScript. Focused on rich product storytelling, high-performing interfaces, and systems that scale gracefully across teams and devices.",
  keywords: [
    "Frontend Developer",
    "Frontend Engineer",
    "Software Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Prisca Onwudebelu" }],
  creator: "Prisca Onwudebelu",
  publisher: "Prisca Onwudebelu ",
  metadataBase: new URL(website_url), // change to your actual domain
  alternates: {
    canonical: website_url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: website_url,
    title: "Prisca Onwudebelu | Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, Next.js, and TypeScript. Focused on rich product storytelling, high-performing interfaces, and systems that scale gracefully across teams and devices.",
    siteName: "Prisca Onwudebelu | Frontend Engineer",
    images: [
      {
        url: og_image_url,
        width: 1200,
        height: 630,
        alt: "Prisca Onwudebelu | Frontend Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prisca Onwudebelu | Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, Next.js, and TypeScript. Focused on rich product storytelling, high-performing interfaces, and systems that scale gracefully across teams and devices.",
    creator: "@EbubePrisca", // replace with your handle if available
    images: [og_image_url],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased`}
        style={
          {
            "--font-grotesk": spaceGrotesk.style.fontFamily,
            "--font-inter": inter.style.fontFamily,
          } as React.CSSProperties
        }
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteNavbar />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
