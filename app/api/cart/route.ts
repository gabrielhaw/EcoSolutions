import { MAX_CART_BODY, parseCartIds, type LiveLookup } from "@/lib/cart-check";
import { clientKey, createLimiter } from "@/lib/rate-limit";
import { fetchLiveVariants, ShopifyBusyError } from "@/lib/shop";

const noStore = { "Cache-Control": "no-store" };

/**
 * Per visitor: a normal shop visit checks the cart a few times a minute (open,
 * checkout, retry); 30 leaves room for an office sharing one address.
 */
const perVisitor = createLimiter({ limit: 30, windowMs: 60_000 });

/**
 * The cart drawer posts its saved variant ids here when it opens and right
 * before checkout; the answer comes from Shopify at that moment (see
 * components/shop/Cart.tsx). 429/503 mean "too many checks, try again
 * shortly"; 502 means Shopify couldn't be checked. The cart treats all of them
 * as "not confirmed" and keeps the saved cart.
 */
export async function POST(req: Request) {
  const visitor = perVisitor(clientKey(req.headers));
  if (!visitor.ok) {
    return Response.json({ error: "Too many cart checks" }, { status: 429, headers: { ...noStore, "Retry-After": String(visitor.retryAfterSeconds) } });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_CART_BODY) {
    return Response.json({ error: "Request too large" }, { status: 413, headers: noStore });
  }
  const ids = parseCartIds(await req.text().catch(() => ""));
  if (!ids) return Response.json({ error: "Expected { ids: number[] }" }, { status: 400, headers: noStore });
  try {
    const live = await fetchLiveVariants();
    const variants: LiveLookup = Object.fromEntries(ids.map((id) => [id, live.get(id) ?? null]));
    return Response.json({ variants }, { headers: noStore });
  } catch (err) {
    if (err instanceof ShopifyBusyError) {
      return Response.json({ error: "Busy" }, { status: 503, headers: { ...noStore, "Retry-After": String(err.retryAfterSeconds) } });
    }
    console.error("[cart check]", err);
    return Response.json({ error: "Could not reach Shopify" }, { status: 502, headers: noStore });
  }
}
