import type { NextConfig } from "next";
import legacyRedirects from "./content/redirects.json";

const nextConfig: NextConfig = {
  // A stray lockfile one directory up confuses workspace-root detection.
  turbopack: { root: __dirname },
  // Let phones/laptops on the office Wi-Fi load the dev server's scripts.
  allowedDevOrigins: ["192.168.178.201"],
  images: {
    // WebP only: AVIF encoding is slow enough that photos appeared late on first view.
    formats: ["image/webp"],
    // Product photos are served from the Shopify store's CDN.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "shop.ecosolutions.co.za" },
    ],
  },
  async redirects() {
    return [
      // Bat data dashboard is hidden until real data is in; the code stays in app/dashboard.
      { source: "/dashboard", destination: "/bats-and-bat-boxes", permanent: false },
      ...(legacyRedirects as { source: string; destination: string; permanent: boolean }[]),
      // Old Plone item views (…/photo.jpg/view, …/some-image/view) → the page they sat on
      { source: "/:item/view", destination: "/", permanent: true },
      { source: "/:path+/:item/view", destination: "/:path+", permanent: true },
      // Plone utility views
      { source: "/:path*/@@:view(.*)", destination: "/:path*", permanent: true },
      { source: "/siteworkspace/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
