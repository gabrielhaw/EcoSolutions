/**
 * GA4 events sent by this site. See docs/TRACKING.md for what each one means
 * and which to mark as key events.
 *
 * Nothing a visitor types is ever sent: forms live inside Zoho's iframe, and
 * events carry only fixed labels from our own code (which button, which form,
 * which section of the page). Query strings are dropped from any URL we send.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** The store, which shares the GA4 property through cross-domain measurement. */
export const SHOP_HOSTS = ["shop.ecosolutions.co.za", "ecosolutions.myshopify.com"];

export type EventName =
  /** A visitor clicked a button that leads to an enquiry form or the contact page. Not a lead. */
  | "enquiry_click"
  /** An embedded Zoho form scrolled into view. Not a lead. */
  | "form_view"
  /** Zoho redirected to /enquiry-received after a completed submission. The only lead event. */
  | "generate_lead"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  /** A link that leaves for the Shopify store (product page, collection or checkout). */
  | "shop_visit"
  | "begin_checkout";

type Params = Record<string, string | number | undefined | Record<string, string | number>[]>;

type Gtag = (command: "event", name: string, params?: Params) => void;

export function track(name: EventName, params: Params = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (!gtag) return;
  gtag("event", name, params);
}

/** A URL without its query string or fragment, which can carry personal data. */
export function bareUrl(href: string) {
  try {
    const u = new URL(href, window.location.href);
    return `${u.origin}${u.pathname}`;
  } catch {
    return undefined;
  }
}
