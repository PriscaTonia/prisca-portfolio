import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill button (brief §4.4). `primary` / `secondary` are the design-system
 * variants. `default`, `outline` and `ghost` remain only so the legacy pages
 * keep compiling until Phase 5 replaces them.
 */
const buttonVariants = cva(
  [
    "group/btn inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "transition-[background-color,border-color,color,transform] duration-300 ease-brand",
    "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: "bg-btn text-btn-ink hover:bg-ink dark:hover:bg-link",
        secondary: "border border-line-2 bg-transparent text-ink hover:bg-soft",
        // legacy
        default: "bg-btn text-btn-ink hover:bg-ink dark:hover:bg-link",
        outline: "border border-line-2 bg-transparent text-ink hover:bg-soft",
        ghost: "text-ink hover:bg-soft",
      },
      size: {
        default: "min-h-12 px-6 text-[15px]",
        header: "min-h-11 px-5 text-[14.5px]",
        sm: "min-h-11 px-4 text-sm",
        lg: "min-h-12 px-7 text-[15px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

/** Arrow glyph that nudges 4px on hover of the parent button/link. */
function Arrow({ dir = "right", className }: { dir?: "right" | "down" | "left" | "up-right"; className?: string }) {
  const glyph = { right: "→", down: "↓", left: "←", "up-right": "↗" }[dir];
  const move = {
    right: "group-hover/btn:translate-x-1 group-hover:translate-x-1",
    down: "group-hover/btn:translate-y-1 group-hover:translate-y-1",
    left: "group-hover/btn:-translate-x-1 group-hover:-translate-x-1",
    "up-right":
      "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  }[dir];
  return (
    <span aria-hidden className={cn("inline-block transition-transform duration-300 ease-brand", move, className)}>
      {glyph}
    </span>
  );
}

export { Button, buttonVariants, Arrow };
