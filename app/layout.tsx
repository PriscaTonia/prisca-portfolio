import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/data/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  // Small labels only: keep it off the critical path (metric-matched fallback prevents shift).
  preload: false,
});

const defaultTitle = `${site.name} — ${site.jobTitle}`;
const ogImage =
  "https://res.cloudinary.com/prisca/image/upload/v1763980377/Other%20Images/opengraph-image_jqge8m.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "Software Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Prisca Onwudebelu",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name}, ${site.jobTitle}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    creator: site.twitter,
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F7" },
    { media: "(prefers-color-scheme: dark)", color: "#171619" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="fixed left-4 top-3 z-[60] -translate-y-[200%] rounded-full bg-btn px-5 py-3 text-[15px] font-medium text-btn-ink focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
