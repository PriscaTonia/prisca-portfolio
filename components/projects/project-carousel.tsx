"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectImage } from "@/data/projects";

type ProjectCarouselProps = {
  images: ProjectImage[];
};

export function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const activeImage = images[index];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card/50 shadow-xl">
        <div className="flex h-[400px] items-center justify-center px-4 py-6 text-center text-sm text-muted-foreground">
          No images available for this project
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
        <Image
          src={activeImage?.src}
          alt={activeImage?.alt || ""}
          width={1200}
          height={700}
          className="h-auto w-full object-cover"
          priority
        />
        {activeImage?.caption && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-4 py-1 text-xs text-muted-foreground">
            {activeImage.caption}
          </div>
        )}
        {images.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="ml-3 rounded-full bg-background/80 shadow"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-3 rounded-full bg-background/80 shadow"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              className={`h-2.5 rounded-full transition ${
                idx === index ? "w-8 bg-primary" : "w-2.5 bg-border"
              }`}
              aria-label={`View slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
