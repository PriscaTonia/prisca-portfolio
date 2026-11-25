"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectImage } from "@/data/types";
import { cld } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/button";
import { ProjectMedia } from "./project-media";

const MAX = 10;
const pad = (n: number) => String(n).padStart(2, "0");
const ratioOf = (img: ProjectImage, fallback: string) =>
  img.width && img.height ? `${img.width}/${img.height}` : fallback;

function Tile({
  img,
  i,
  total,
  fallback,
  sizes,
  onOpen,
}: {
  img: ProjectImage;
  i: number;
  total: number;
  fallback: string;
  sizes: string;
  onOpen: (i: number, opener: HTMLElement) => void;
}) {
  return (
    <figure>
      <button
        type="button"
        onClick={(e) => onOpen(i, e.currentTarget)}
        aria-label={`Open image ${i + 1} of ${total} in the gallery: ${img.alt}`}
        className="group block w-full cursor-zoom-in rounded-[18px] text-left"
      >
        <ProjectMedia image={img} ratio={ratioOf(img, fallback)} fit="natural" label={img.alt} sizes={sizes} />
      </button>
      {img.caption ? <figcaption className="mono-meta mt-3">{img.caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Showcase (brief §7.3 #8) + lightbox. The first three images sit in a
 * 7fr/5fr grid; every image (max 10) opens in a modal gallery.
 */
export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const all = images.slice(0, MAX);
  const [index, setIndex] = React.useState(0);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const touchX = React.useRef<number | null>(null);

  const open = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialogRef.current?.close();
  const go = React.useCallback((d: number) => setIndex((i) => (i + d + all.length) % all.length), [all.length]);

  React.useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      openerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [go]);

  if (!all.length) return null;
  const current = all[index];
  const [first, ...rest] = all.slice(0, 3);

  return (
    <>
      <div className="grid items-start gap-5 desk:grid-cols-[7fr_5fr]">
        <Tile img={first} i={0} total={all.length} onOpen={open} fallback="4/3" sizes="(min-width: 960px) 50vw, 92vw" />
        {rest.length ? (
          <div className="grid content-start gap-5">
            {rest.map((img, k) => (
              <Tile key={img.src} img={img} i={k + 1} total={all.length} onOpen={open} fallback="16/10" sizes="(min-width: 960px) 36vw, 92vw" />
            ))}
          </div>
        ) : null}
      </div>

      {all.length > 3 ? (
        <button
          type="button"
          onClick={(e) => open(3, e.currentTarget)}
          className="group/btn mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-line-2 px-6 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-soft"
        >
          View all {all.length} images
          <span className="font-mono text-[12px] text-muted">+{all.length - 3}</span>
          <Arrow />
        </button>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label={`${title} image gallery`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-bg p-0 text-ink backdrop:bg-black/60"
        onClick={(e) => {
          // click on the bare backdrop area closes
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex h-full flex-col">
          {/* Top bar */}
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between gap-4 border-b border-line">
            <p className="label">
              {title} · <span className="text-ink">{pad(index + 1)}</span> / {pad(all.length)}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-2 px-4 text-[14px] text-ink transition-colors duration-300 hover:bg-soft"
            >
              Close <span aria-hidden>×</span>
            </button>
          </div>

          {/* Stage */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6 tab:px-20"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <figure className="flex max-h-full min-h-0 max-w-[1400px] flex-col items-center">
              <Image
                key={current.src}
                src={cld(current.src)}
                alt={current.alt}
                width={current.width ?? 1600}
                height={current.height ?? 1000}
                sizes="(min-width: 1440px) 1400px, 92vw"
                className="fade-up h-auto max-h-[calc(100dvh-var(--header-h)-190px)] w-auto max-w-full rounded-[14px] border border-line object-contain"
              />
              <figcaption aria-live="polite" className="mt-4 max-w-[70ch] text-center text-[15px] text-muted">
                {current.caption ?? current.alt}
              </figcaption>
            </figure>

            {all.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-bg text-ink transition-colors duration-300 hover:bg-soft tab:inline-flex"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-bg text-ink transition-colors duration-300 hover:bg-soft tab:inline-flex"
                >
                  →
                </button>
              </>
            ) : null}
          </div>

          {/* Thumbnails */}
          <div className="shrink-0 border-t border-line">
            <ol className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3">
              {all.map((img, i) => (
                <li key={img.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1}: ${img.alt}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "relative block h-14 w-24 overflow-hidden rounded-[8px] border-2 transition-[border-color,opacity] duration-300",
                      i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={cld(img.src, { w: 240 })} alt="" fill sizes="96px" className="object-cover object-left-top" />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </dialog>
    </>
  );
}
