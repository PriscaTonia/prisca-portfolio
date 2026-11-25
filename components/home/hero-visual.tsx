import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero visual: an abstract editorial composition (arch, sun, blob, slab,
 * hairline circle, print registration marks) collaged with fragments of
 * believable product UI (browser window, phone list, analytics card,
 * segmented control). Pure HTML/CSS/SVG, so it is crisp at any size and
 * follows the theme tokens. Sizes use container-query units (cqw) so the
 * whole composition scales as one piece. Decorative: hidden from AT.
 */

// Fine film grain, multiplied over the large shapes.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Layer({
  className,
  style,
  delay = 0,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children?: ReactNode;
}) {
  return (
    <div className={cn("fade-up absolute", className)} style={{ ...style, ["--delay" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}

/** Skeleton text line. */
const Bar = ({ w, h = 0.9, tone = "var(--line)", r = 99, className }: { w: string; h?: number; tone?: string; r?: number; className?: string }) => (
  <span className={cn("block", className)} style={{ width: w, height: `${h}cqw`, background: tone, borderRadius: r }} />
);

const Mark = ({ style }: { style: CSSProperties }) => (
  <span className="absolute text-muted" style={{ ...style, fontSize: "2.4cqw", lineHeight: 1 }}>
    +
  </span>
);

export function HeroVisual({ className }: { className?: string }) {
  return (
    <figure
      aria-label="Abstract composition of shapes and fragments of product interfaces"
      className={cn("relative mx-auto w-full max-w-[560px]", className)}
      style={{ containerType: "inline-size" }}
    >
      <div aria-hidden className="relative w-full" style={{ aspectRatio: "11 / 12" }}>
        {/* ── Abstract layer ─────────────────────────────── */}

        {/* hairline circle */}
        <Layer
          delay={0}
          className="rounded-full border border-line-2"
          style={{ left: "0%", top: "1%", width: "50cqw", height: "50cqw" }}
        />

        {/* arch: the focal backdrop */}
        <Layer
          delay={0.05}
          className="overflow-hidden"
          style={{
            left: "37%",
            top: "10%",
            width: "52%",
            height: "72%",
            borderRadius: "30cqw 30cqw 2cqw 2cqw",
            background: "linear-gradient(180deg, var(--soft) 0%, color-mix(in srgb, var(--tone-1) 75%, var(--soft)) 100%)",
          }}
        >
          <span className="absolute inset-0 opacity-[0.10] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
          {/* inner arch hairline */}
          <span
            className="absolute border border-bg/70"
            style={{ inset: "4cqw 4cqw -2cqw 4cqw", borderRadius: "26cqw 26cqw 0 0" }}
          />
        </Layer>

        {/* muted rose sun */}
        <Layer
          delay={0.1}
          className="rounded-full"
          style={{
            right: "5%",
            top: "1%",
            width: "15cqw",
            height: "15cqw",
            background: "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--accent) 70%, var(--bg)) 0%, var(--accent) 75%)",
            opacity: 0.9,
          }}
        />

        {/* beige organic blob */}
        <Layer delay={0.12} style={{ left: "-4%", bottom: "-2%", width: "52%" }}>
          <svg viewBox="0 0 300 220" className="block w-full">
            <defs>
              <filter id="hv-grain">
                <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
                <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .12 0" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
            </defs>
            <path
              d="M18 150C6 104 38 62 88 52c44-9 62-46 112-38 52 8 92 56 84 104-8 50-56 60-98 82-46 24-110 26-142-4-12-11-21-26-26-46z"
              fill="var(--tone-2)"
            />
            <path
              d="M18 150C6 104 38 62 88 52c44-9 62-46 112-38 52 8 92 56 84 104-8 50-56 60-98 82-46 24-110 26-142-4-12-11-21-26-26-46z"
              filter="url(#hv-grain)"
            />
          </svg>
        </Layer>

        {/* charcoal half-disc for contrast */}
        <Layer
          delay={0.14}
          className="bg-ink dark:opacity-80"
          style={{ left: "49%", bottom: "3%", width: "21cqw", height: "10.5cqw", borderRadius: "21cqw 21cqw 0 0" }}
        />

        {/* dot field */}
        <Layer delay={0.16} className="dot-grid opacity-80" style={{ left: "2%", top: "18%", width: "14cqw", height: "14cqw" }} />

        {/* dashed connector */}
        <Layer delay={0.2} style={{ inset: 0 }}>
          <svg viewBox="0 0 110 120" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M66 92 C 70 98, 72 101, 76 103"
              fill="none"
              stroke="var(--line-2)"
              strokeWidth=".35"
              strokeDasharray="1.2 1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Layer>

        {/* registration marks */}
        <Mark style={{ left: "1%", top: "64%" }} />
        <Mark style={{ right: "1%", top: "47%" }} />
        <Mark style={{ left: "48%", top: "0%" }} />

        {/* ── Product fragments ──────────────────────────── */}

        {/* browser window: the focal fragment */}
        <Layer
          delay={0.22}
          className="overflow-hidden border border-line bg-bg-2"
          style={{
            left: "5%",
            top: "31%",
            width: "58%",
            borderRadius: "2.2cqw",
            boxShadow: "0 3cqw 6cqw -4cqw var(--shadow)",
          }}
        >
          {/* chrome */}
          <div className="flex items-center gap-[1cqw] border-b border-line" style={{ padding: "1.6cqw 2cqw" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="rounded-full bg-line-2" style={{ width: "1.3cqw", height: "1.3cqw" }} />
            ))}
            <span className="ml-[2cqw] flex-1 rounded-full bg-bg" style={{ height: "2.4cqw" }} />
          </div>
          {/* app */}
          <div className="grid" style={{ gridTemplateColumns: "22% 1fr" }}>
            <div className="space-y-[1.6cqw] border-r border-line" style={{ padding: "2.4cqw 2cqw" }}>
              <Bar w="70%" h={1.2} tone="var(--ink)" />
              <span className="block rounded-full bg-soft" style={{ height: "2.6cqw" }} />
              <Bar w="80%" />
              <Bar w="60%" />
              <Bar w="72%" />
            </div>
            <div style={{ padding: "2.4cqw" }}>
              {/* hero image inside the app */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "16 / 8.5",
                  borderRadius: "1.4cqw",
                  background: "linear-gradient(135deg, var(--tone-4), var(--tone-1))",
                }}
              >
                <span
                  className="absolute rounded-full bg-bg/80"
                  style={{ right: "12%", top: "18%", width: "6cqw", height: "6cqw" }}
                />
                <span
                  className="absolute bg-tone-5"
                  style={{ left: "10%", bottom: 0, width: "18cqw", height: "10cqw", borderRadius: "9cqw 9cqw 0 0" }}
                />
                <span
                  className="absolute bg-tone-3"
                  style={{ left: "34%", bottom: 0, width: "12cqw", height: "6.5cqw", borderRadius: "6cqw 6cqw 0 0" }}
                />
              </div>
              <div className="mt-[2cqw] space-y-[1.2cqw]">
                <Bar w="58%" h={1.4} tone="var(--ink)" />
                <Bar w="86%" />
                <Bar w="70%" />
              </div>
              <div className="mt-[2.2cqw] grid grid-cols-3 gap-[1.4cqw]">
                {["var(--tone-3)", "var(--tone-2)", "var(--tone-6)"].map((t) => (
                  <div key={t} className="border border-line" style={{ borderRadius: "1.2cqw", padding: "1.2cqw" }}>
                    <span className="block" style={{ aspectRatio: "4 / 3", background: t, borderRadius: "0.8cqw" }} />
                    <Bar w="80%" h={0.8} className="mt-[1cqw]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layer>

        {/* phone fragment */}
        <Layer
          delay={0.3}
          className="overflow-hidden border border-line bg-bg"
          style={{
            right: "2%",
            top: "25%",
            width: "23%",
            aspectRatio: "9 / 17",
            borderRadius: "3.4cqw",
            rotate: "3deg",
            boxShadow: "0 3cqw 6cqw -4cqw var(--shadow)",
          }}
        >
          <div style={{ padding: "2.4cqw 2cqw" }}>
            <span className="mx-auto block rounded-full bg-line-2" style={{ width: "6cqw", height: "1cqw" }} />
            <Bar w="55%" h={1.3} tone="var(--ink)" className="mt-[3cqw]" />
            <div className="mt-[2.4cqw] space-y-[2cqw]">
              {["var(--tone-1)", "var(--tone-3)", "var(--tone-5)", "var(--tone-2)"].map((t, i) => (
                <div key={t} className="flex items-center gap-[1.4cqw]">
                  <span className="shrink-0 rounded-full" style={{ width: "3.6cqw", height: "3.6cqw", background: t }} />
                  <div className="flex-1 space-y-[0.8cqw]">
                    <Bar w={i % 2 ? "70%" : "88%"} h={0.8} tone="var(--line-2)" />
                    <Bar w="50%" h={0.7} />
                  </div>
                </div>
              ))}
            </div>
            {/* toggle */}
            <div className="mt-[3.4cqw] flex items-center justify-between">
              <Bar w="40%" h={0.8} />
              <span className="relative block rounded-full bg-accent" style={{ width: "5.4cqw", height: "3cqw" }}>
                <span
                  className="absolute rounded-full bg-bg"
                  style={{ right: "0.4cqw", top: "0.4cqw", width: "2.2cqw", height: "2.2cqw" }}
                />
              </span>
            </div>
          </div>
        </Layer>

        {/* analytics card */}
        <Layer
          delay={0.38}
          className="border border-line bg-bg-2"
          style={{
            right: "0%",
            bottom: "9%",
            width: "33%",
            borderRadius: "2.2cqw",
            padding: "2.4cqw",
            boxShadow: "0 3cqw 6cqw -4cqw var(--shadow)",
          }}
        >
          <div className="flex items-center justify-between">
            <Bar w="38%" h={0.8} tone="var(--line-2)" />
            <span className="rounded-full bg-soft" style={{ width: "6cqw", height: "2cqw" }} />
          </div>
          <Bar w="46%" h={2.2} tone="var(--ink)" r={4} className="mt-[1.6cqw]" />
          <svg viewBox="0 0 100 40" className="mt-[2cqw] block w-full">
            {[14, 22, 18, 30, 24, 36, 28].map((v, i) => (
              <rect
                key={i}
                x={i * 14.5 + 1}
                y={40 - v}
                width="9"
                height={v}
                rx="2"
                fill={i === 5 ? "var(--accent)" : "var(--line-2)"}
              />
            ))}
            <polyline
              points="5,24 19.5,18 34,20 48.5,10 63,15 77.5,4 92,9"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Layer>

        {/* segmented control */}
        <Layer
          delay={0.44}
          className="flex border border-line bg-bg-2"
          style={{
            left: "9%",
            bottom: "7%",
            width: "36%",
            padding: "0.8cqw",
            gap: "0.8cqw",
            borderRadius: "99px",
            boxShadow: "0 2cqw 4cqw -3cqw var(--shadow)",
          }}
        >
          <span className="flex-1 rounded-full bg-ink" style={{ height: "3.6cqw" }} />
          <span className="flex flex-1 items-center justify-center" style={{ height: "3.6cqw" }}>
            <Bar w="55%" h={0.8} tone="var(--line-2)" />
          </span>
          <span className="flex flex-1 items-center justify-center" style={{ height: "3.6cqw" }}>
            <Bar w="45%" h={0.8} tone="var(--line-2)" />
          </span>
        </Layer>
      </div>
    </figure>
  );
}
