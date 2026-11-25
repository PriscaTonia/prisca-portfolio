import Image from "next/image";
import type { ProjectImage, Tone } from "@/data/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cld } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

/**
 * A project image in a fixed-ratio frame.
 *
 * - `fit="mat"` (default): the screenshot is shown whole, centred on a tinted
 *   mat in the project's tone, so wide screenshots are never cropped by 4:3,
 *   5:4 or 16:10 frames.
 * - `fit="natural"`: the frame takes the image's own aspect ratio (used where
 *   a panel already frames the image, e.g. the wide tile and the page hero).
 *
 * Without an image, the labelled hatch placeholder is shown. Hover zoom is
 * driven by a parent `.group`.
 */
export function ProjectMedia({
  image,
  ratio,
  label,
  tone,
  sizes,
  priority = false,
  inCard = false,
  zoom = true,
  fit = "mat",
  className,
}: {
  image?: ProjectImage;
  ratio: string;
  label: string;
  tone?: Tone;
  sizes: string;
  priority?: boolean;
  inCard?: boolean;
  zoom?: boolean;
  fit?: "mat" | "natural";
  className?: string;
}) {
  if (!image) {
    return <ImagePlaceholder ratio={ratio} label={label} tone={tone} inCard={inCard} className={className} />;
  }

  const hasSize = Boolean(image.width && image.height);
  const zoomCls = zoom && "transition-transform duration-700 ease-brand group-hover:scale-[1.012]";

  if (fit === "natural" && hasSize) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden border border-line bg-ph",
          inCard ? "rounded-[12px]" : "rounded-[18px]",
          className
        )}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <Image
          src={cld(image.src)}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", zoomCls)}
        />
      </div>
    );
  }

  const [w, h] = ratio.split("/").map((n) => n.trim());
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border border-line",
        inCard ? "rounded-[12px]" : "rounded-[18px]",
        className
      )}
      style={{ aspectRatio: `${w} / ${h}`, backgroundColor: tone ? `var(--tone-${tone})` : "var(--ph)" }}
    >
      <div className={cn("absolute flex items-center justify-center", inCard ? "inset-[6%]" : "inset-[5.5%]")}>
        {hasSize ? (
          <Image
            src={cld(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className={cn(
              "h-auto max-h-full w-auto max-w-full rounded-[8px] border border-black/5 shadow-[0_18px_40px_-24px_var(--shadow)]",
              zoomCls
            )}
          />
        ) : (
          <Image src={cld(image.src)} alt={image.alt} fill sizes={sizes} priority={priority} className={cn("object-contain", zoomCls)} />
        )}
      </div>
    </div>
  );
}
