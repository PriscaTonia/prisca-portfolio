"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/button";

const PANEL_ID = "mobile-menu";

/** Menu button + full-width panel, shown below 1020px (brief §4.3). */
export function MobileMenu() {
  const pathname = usePathname() ?? "/";
  // The menu is "open for" the path it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback((returnFocus = true) => {
    setOpenOn(null);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Escape to close, scroll lock, focus first link
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close() : setOpenOn(pathname))}
        className="inline-flex h-11 items-center gap-2.5 rounded-full border border-line-2 px-4 text-[14px] text-ink transition-colors duration-300 hover:bg-soft"
      >
        <span aria-hidden className="relative block h-[10px] w-4">
          <span
            className={cn(
              "absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-300",
              open && "translate-y-[4.25px] rotate-45"
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-[1.5px] w-4 bg-current transition-transform duration-300",
              open && "-translate-y-[4.25px] -rotate-45"
            )}
          />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      <div
        id={PANEL_ID}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-bg"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
          <ul>
            {mainNav.map((item, i) => {
              const active = item.match(pathname);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => close(false)}
                    className="flex items-baseline gap-4 py-4 text-[28px] font-medium leading-tight tracking-[-0.03em] text-ink"
                  >
                    <span className="font-mono text-[12px] tracking-[0.1em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {active ? (
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-link">
                        <span aria-hidden>● </span>Current
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={`mailto:${site.contact.email}`}
            className="group/btn mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-btn px-6 text-[15px] font-medium text-btn-ink"
          >
            Email me <Arrow />
          </a>
        </nav>
      </div>
    </>
  );
}
