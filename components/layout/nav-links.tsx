"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

/** Desktop navigation (≥ 1020px). */
export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="flex items-center gap-7">
      {mainNav.map((item) => {
        const active = item.match(pathname);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative py-2 text-[15px] transition-colors duration-300 hover:text-ink",
                active ? "text-ink" : "text-muted",
                // 1.5px accent underline that scales in from the left
                "after:absolute after:inset-x-0 after:bottom-0.5 after:h-[1.5px] after:origin-left after:bg-accent",
                "after:transition-transform after:duration-500 after:ease-brand",
                active ? "after:scale-x-100" : "after:scale-x-0"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
