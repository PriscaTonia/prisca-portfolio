import { cn } from "@/lib/utils";

export type Tone = 1 | 2 | 3 | 4 | 5 | 6;

const toneVar: Record<Tone, string> = {
  1: "var(--tone-1)",
  2: "var(--tone-2)",
  3: "var(--tone-3)",
  4: "var(--tone-4)",
  5: "var(--tone-5)",
  6: "var(--tone-6)",
};

/**
 * Neutral image placeholder (brief §4.6). Never looks like a real screenshot:
 * project tint + 135° hatch, with a mono "Image · {label}" caption and ratio.
 */
export function ImagePlaceholder({
  ratio,
  label,
  tone,
  inCard = false,
  className,
}: {
  /** e.g. "16/8", "4/3", "5/4", "16/10" */
  ratio: string;
  label: string;
  tone?: Tone;
  inCard?: boolean;
  className?: string;
}) {
  const [w, h] = ratio.split("/").map((n) => n.trim());
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "relative w-full overflow-hidden border border-line",
        inCard ? "rounded-[12px]" : "rounded-[18px]",
        className
      )}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundColor: tone ? toneVar[tone] : "var(--ph)",
        backgroundImage:
          "repeating-linear-gradient(135deg, color-mix(in srgb, var(--ph-line) 55%, transparent) 0 1px, transparent 1px 14px)",
      }}
    >
      <span aria-hidden className="absolute bottom-3 left-3.5 font-mono text-[11px] tracking-[0.04em] text-muted">
        Image · {label}
      </span>
      <span aria-hidden className="absolute bottom-3 right-3.5 font-mono text-[11px] tracking-[0.04em] text-muted">
        {w}:{h}
      </span>
    </div>
  );
}
