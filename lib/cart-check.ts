/**
 * Checking a saved cart against Shopify as it is right now. Kept free of React
 * and data imports so the rules can be tested on their own.
 *
 * Lines are matched by exact variant id only: a line whose variant has gone is
 * removed and reported, never swapped for another option of the same product.
 */

export type CartLine = {
  id: number;
  qty: number;
  handle: string;
  title: string;
  variant: string;
  price: number;
  image?: string;
  /** Set when Shopify last reported this variant as sold out; left out of checkout. */
  soldOut?: boolean;
};

/** A variant as Shopify reports it live (see fetchLiveVariants in lib/shop.ts). */
export type LiveVariant = { id: number; handle: string; title: string; variant: string; price: number; available: boolean };

/** Live answer per requested variant id; null means Shopify no longer has it. */
export type LiveLookup = Record<string, LiveVariant | null>;

export type CartNotice =
  | { kind: "removed"; id: number; title: string; variant: string }
  | { kind: "price"; id: number; title: string; variant: string; from: number; to: number }
  | { kind: "soldout"; id: number; title: string; variant: string }
  | { kind: "back"; id: number; title: string; variant: string };

export function reconcile(lines: CartLine[], live: LiveLookup): { lines: CartLine[]; notices: CartNotice[] } {
  const next: CartLine[] = [];
  const notices: CartNotice[] = [];
  for (const line of lines) {
    // Added while the check was in flight: nothing to compare yet.
    if (!(String(line.id) in live)) {
      next.push(line);
      continue;
    }
    const v = live[line.id];
    if (!v) {
      notices.push({ kind: "removed", id: line.id, title: line.title, variant: line.variant });
      continue;
    }
    const named = { id: line.id, title: v.title, variant: v.variant };
    if (!v.available && !line.soldOut) notices.push({ kind: "soldout", ...named });
    if (v.available && line.soldOut) notices.push({ kind: "back", ...named });
    if (v.price !== line.price) notices.push({ kind: "price", ...named, from: line.price, to: v.price });
    next.push({ ...line, handle: v.handle, title: v.title, variant: v.variant, price: v.price, soldOut: !v.available || undefined });
  }
  return { lines: next, notices };
}

/** Lines that can go to Shopify's checkout. */
export const buyable = (lines: CartLine[]) => lines.filter((l) => !l.soldOut && l.qty > 0);

/** Largest request body /api/cart accepts: 100 ids fit in well under 4 KB. */
export const MAX_CART_BODY = 4096;
export const MAX_CART_IDS = 100;

/** The variant ids in a /api/cart request body, or null if it isn't `{ ids: number[] }` within the limits. */
export function parseCartIds(text: string): number[] | null {
  if (text.length > MAX_CART_BODY) return null;
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return null;
  }
  const ids = (body as { ids?: unknown } | null)?.ids;
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > MAX_CART_IDS) return null;
  return ids.every((id) => Number.isSafeInteger(id) && id > 0) ? [...new Set(ids as number[])] : null;
}
