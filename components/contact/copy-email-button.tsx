"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

/** Clipboard copy with a 2.2s "Copied ✓" state and a live announcement. */
export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "error">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  };

  return (
    <>
      <Button type="button" variant="secondary" onClick={copy} className="min-w-[160px]">
        {state === "copied" ? "Copied ✓" : state === "error" ? "Couldn't copy" : "Copy address"}
      </Button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "error" ? "Copy failed" : ""}
      </span>
    </>
  );
}
