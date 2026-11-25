import Image from "next/image";
import type { ProjectImage, Tone } from "@/data/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cld } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

/**
 * A fixed-ratio project image: the real image via next/image when one exists,
 * otherwise the labelled hatch placeholder. Hover zoom is driven by a parent
 * `.group`.
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
  className?: string;
}) {
  if (!image) {
    return <ImagePlaceholder ratio={ratio} label={label} tone={tone} inCard={inCard} className={className} />;
  }
  const [w, h] = ratio.split("/").map((n) => n.trim());
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border border-line bg-ph",
        inCard ? "rounded-[12px]" : "rounded-[18px]",
        className
      )}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <Image
        src={cld(image.src)}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover object-left-top",
          zoom && "transition-transform duration-700 ease-brand group-hover:scale-[1.012]"
        )}
      />
    </div>
  );
}
