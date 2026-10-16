import { ButtonLink, Wrap } from "@/components/site/ui";
import { site } from "@/lib/site";

// Next.js also adds noindex to every 404 response; this keeps it explicit.
export const metadata = { title: "Product not found", robots: { index: false } };

/**
 * Shown for /shop/<handle> when the store doesn't list that product, e.g. an old
 * newsletter link to something discontinued. Deliberately doesn't name the
 * product or suggest alternatives: we can't know what replaced it.
 */
export default function ProductNotFound() {
  const mobile = site.phone.mobile.replace("+27 ", "0");
  return (
    <Wrap className="py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="label text-fg-3">Shop</p>
        <h1 className="display mt-6 text-display-l">This product isn’t in our shop right now</h1>
        <p className="mt-6 text-[17px] leading-relaxed text-fg-2">
          It may have been discontinued, or it may be out of stock for now. To ask about availability, email us at{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-fg">
            {site.email}
          </a>{" "}
          or WhatsApp{" "}
          <a href={`https://wa.me/${site.whatsapp}`} rel="noopener" className="link-underline text-fg">
            {mobile}
          </a>
          .
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/shop">Browse the shop</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="outline">
            Email us
          </ButtonLink>
          <ButtonLink href={`https://wa.me/${site.whatsapp}`} variant="outline">
            WhatsApp us
          </ButtonLink>
        </div>
      </div>
    </Wrap>
  );
}
