import Image from "next/image";
import { partners } from "@/lib/site";

/** Every logo covers roughly this many px², so wide and tall marks read at the same size. */
const LOGO_AREA = 4200;
const LOGO_MAX_H = 48;

function logoSize({ width, height }: { width: number; height: number }) {
  const ratio = width / height;
  const h = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / ratio));
  return { width: Math.round(h * ratio), height: Math.round(h) };
}

/**
 * Endless strip of partner logos, each captioned with what the relationship
 * was so none reads as an endorsement. Only partners with a recorded relation
 * (lib/site.ts) are shown. Pure CSS; pauses on hover and stands still for
 * reduced motion. Logos are greyscale until hovered; inverted in dark mode.
 */
export default function PartnerMarquee() {
  const shown = partners.filter((p) => p.logo && p.relation);
  // Few logos fill less than a screen width, so repeat the list within each half of the loop.
  const reps = Math.max(1, Math.ceil(8 / shown.length));
  const list = Array.from({ length: reps }, () => shown).flat();
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-start gap-14 pr-14">
      {list.map((p, i) => (
        <li key={`${p.name}-${i}`} aria-hidden={(!hidden && i >= shown.length) || undefined} className="flex w-44 flex-col items-center gap-2 text-center">
          <span className="flex h-12 items-center">
            <Image
              src={p.logo!.src}
              alt={hidden || i >= shown.length ? "" : p.name}
              {...logoSize(p.logo!)}
              className="max-w-none opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert dark:hover:grayscale"
            />
          </span>
          <span className="text-[12.5px] leading-snug text-fg-3">{p.relation}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="partners-heading" className="border-y border-line py-7">
      <h2 id="partners-heading" className="label mb-5 text-center text-fg-3">
        Projects and recognition
      </h2>
      <div className="mask-x group flex overflow-hidden">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
