"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

/** 44px pill: icon + "Dark"/"Light" text label (text hidden on mobile). */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // true only after hydration — avoids rendering the wrong label on the server
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);

  const base = cn(
    "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line-2 px-3 text-[14px] text-ink",
    "transition-[background-color,border-color,color] duration-300 hover:bg-soft tab:px-4",
    className
  );

  if (!mounted) {
    // Same footprint as the real control so nothing shifts on hydrate.
    return (
      <span aria-hidden className={cn(base, "pointer-events-none")}>
        <span className="size-[18px]" />
        <span className="hidden w-9 tab:inline" />
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className={base}
    >
      {isDark ? (
        <SunMedium aria-hidden className="size-[18px]" strokeWidth={1.75} />
      ) : (
        <MoonStar aria-hidden className="size-[18px]" strokeWidth={1.75} />
      )}
      <span aria-hidden className="hidden w-9 text-left tab:inline">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
