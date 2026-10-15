import type { Metadata } from "next";
import ShopGrid from "@/components/shop/ShopGrid";
import { Breadcrumbs, Wrap } from "@/components/site/ui";
import { categories, getProducts, type Category } from "@/lib/shop";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop Owl Boxes, Bat Houses & Services",
  description:
    "Buy EcoSolutions owl boxes, bat houses, annual services and consultations online. Made and installed in Gauteng. Poison-free pest control that lasts.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const [products, { c }] = await Promise.all([getProducts(), searchParams]);
  const initial = categories.some((x) => x.id === c) ? (c as Category) : undefined;

  return (
    <>
      <header>
        <Wrap className="pt-10 lg:pt-14">
          <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="label text-accent">Shop</p>
            <h1 className="display mt-4 text-display-l">Owl boxes, bat houses &amp; the services that keep them occupied.</h1>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-fg-2">
            {["Made by our own team", "Installation in Gauteng", "Secure checkout via Shopify"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Wrap>
      </header>
      <section className="pb-20 pt-10 sm:pb-28">
        <Wrap>
          <ShopGrid products={products} initial={initial} />
        </Wrap>
      </section>
    </>
  );
}
