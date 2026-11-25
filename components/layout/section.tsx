import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

type Band = "none" | "bg-2" | "soft" | "dots";

const bandClass: Record<Band, string> = {
  none: "",
  "bg-2": "bg-bg-2 border-y border-line",
  soft: "bg-soft",
  dots: "dot-grid",
};

/**
 * Section (brief §4.4): optional `NN — Name` label in a sticky left column
 * on desktop, content on the right (1fr / 3fr). Without a label the content
 * spans the full container.
 */
export function Section({
  id,
  label,
  band = "none",
  compact = false,
  className,
  innerClassName,
  children,
  "aria-labelledby": labelledBy,
}: {
  id?: string;
  label?: string;
  band?: Band;
  compact?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(bandClass[band], compact ? "py-12 desk:py-16" : "section-y", className)}
    >
      <Container
        className={cn(label && "grid gap-6 desk:grid-cols-[1fr_3fr] desk:gap-10", innerClassName)}
      >
        {label ? (
          <div>
            <p className="label desk:sticky desk:top-[calc(var(--header-h)+28px)]">{label}</p>
          </div>
        ) : null}
        {label ? <div className="min-w-0">{children}</div> : children}
      </Container>
    </section>
  );
}
