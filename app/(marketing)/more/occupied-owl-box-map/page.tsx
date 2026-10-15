import type { Metadata } from "next";
import OwlBoxMap from "@/components/maps/OwlBoxMap";
import { Breadcrumbs, ButtonLink, CtaBand, Wrap } from "@/components/site/ui";
import { breadcrumbsFor } from "@/lib/content";
import { getOwlBoxes, OWL_MAP_GOOGLE } from "@/lib/owl-boxes";

const PATH = "/more/occupied-owl-box-map";
const TITLE = "Occupied owl box map";

// The map data is re-read from Google My Maps at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Occupied Owl Box Map: Gauteng",
  description:
    "Explore every occupied EcoSolutions owl box in Gauteng: Spotted Eagle Owls and Barn Owls, when each box was occupied, ring numbers and photos.",
  alternates: { canonical: PATH },
};

export default async function OccupiedOwlBoxMapPage() {
  const boxes = await getOwlBoxes();
  const count = (s: string) => boxes.filter((b) => b.species === s).length;
  const years = boxes.map((b) => b.occupiedYear).filter((y): y is number => !!y);
  // Calendar years from installation to first recorded occupancy, where both are known.
  const year = (s?: string) => Number(s?.match(/\d{4}/)?.[0]);
  const waits = boxes.filter((b) => b.installed && b.occupied).map((b) => year(b.occupied) - year(b.installed));
  const quick = waits.filter((w) => w >= 0 && w <= 2).length;
  const facts = [
    { figure: boxes.length, label: "occupied owl boxes on the map" },
    { figure: count("spotted"), label: "Spotted Eagle Owl boxes" },
    { figure: count("barn"), label: "Barn Owl boxes" },
    { figure: years.length ? Math.min(...years) : "—", label: "first recorded occupancy" },
  ];

  return (
    <>
      <header>
        <Wrap className="grid gap-8 pb-10 pt-10 lg:grid-cols-12 lg:items-end lg:pb-12 lg:pt-14">
          <div className="lg:col-span-7">
            <Breadcrumbs crumbs={breadcrumbsFor(PATH, TITLE)} />
            <h1 className="display mt-8 text-display-l">{TITLE}</h1>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-fg-2">
              Every pin is an EcoSolutions owl box in Gauteng where owls have moved in and raised their young. Select one to see the
              species, when it was occupied, ring numbers and photos from the box.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
            {facts.map((f) => (
              <li key={f.label} className="bg-canvas p-4 sm:p-5">
                <span className="display block text-[2rem] leading-none">{f.figure}</span>
                <span className="mt-2 block text-[13.5px] leading-snug text-fg-2">{f.label}</span>
              </li>
            ))}
          </ul>
        </Wrap>
      </header>

      <section aria-label="Map of occupied owl boxes" className="pb-10">
        <Wrap>
          <OwlBoxMap boxes={boxes} />
          <div className="mt-4 flex flex-col gap-3 text-[13.5px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Locations are shown at street level. The map updates as our team records new occupancies.</p>
            <a href={OWL_MAP_GOOGLE} rel="noopener" className="shrink-0 text-fg-2 underline underline-offset-2 hover:text-fg">
              Open in Google My Maps
            </a>
          </div>
        </Wrap>
      </section>

      <section className="py-10">
        <Wrap className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-canvas-2 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-display-m">Want owls on this map?</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-fg-2">
              {waits.length > 0 && `${quick} of the ${waits.length} boxes with both dates recorded were occupied within two years of going up. `}
              We site each box for the species in your area, install it and service it every year.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/owls-and-owl-boxes/join-the-owl-box-project">Join the Owl Box Project</ButtonLink>
            <ButtonLink href="/shop" variant="outline">
              Shop owl boxes
            </ButtonLink>
          </div>
        </Wrap>
      </section>

      <CtaBand />
    </>
  );
}
