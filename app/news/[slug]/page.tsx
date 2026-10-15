import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand, JsonLd, Wrap } from "@/components/site/ui";
import { getNewsArticle, metaDescription, news } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo";
import { withSubheadings } from "@/lib/subheadings";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.filter((n) => n.kind === "article" && getNewsArticle(n.slug)).map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getNewsArticle(decodeURIComponent((await params).slug));
  if (!a) return {};
  const description = metaDescription(a.item.description || a.page.description || a.page.html);
  return {
    title: a.page.title,
    description,
    alternates: { canonical: a.item.path },
    openGraph: {
      type: "article",
      url: a.item.path,
      title: a.page.title,
      description,
      publishedTime: a.item.date ?? undefined,
      images: a.page.image ? [{ url: a.page.image.src }] : undefined,
    },
  };
}

export default async function NewsArticle({ params }: Props) {
  const a = getNewsArticle(decodeURIComponent((await params).slug));
  if (!a) notFound();
  const { item, page } = a;
  const date = item.date
    ? new Date(item.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const more = news.filter((n) => n.kind === "article" && n.slug !== item.slug).slice(0, 5);
  const heroImg = page.image && (page.image.w ?? 0) >= 900 && !page.html.includes(page.image.src) ? page.image : null;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          path: item.path,
          title: page.title,
          description: item.description || page.description,
          image: page.image?.src,
          date: item.date,
          modified: page.modified,
        })}
      />
      <header className="border-b border-line">
        <Wrap className="pb-12 pt-10 lg:pb-16 lg:pt-14">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "News", href: "/news" },
              { name: page.title, href: item.path },
            ]}
          />
          <div className="mt-8 max-w-4xl">
            {date && (
              <p className="label text-fg-3">
                <time dateTime={item.date!}>{date}</time>
                {item.author && ` · ${item.author}`}
              </p>
            )}
            <h1 className="display mt-4 text-display-l">{page.title}</h1>
            {(item.description || page.description) && (
              <p className="mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-fg-2">{item.description || page.description}</p>
            )}
          </div>
        </Wrap>
      </header>

      {heroImg && (
        <Wrap className="pt-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-canvas-2">
            <Image src={heroImg.src} alt={page.title} fill priority sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover" />
          </div>
        </Wrap>
      )}

      <Wrap className="grid gap-14 py-14 lg:grid-cols-12 lg:py-20">
        <article className="prose-eco min-w-0 lg:col-span-8" dangerouslySetInnerHTML={{ __html: withSubheadings(page.html, page.path) }} />
        <aside className="lg:col-span-4">
          <p className="label text-fg-3">More from EcoSolutions</p>
          <ul className="mt-4 border-t border-line">
            {more.map((n) => (
              <li key={n.slug} className="border-b border-line">
                <Link href={n.path} className="block py-3.5 text-[15px] leading-snug text-fg-2 hover:text-fg">
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/news" className="link-underline mt-5 inline-block text-[15px]">
            All news
          </Link>
        </aside>
      </Wrap>

      <CtaBand />
    </>
  );
}
