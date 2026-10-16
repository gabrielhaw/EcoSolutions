import Link from "next/link";
import Image from "next/image";
import { menu, site } from "@/lib/site";
import HeaderShell from "./HeaderShell";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { CartButton } from "@/components/shop/Cart";

function MenuLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="EcoSolutions home">
          <Image src="/brand/logo-ink.png" alt="EcoSolutions — Integrated Pest Management" width={1200} height={293} priority sizes="160px" className="h-8 w-auto dark:hidden sm:h-9" />
          <Image src="/brand/logo-white.png" alt="EcoSolutions — Integrated Pest Management" width={1200} height={292} priority sizes="160px" className="hidden h-8 w-auto dark:block sm:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 text-[14.5px]">
            {menu.map((m) => (
              <li key={m.href} className="group relative">
                <Link href={m.href} className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-fg-2 transition-colors hover:bg-fg/[0.07] hover:text-fg">
                  {m.label}
                  {m.items && (
                    <svg aria-hidden width="9" height="9" viewBox="0 0 10 10" className="opacity-50 transition-transform duration-300 group-hover:rotate-180">
                      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  )}
                </Link>
                {m.items && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid w-[600px] grid-cols-[1fr_230px] gap-2 rounded-2xl border border-line bg-canvas p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
                      <ul className="p-2">
                        {m.items.map((c) => (
                          <li key={c.href}>
                            <MenuLink href={c.href} className="group/item flex items-center justify-between rounded-lg px-3 py-2.5 text-[14.5px] text-fg-2 transition-colors hover:bg-fg/[0.06] hover:text-fg">
                              {c.label}
                              <span aria-hidden className="-translate-x-1 text-accent opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100">
                                →
                              </span>
                            </MenuLink>
                          </li>
                        ))}
                        <li className="mt-2 border-t border-line pt-2">
                          <Link href={m.href} className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-accent hover:bg-fg/[0.06]">
                            Everything on {m.label.toLowerCase()} →
                          </Link>
                        </li>
                      </ul>
                      {m.image && (
                        <Link href={m.href} data-theme="dark" className="relative flex min-h-60 flex-col justify-end overflow-hidden rounded-xl p-4">
                          <Image src={m.image} alt="" fill sizes="230px" className="object-cover" />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <span className="relative text-[13px] leading-snug text-fg">{m.intro}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2" data-cta-location="header">
          <ThemeToggle className="hidden sm:grid" />
          <a
            href={`tel:${site.phone.mobile.replace(/[^+\d]/g, "")}`}
            aria-label={`Call us on ${site.phone.mobile}`}
            className="grid size-10 place-items-center rounded-full border border-line-strong bg-canvas/40 backdrop-blur-md sm:hidden"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
            </svg>
          </a>
          <CartButton />
          <Link
            href="/contact-us"
            data-track="enquiry_click"
            data-cta="contact_our_team"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-canvas transition-colors hover:bg-accent-2 sm:inline-flex"
          >
            Contact our team
          </Link>
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  );
}
