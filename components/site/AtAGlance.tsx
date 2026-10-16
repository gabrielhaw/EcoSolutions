import CountUp from "@/components/site/CountUp";
import type { Fact } from "@/lib/seo";

/** "9,000+" → count up to 9000 then "+"; "~2,000" keeps its "~"; ranges ("2–3") and words stay as written. */
function Figure({ figure }: { figure: string }) {
  const m = figure.match(/^([^\d]*)(\d[\d,]*)(\D*)$/);
  if (!m) return <>{figure}</>;
  const [, prefix, digits, suffix] = m;
  return (
    <>
      {prefix}
      <CountUp to={Number(digits.replace(/,/g, ""))} suffix={suffix} />
    </>
  );
}

/**
 * Key figures for a page, on a dark band between the title and the article.
 * Numbers count up as the band scrolls into view; on phones the facts sit in
 * a row you swipe through.
 */
export default function AtAGlance({ facts }: { facts: Fact[] }) {
  return (
    <section aria-label="At a glance" data-theme="dark" className="overflow-hidden rounded-3xl bg-deep">
      <div className="flex items-baseline justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="label text-accent">At a glance</p>
        <p aria-hidden className="label text-fg-3 lg:hidden">
          Swipe →
        </p>
      </div>
      <ul tabIndex={0} aria-label="Key facts" className="mt-2 flex snap-x snap-mandatory overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-accent [scrollbar-width:none] lg:grid lg:snap-none lg:overflow-visible lg:pb-0 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ "--n": facts.length } as React.CSSProperties}>
        {facts.map((f, i) => (
          <li
            key={f.figure + i}
            className="group relative w-[78%] shrink-0 snap-start border-l border-line px-6 py-6 first:border-l-0 sm:w-[45%] sm:px-8 sm:py-8 lg:w-auto"
            data-reveal
            style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
          >
            {/* Accent rule that draws across on hover */}
            <span aria-hidden className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-8" />
            <span className="display block text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
              <Figure figure={f.figure} />
            </span>
            <span className="mt-4 block max-w-[28ch] text-[15px] leading-snug text-fg-2">{f.label}</span>
            {f.source && <span className="mt-4 block font-mono text-[11.5px] uppercase tracking-[0.08em] text-fg-3">{f.source}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
