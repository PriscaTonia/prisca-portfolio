/**
 * Typographic illustration for the hero (brief §4.6): an annotated, half-built
 * project card in HTML/CSS. Decorative; hidden below 620px.
 */
export function HeroFigure() {
  return (
    <figure aria-label="Illustration: an annotated project card being built" className="relative hidden tab:block">
      <div aria-hidden className="relative mx-auto max-w-[420px] pb-2 pl-8 pr-6 pt-10">
        {/* annotations */}
        <span className="absolute left-8 top-2 font-mono text-[12px] text-link">&lt;ProjectCard /&gt;</span>
        <span className="absolute -right-1 top-[46%] origin-center rotate-90 font-mono text-[11px] text-muted">
          w: fluid
        </span>

        {/* card */}
        <div className="rounded-[20px] border border-line bg-bg-2 p-4 shadow-[0_30px_60px_-30px_var(--shadow)]">
          <div className="rounded-[14px] border border-dashed border-accent p-3">
            {/* photo grid */}
            <div className="relative grid grid-cols-3 gap-2">
              <span className="col-span-2 row-span-2 aspect-square rounded-[8px] bg-tone-1" />
              <span className="aspect-square rounded-[8px] bg-tone-3" />
              <span className="aspect-square rounded-[8px] bg-tone-2" />
              <span className="absolute -bottom-5 right-0 font-mono text-[10.5px] text-muted">gap 8</span>
            </div>
            {/* title row */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <span className="text-[20px] font-medium tracking-[-0.02em] text-ink">Summer, bound</span>
              <span className="rounded-full border border-dashed border-muted px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                Draft
              </span>
            </div>
            {/* skeleton text */}
            <span className="mt-3 block h-2 w-full rounded-full bg-line" />
            <span className="mt-2 block h-2 w-3/5 rounded-full bg-line" />
            {/* pill button */}
            <span className="mt-5 inline-flex h-8 items-center rounded-full bg-btn px-4 text-[12.5px] font-medium text-btn-ink">
              Preview →
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-5 flex max-w-[420px] items-baseline gap-3 pl-8">
        <span className="font-mono text-[12px] text-muted">Fig. 01</span>
        <span className="serif text-[20px] text-ink">The details are the work.</span>
      </figcaption>
    </figure>
  );
}
