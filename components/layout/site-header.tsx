import Link from "next/link";
import { Button, Arrow } from "@/components/ui/button";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-[17px] font-semibold tracking-[0.1em] text-ink">
        PRISCA<span className="text-accent">.</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] border-b border-line bg-bg">
      <div className="container-x flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label="Prisca Onwudebelu, home" className="rounded-sm py-2">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden nav:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2.5 nav:ml-4">
          <ThemeToggle />
          <Button asChild size="header" className="hidden tab:inline-flex">
            <Link href="/contact">
              Say hello <Arrow />
            </Link>
          </Button>
          <div className="nav:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
