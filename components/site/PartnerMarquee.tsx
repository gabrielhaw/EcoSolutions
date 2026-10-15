import Image from "next/image";
import { partners } from "@/lib/site";

/** Every logo covers roughly this many px², so wide and tall marks read at the same size. */
const LOGO_AREA = 6000;
const LOGO_MAX_H = 60;

function logoSize({ width, height }: { width: number; height: number }) {
  const ratio = width / height;
  const h = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / ratio));
  return { width: Math.round(h * ratio), height: Math.round(h) };
}

/**
 * Endless strip of partner logos (names where we have no logo). Pure CSS; pauses on hover.
 * Logos are greyscale until hovered; in dark mode they're inverted to stay visible.
 */
export default function PartnerMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {partners.map((p) => (
        <li key={p.name} className="flex items-center gap-14">
          {p.logo ? (
            <Image
              src={p.logo.src}
              alt={hidden ? "" : p.name}
              {...logoSize(p.logo)}
              className="max-w-none opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert dark:hover:grayscale"
            />
          ) : (
            <span className="whitespace-nowrap text-[1.35rem] font-medium tracking-tight text-fg-3 transition-colors hover:text-fg sm:text-[1.6rem]">
              {p.name}
            </span>
          )}
          <span aria-hidden className="size-1.5 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Organisations we've worked with" className="border-y border-line py-9">
      <p className="label mb-7 text-center text-fg-3">Worked with &amp; recognised by</p>
      <div className="mask-x group flex overflow-hidden">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
