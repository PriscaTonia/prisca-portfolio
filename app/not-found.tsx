import Link from "next/link";
import { Container } from "@/components/layout/section";
import { Button, Arrow } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[64vh] flex-col justify-center py-[clamp(64px,8vw,120px)]">
      <p className="label">404 — Page not found</p>
      <h1 className="serif mt-4 text-[clamp(96px,18vw,240px)] leading-[0.9] text-accent">Lost?</h1>
      <p className="t-lead mt-6 max-w-[40ch] text-muted">
        This page doesn&apos;t exist, or it moved during the redesign. These will get you somewhere useful.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">
            Home <Arrow />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/work">See the work</Link>
        </Button>
      </div>
    </Container>
  );
}
