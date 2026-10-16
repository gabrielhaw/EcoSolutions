"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { checkoutUrl, formatRand, shopImg } from "@/lib/shop";

export type CartLine = {
  id: number;
  qty: number;
  handle: string;
  title: string;
  variant: string;
  price: number;
  image?: string;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
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

  // Restore the cart saved in this browser (a convenience; Shopify holds the real order).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === line.id);
      return found ? ls.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l)) : [...ls, { ...line, qty }];
    });
    setOpen(true);
  }, [setOpen]);

  const setQty = useCallback((id: number, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const value = useMemo(
    () => ({
      lines,
      open,
      setOpen,
      add,
      setQty,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    [lines, open, setOpen, add, setQty],
  );

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

function CartDrawer() {
  const { lines, open, setOpen, setQty, total } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

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
                <li key={l.id} className="flex gap-4 py-5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-canvas-2">
                    {l.image && <Image src={shopImg(l.image, 200)} alt="" fill unoptimized className="object-cover" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link href={`/shop/${l.handle}`} className="font-medium leading-snug hover:text-accent">
                      {l.title}
                    </Link>
                    {l.variant !== "Default Title" && <p className="mt-0.5 text-[13px] text-fg-3">{l.variant}</p>}
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
              <a
                href={checkoutUrl(lines)}
                data-cta="checkout"
                data-cta-location="cart"
                onClick={() =>
                  track("begin_checkout", {
                    currency: "ZAR",
                    value: total,
                    items: lines.map((l) => ({ item_id: l.handle, item_name: l.title, item_variant: l.variant, price: l.price, quantity: l.qty })),
                  })
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-medium text-canvas transition-colors hover:bg-accent-2"
              >
                Secure checkout →
              </a>
              <p className="mt-3 text-center text-[12px] text-fg-3">Payment is processed securely by Shopify.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
