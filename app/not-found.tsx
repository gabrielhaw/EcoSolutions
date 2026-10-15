import Link from "next/link";
import { LinkIndex, Wrap } from "@/components/site/ui";
import { sections } from "@/lib/site";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Wrap className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
      <div className="lg:col-span-5">
        <p className="label text-fg-3">404</p>
        <h1 className="display mt-6 text-display-l">This page has flown the box.</h1>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-fg-2">
          It may have moved when we rebuilt the site. Try one of these, or{" "}
          <Link href="/contact-us" className="link-underline text-fg">
            ask us directly
          </Link>
          .
        </p>
      </div>
      <div className="lg:col-span-7">
        <LinkIndex links={sections.map((s) => ({ label: s.label, href: s.href, blurb: s.intro.split(". ")[0] + "." }))} />
      </div>
    </Wrap>
  );
}
