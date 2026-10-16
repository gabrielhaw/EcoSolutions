/**
 * Security headers for every response (applied in next.config.ts). Kept free
 * of imports so tests/security-headers.test.mjs can check the production-only
 * rules without starting Next.js.
 */

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

const GA_SCRIPT = "https://www.googletagmanager.com";
const GA_CONNECT = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";

export type SecurityOptions = {
  /** Running `next dev`: allows eval and the hot-reload socket, and never forces https. */
  dev: boolean;
  /** GA4 is configured (NEXT_PUBLIC_GA_ID); only then is Google allowed. */
  ga: boolean;
  /** Further frame hosts, e.g. the Zoho enquiry forms (lib/forms.ts). */
  frameHosts?: string[];
};

/**
 * Content-Security-Policy: what this site's pages may load and where from.
 * Scripts only from this site ('unsafe-inline' is needed for Next's inline
 * page data and the theme script on statically generated pages). Images may
 * come from any https host because migrated news posts use newsletter images.
 */
export function contentSecurityPolicy({ dev, ga, frameHosts = [] }: SecurityOptions) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}${ga ? ` ${GA_SCRIPT}` : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "media-src 'self'",
    // Map tiles, fonts and sprites for the owl box map.
    `connect-src 'self' https://tiles.openfreemap.org${ga ? ` ${GA_CONNECT}` : ""}${dev ? " ws:" : ""}`,
    "worker-src 'self' blob:",
    `frame-src ${[...FRAME_HOSTS, ...frameHosts].join(" ")}`,
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Production only: on plain-http local runs Safari would upgrade every asset to https and fail.
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function securityHeaders(options: SecurityOptions) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(options) },
    // Browsers ignore HSTS over plain http, but Safari has been seen keeping it for
    // localhost; test production builds in Safari over https or via 127.0.0.1.
    { key: "Strict-Transport-Security", value: "max-age=63072000" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  ];
}
