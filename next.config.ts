import type { NextConfig } from "next";
import legacyRedirects from "./content/redirects.json";

const dev = process.env.NODE_ENV === "development";

/** Players that migrated pages embed, plus the Zapier chat assistant. */
const FRAME_HOSTS = [
  "https://interfaces.zapier.com",
  "https://*.zapier.app",
  "https://www.youtube.com",
  "https://www.youtube-nocookie.com",
  "https://player.vimeo.com",
  "https://w.soundcloud.com",
  "https://open.spotify.com",
  "https://www.google.com",
  "https://g2.ipcamlive.com",
];

/**
 * Content-Security-Policy: what this site's pages may load and where from.
 * Scripts only from this site ('unsafe-inline' is needed for Next's inline
 * page data and the theme script on statically generated pages). Images may
 * come from any https host because migrated news posts use newsletter images.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self'",
  // Map tiles, fonts and sprites for the owl box map.
  `connect-src 'self' https://tiles.openfreemap.org${dev ? " ws:" : ""}`,
  "worker-src 'self' blob:",
  `frame-src ${FRAME_HOSTS.join(" ")}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
      // Photos attached to boxes on the Google My Maps owl box map.
      { protocol: "https", hostname: "mymaps.usercontent.google.com", pathname: "/hostedimage/**" },
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
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
