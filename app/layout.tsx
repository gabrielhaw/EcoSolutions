import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { CartProvider } from "@/components/shop/Cart";
import ChatLauncher from "@/components/site/ChatLauncher";
import NavProgress from "@/components/site/NavProgress";
import { JsonLd } from "@/components/site/ui";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" });

// Dev only: report browser errors (and whether the page came alive) to the dev server's terminal.
const devLogScript = `(function(){function s(k,m){try{navigator.sendBeacon("/api/dev-log",JSON.stringify({k:k,m:String(m).slice(0,800),u:location.href,w:innerWidth}))}catch(e){}}addEventListener("error",function(e){s("error",(e.message||"")+" @ "+(e.filename||(e.target&&(e.target.src||e.target.href))||"")+":"+(e.lineno||""))},true);addEventListener("unhandledrejection",function(e){s("rejection",e.reason&&(e.reason.stack||e.reason))});var ce=console.error;console.error=function(){s("console",[].map.call(arguments,String).join(" "));return ce.apply(console,arguments)};addEventListener("load",function(){setTimeout(function(){s("status",(document.querySelector("[data-hydrated]")?"hydrated":"NOT hydrated")+" text="+document.body.innerText.length)},6000)})})()`;
const themeScript = `(function(){var d=document.documentElement,t;try{t=sessionStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){var h=new Date().getHours();t=h>=18||h<6?"dark":"light"}d.dataset.theme=t;d.classList.add("js")})()`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Poison-Free Pest Control Johannesburg | EcoSolutions",
    template: "%s | EcoSolutions",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: site.legalName,
    title: "EcoSolutions — poison-free pest control",
    description: site.description,
    images: [{ url: "/images/barn-owl-with-rat.jpg", width: 1800, height: 1012, alt: "A barn owl carrying a rat" }],
  },
  twitter: { card: "summary_large_image", site: "@EcoSolutionsSA" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  category: "Pest control",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#141a17" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Before paint: pick light/dark (a choice made this visit, else by time of day) and mark JS as available. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {process.env.NODE_ENV === "development" && <script dangerouslySetInnerHTML={{ __html: devLogScript }} />}
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
        <NavProgress />
        <ChatLauncher />
      </body>
    </html>
  );
}
