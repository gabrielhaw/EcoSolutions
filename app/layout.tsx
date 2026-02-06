import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: site.name,
    template: `%s • ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: `https://${site.domain}`,
    title: site.name,
    description: site.description,
    siteName: site.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        
        {/* Zapier AI Chatbot */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<zapier-interfaces-chatbot-embed is-popup="true" chatbot-id="cm1q3bpt9001x73eb6ipicc30"></zapier-interfaces-chatbot-embed>`
          }}
        />
        
        <Script
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
          strategy="lazyOnload"
          type="module"
        />
      </body>
    </html>
  );
}
