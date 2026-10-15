import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyBox from "@/components/shop/BuyBox";
import { Breadcrumbs, JsonLd, Wrap } from "@/components/site/ui";
import { categories, getProduct, getProducts, shopImg } from "@/lib/shop";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ handle: p.handle }));
}

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).handle);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary.slice(0, 158),
    alternates: { canonical: `/shop/${p.handle}` },
    openGraph: { images: p.images[0] ? [{ url: p.images[0].src }] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const [product, all] = await Promise.all([getProduct(handle), getProducts()]);
  if (!product) notFound();
  const cat = categories.find((c) => c.id === product.category)!;
  const related = all.filter((p) => p.category === product.category && p.handle !== product.handle).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.summary,
          image: product.images.map((i) => i.src),
          brand: { "@type": "Brand", name: site.name },
          offers: product.variants
            .filter((v) => v.price > 0)
            .map((v) => ({
              "@type": "Offer",
              name: v.title,
              price: v.price.toFixed(2),
              priceCurrency: "ZAR",
              availability: v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `${site.url}/shop/${product.handle}`,
            })),
        }}
      />
      <Wrap className="pb-20 pt-10 lg:pt-14">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: cat.label, href: `/shop?c=${cat.id}` },
            { name: product.title, href: `/shop/${product.handle}` },
          ]}
        />
        <div className="mt-8">
          <BuyBox product={product} />
        </div>

        <section className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
          <h2 className="label text-fg-3 lg:col-span-3">Details</h2>
          <div className="prose-eco lg:col-span-9" dangerouslySetInnerHTML={{ __html: product.html }} />
        </section>

        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-display-m">More {cat.label.toLowerCase()}</h2>
              <Link href={`/shop?c=${cat.id}`} className="link-underline text-[15px]">
                See all
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.handle}>
                  <Link href={`/shop/${r.handle}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-canvas-2">
                      {r.images[0] && <Image src={shopImg(r.images[0].src, 700)} alt={r.images[0].alt} fill unoptimized className="object-cover transition duration-700 group-hover:scale-105" />}
                    </div>
                    <p className="mt-3 font-medium tracking-tight group-hover:text-accent">{r.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Wrap>
    </>
  );
}
