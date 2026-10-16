import { MAX_CART_BODY, parseCartIds, type LiveLookup } from "@/lib/cart-check";
import { fetchLiveVariants } from "@/lib/shop";

const noStore = { "Cache-Control": "no-store" };

/**
 * The cart drawer posts its saved variant ids here when it opens and right
 * before checkout; the answer comes from Shopify at that moment (see
 * components/shop/Cart.tsx). 502 means Shopify couldn't be checked.
 */
export async function POST(req: Request) {
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
    console.error("[cart check]", err);
    return Response.json({ error: "Could not reach Shopify" }, { status: 502, headers: noStore });
  }
}
