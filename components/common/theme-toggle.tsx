"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative size-12 rounded-full border border-primary/40 bg-primary/10 text-primary shadow-[0_6px_18px_rgba(206,110,119,0.28)] transition-all duration-300 hover:scale-105 hover:bg-primary/20 focus-visible:ring-primary/50 dark:border-primary/50 dark:bg-primary/20 dark:text-primary-foreground/90"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-pulse rounded-full bg-linear-to-br from-primary/30 via-primary/5 to-transparent"
      />
      <SunMedium className="h-6 w-6 rotate-0 scale-100 text-primary transition-all duration-300 dark:-rotate-45 dark:scale-0" />
      <MoonStar className="absolute h-6 w-6 rotate-45 scale-0 text-primary transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
