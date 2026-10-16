import type { NextConfig } from "next";
import legacyRedirects from "./content/redirects.json";
import { ZOHO_HOSTS } from "./lib/forms";
import { securityHeaders } from "./lib/security-headers";

const dev = process.env.NODE_ENV === "development";
/** GA4 loads only when a measurement ID is configured, and only then is Google allowed in the CSP. */
const ga = Boolean(process.env.NEXT_PUBLIC_GA_ID);

/**
 * Folders under the old /siteworkspace media area, and the page each one's images belonged to.
 * Order matters: the first match wins. Anything else under /siteworkspace goes to the home page.
 */
const siteworkspace: [string, string][] = [
  ["bat-exclusion", "/bats-and-bat-boxes/bat-exclusions"],
  ["5-tips", "/news/5-tips-for-a-rodent-free-winter"],
  ["empty", "/owls-and-owl-boxes/empty"],
  ["empty2", "/owls-and-owl-boxes/empty"],
  ["owl-cam-collage-images", "/spotted-eagle-owl-webcam-1"],
  ["webcam-img:n(.*)", "/owl-webcam"],
  ["pictures-for-news-items", "/news"],
  ["newletter-:n(.*)", "/news"],
  ["rodent-control", "/non-toxic-pest-control/non-toxic-rodent-control-1"],
  ["rodent-page", "/non-toxic-pest-control/non-toxic-rodent-control-1"],
  ["owl-boxes-tab", "/products-services/owl-boxes"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A stray lockfile one directory up confuses workspace-root detection.
  turbopack: { root: __dirname },
  // Let phones/laptops on the office Wi-Fi, and http://127.0.0.1, load the dev server's scripts.
  allowedDevOrigins: ["192.168.178.201", "127.0.0.1"],
  images: {
    // WebP only: AVIF encoding is slow enough that photos appeared late on first view.
    formats: ["image/webp"],
    // Product photos are served from the Shopify store's CDN.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "shop.ecosolutions.co.za" },
      // Photos attached to boxes on the Google My Maps owl box map.
      { protocol: "https", hostname: "mymaps.usercontent.google.com", pathname: "/hostedimage/**" },
    ],
  },
  async redirects() {
    return [
      // Bat data dashboard is hidden until real data is in; the code stays in app/dashboard.
      { source: "/dashboard", destination: "/bats-and-bat-boxes", permanent: false },
      ...(legacyRedirects as { source: string; destination: string; permanent: boolean }[]),
      // Plone's media folder: images by topic go to the page about that topic, in one hop.
      ...siteworkspace.map(([folder, destination]) => ({ source: `/siteworkspace/${folder}/:rest*`, destination, permanent: true })),
      { source: "/siteworkspace/:path*", destination: "/", permanent: true },
      // Old Plone item views (…/photo.jpg/view, …/image_view_fullscreen) → the page they sat on
      { source: "/:item/:view(view|image_view_fullscreen|image_view)", destination: "/", permanent: true },
      { source: "/:path+/:item/:view(view|image_view_fullscreen|image_view)", destination: "/:path+", permanent: true },
      // Plone utility views (/@@search, /some/page/@@images/…)
      { source: "/@@:view(.*)", destination: "/", permanent: true },
      { source: "/:path+/@@:view(.*)", destination: "/:path+", permanent: true },
    ];
  },
  async headers() {
    return [
      // Enquiry forms (lib/forms.ts) are framed from Zoho.
      { source: "/:path*", headers: securityHeaders({ dev, ga, frameHosts: ZOHO_HOSTS }) },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
