import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  external?: boolean;
  children: ReactNode;
  /** Inherit the surrounding colour instead of --link (e.g. on panels). */
  tone?: "link" | "inherit";
};

/**
 * Inline link (brief §4.4): --link colour, faint static underline for
 * accessibility, plus a 1px underline that grows 0 → 100% on hover.
 */
export function TextLink({ href, external, children, className, tone = "link", ...props }: TextLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = cn(
    "u-grow rounded-[2px] underline decoration-1 underline-offset-[0.22em] hover:decoration-transparent",
    "decoration-[color-mix(in_srgb,currentColor_35%,transparent)]",
    tone === "link" ? "text-link" : "text-current",
    className
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...(props as ComponentProps<"a">)}>
        {children}
        <span aria-hidden> ↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
