"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { buyable, reconcile, type CartLine, type CartNotice, type LiveLookup } from "@/lib/cart-check";
import { checkoutUrl, formatRand, SHOP_ORIGIN } from "@/lib/shop";
import ShopImage from "./ShopImage";

export type { CartLine };

/** Result of checking the cart with Shopify: unchanged, updated (customer must review), or not checked. */
type Verdict = "ok" | "changed" | "error";
type CheckState = "idle" | "checking" | Verdict;

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (line: Omit<CartLine, "qty" | "soldOut">, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  check: CheckState;
  notices: CartNotice[];
  dismissNotices: () => void;
  verify: () => Promise<{ verdict: Verdict; lines: CartLine[] }>;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "eco-cart";

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const pathname = usePathname();
  // Remember the page the drawer was opened on, so navigating closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = useCallback((o: boolean) => setOpenedAt(o ? pathname : null), [pathname]);
  const [loaded, setLoaded] = useState(false);
  const [check, setCheck] = useState<CheckState>("idle");
  const [notices, setNotices] = useState<CartNotice[]>([]);
  const linesRef = useRef(lines);
  const checkSeq = useRef(0);

  // Restore the cart saved in this browser. It is kept through checkout, so a
  // customer who cancels or comes back from Shopify still has it; only "Empty
  // cart" clears it (see the note on clear below).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    linesRef.current = lines;
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  /**
   * Ask Shopify (via /api/cart, never the hourly cache or snapshot) about every
   * line, apply current prices and stock, and report anything that changed.
   * On failure the cart is left exactly as it was.
   */
  const checkNow = useCallback(async (): Promise<{ verdict: Verdict; lines: CartLine[] }> => {
    const current = linesRef.current;
    if (current.length === 0) return { verdict: "ok", lines: current };
    const seq = ++checkSeq.current;
    setCheck("checking");
    let live: LiveLookup;
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: current.map((l) => l.id) }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`cart check ${res.status}`);
      live = ((await res.json()) as { variants: LiveLookup }).variants;
      if (!live || typeof live !== "object") throw new Error("cart check: bad answer");
    } catch {
      if (seq === checkSeq.current) setCheck("error");
      return { verdict: "error", lines: linesRef.current };
    }
    // Reconcile against the cart as it is now, in case it changed while we waited.
    const result = reconcile(linesRef.current, live);
    const verdict: Verdict = result.notices.length ? "changed" : "ok";
    linesRef.current = result.lines;
    setLines(result.lines);
    if (result.notices.length) {
      setNotices((old) => [...old.filter((o) => !result.notices.some((n) => n.kind === o.kind && n.id === o.id)), ...result.notices]);
    }
    if (seq === checkSeq.current) setCheck(verdict);
    return { verdict, lines: result.lines };
  }, []);

  // Checks run one after another. If one still in flight (e.g. from opening the
  // drawer) changes the cart, a checkout click waiting on it reports "changed"
  // too, so the customer sees the change before paying.
  const inflight = useRef<Promise<{ verdict: Verdict; lines: CartLine[] }> | null>(null);
  const verify = useCallback(async () => {
    const prev = inflight.current;
    const run = (async () => {
      const before = prev ? await prev : null;
      const r = await checkNow();
      return before?.verdict === "changed" && r.verdict === "ok" ? { ...r, verdict: "changed" as const } : r;
    })();
    inflight.current = run;
    try {
      return await run;
    } finally {
      if (inflight.current === run) inflight.current = null;
    }
  }, [checkNow]);

  // Check whenever the drawer opens, including straight after "Add to cart".
  useEffect(() => {
    if (open && loaded) void verify();
  }, [open, loaded, verify]);

  const add = useCallback((line: Omit<CartLine, "qty" | "soldOut">, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === line.id);
      return found ? ls.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l)) : [...ls, { ...line, qty }];
    });
    setOpen(true);
  }, [setOpen]);

  const setQty = useCallback((id: number, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  /**
   * Explicit "Empty cart". The cart is deliberately not cleared on checkout or
   * on returning from Shopify, since neither proves an order was paid.
   * Clearing it automatically would need a confirmed-order signal from Shopify
   * (an orders/paid webhook or the Storefront API's cart that Shopify itself
   * empties on completion).
   */
  const clear = useCallback(() => {
    setLines([]);
    setNotices([]);
    setCheck("idle");
  }, []);

  const dismissNotices = useCallback(() => setNotices([]), []);

  const value = useMemo(() => {
    const live = buyable(lines);
    return {
      lines,
      open,
      setOpen,
      add,
      setQty,
      clear,
      check,
      notices,
      dismissNotices,
      verify,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: live.reduce((n, l) => n + l.qty * l.price, 0),
    };
  }, [lines, open, setOpen, add, setQty, clear, check, notices, dismissNotices, verify]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart (${count} item${count === 1 ? "" : "s"})`}
      className="relative grid size-10 place-items-center rounded-full border border-line-strong text-fg-2 transition-colors hover:text-fg"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 7h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 7Z" strokeLinejoin="round" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-5 text-canvas">
          {count}
        </span>
      )}
    </button>
  );
}

const named = (n: { title: string; variant: string }) => (n.variant === "Default Title" ? n.title : `${n.title} (${n.variant})`);

function noticeText(n: CartNotice) {
  switch (n.kind) {
    case "removed":
      return `${named(n)} is no longer available and was removed from your cart.`;
    case "price":
      return `${named(n)} changed price from ${formatRand(n.from)} to ${formatRand(n.to)}.`;
    case "soldout":
      return `${named(n)} has sold out. It stays in your cart but won't be included at checkout.`;
    case "back":
      return `${named(n)} is back in stock.`;
  }
}

function CartDrawer() {
  const { lines, open, setOpen, setQty, clear, total, check, notices, dismissNotices, verify } = useCart();
  const [going, setGoing] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const toBuy = buyable(lines);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // Back from Shopify via the back button restores this page as it was left
  // (mid-"Checking…"); reset the button and re-check what's in the cart.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setGoing(false);
      if (open) void verify();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [open, verify]);

  async function checkout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (going) return;
    setGoing(true);
    setNeedsReview(false);
    const { verdict, lines: checked } = await verify();
    const ready = buyable(checked);
    if (verdict === "ok" && ready.length) {
      // Only what actually goes to Shopify, at the prices just confirmed. Product
      // details only; nothing about the customer.
      track("begin_checkout", {
        currency: "ZAR",
        value: ready.reduce((n, l) => n + l.qty * l.price, 0),
        items: ready.map((l) => ({ item_id: l.handle, item_name: l.title, item_variant: l.variant, price: l.price, quantity: l.qty })),
      });
      // Counted here, not by the site-wide click listener, so a checkout the checks stop isn't a store visit.
      track("shop_visit", { cta: "checkout", cta_location: "cart", link_url: `${SHOP_ORIGIN}/cart` });
      window.location.href = checkoutUrl(ready);
      return;
    }
    // Changed: let the customer see what changed before paying. Error: the drawer shows a retry.
    if (verdict === "changed") setNeedsReview(true);
    setGoing(false);
  }

  return (
    <div aria-hidden={!open} inert={!open} className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-canvas shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <p className="text-lg font-medium tracking-tight">Your cart</p>
          <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-1.5 text-[14px] text-fg-2 hover:bg-canvas-2 hover:text-fg">
            Close
          </button>
        </div>

        {notices.length > 0 && (
          <div role="status" className="border-b border-line bg-accent-soft px-6 py-4 text-[14px] leading-snug">
            <p className="font-medium">Your cart was updated with our shop&apos;s current prices and stock:</p>
            <ul className="mt-2 grid list-disc gap-1 pl-5 text-fg-2">
              {notices.map((n) => (
                <li key={`${n.kind}:${n.id}`}>{noticeText(n)}</li>
              ))}
            </ul>
            <button type="button" onClick={dismissNotices} className="mt-2 text-[13px] text-fg-2 underline underline-offset-2 hover:text-fg">
              OK, got it
            </button>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-fg-2">Your cart is empty.</p>
            <Link href="/shop" className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-canvas">
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className={`flex gap-4 py-5 ${l.soldOut ? "opacity-70" : ""}`}>
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-canvas-2">
                    {l.image && <ShopImage aspect={1} src={l.image} alt="" fill sizes="80px" className={`object-cover ${l.soldOut ? "grayscale" : ""}`} />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/shop/${l.handle}`} className="font-medium leading-snug hover:text-accent">
                      {l.title}
                    </Link>
                    {l.variant !== "Default Title" && <p className="mt-0.5 text-[13px] text-fg-3">{l.variant}</p>}
                    {l.soldOut ? (
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <span className="text-[13px] font-medium text-fg-2">Sold out · not included at checkout</span>
                        <button type="button" onClick={() => setQty(l.id, 0)} className="text-[13px] text-fg-2 underline underline-offset-2 hover:text-fg">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-line-strong">
                          <button type="button" aria-label="Remove one" onClick={() => setQty(l.id, l.qty - 1)} className="grid size-8 place-items-center text-fg-2 hover:text-fg">
                            −
                          </button>
                          <span className="w-6 text-center text-[14px] tabular-nums">{l.qty}</span>
                          <button type="button" aria-label="Add one" onClick={() => setQty(l.id, l.qty + 1)} className="grid size-8 place-items-center text-fg-2 hover:text-fg">
                            +
                          </button>
                        </div>
                        <span className="text-[15px] tabular-nums">{formatRand(l.price * l.qty)}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-fg-2">Subtotal</span>
                <span className="text-xl font-medium tabular-nums">{formatRand(total)}</span>
              </div>
              <p className="mt-1 text-[13px] text-fg-3">Delivery or installation is confirmed at checkout.</p>

              {check === "error" && (
                <div role="alert" className="mt-4 rounded-2xl border border-line-strong px-4 py-3 text-[14px] leading-snug">
                  <p>We couldn&apos;t confirm current prices and stock with our shop just now. Your cart is saved.</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                    <button type="button" onClick={() => void verify()} className="font-medium text-accent underline underline-offset-2">
                      Try again
                    </button>
                    {toBuy.length > 0 && (
                      <a href={checkoutUrl(toBuy)} className="text-fg-2 underline underline-offset-2 hover:text-fg">
                        Continue to Shopify anyway (it confirms final prices and stock)
                      </a>
                    )}
                  </div>
                </div>
              )}
              {needsReview && (
                <p role="status" className="mt-4 text-[14px] font-medium">Please review the changes above, then continue to checkout.</p>
              )}

              <a
                href={toBuy.length ? checkoutUrl(toBuy) : undefined}
                data-track="manual"
                data-cta="checkout"
                data-cta-location="cart"
                onClick={checkout}
                aria-disabled={!toBuy.length || going}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-2 ${
                  !toBuy.length || going ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {going ? "Checking prices and stock…" : toBuy.length ? "Secure checkout →" : "Nothing available to check out"}
              </a>
              <p className="mt-3 text-center text-[12px] text-fg-3">
                {check === "checking" && !going
                  ? "Checking current prices and stock…"
                  : check === "ok" || check === "changed"
                    ? "Prices and stock checked with our shop just now. Payment is processed securely by Shopify."
                    : "Payment is processed securely by Shopify."}
              </p>

              <div className="mt-4 text-center text-[13px]">
                {confirmEmpty ? (
                  <span className="text-fg-2">
                    Remove everything from your cart?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setConfirmEmpty(false);
                        setNeedsReview(false);
                      }}
                      className="font-medium text-fg underline underline-offset-2"
                    >
                      Yes, empty it
                    </button>{" "}
                    ·{" "}
                    <button type="button" onClick={() => setConfirmEmpty(false)} className="underline underline-offset-2 hover:text-fg">
                      Keep it
                    </button>
                  </span>
                ) : (
                  <button type="button" onClick={() => setConfirmEmpty(true)} className="text-fg-3 underline underline-offset-2 hover:text-fg">
                    Empty cart
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
