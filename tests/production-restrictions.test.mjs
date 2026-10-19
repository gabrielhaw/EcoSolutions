// Restrictions that must hold in production and only relax under `next dev`:
// security headers (lib/security-headers.ts) and the dev-only browser error log
// route (app/api/dev-log/route.ts). Run: npm test
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { POST as devLog } from "../app/api/dev-log/route.ts";
import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers.ts";

const directives = (csp) => Object.fromEntries(csp.split("; ").map((d) => [d.split(" ")[0], d]));
const header = (headers, key) => headers.find((h) => h.key === key)?.value;
const ZOHO = ["https://forms.zohopublic.com", "https://forms.zoho.com"];

describe("production security headers", () => {
  const prod = directives(contentSecurityPolicy({ dev: false, ga: false, frameHosts: ZOHO }));

  test("forces https and never allows eval or the dev socket", () => {
    assert.ok("upgrade-insecure-requests" in prod);
    assert.doesNotMatch(prod["script-src"], /unsafe-eval/);
    assert.doesNotMatch(prod["connect-src"], /ws:/);
  });

  test("can't be framed, has no plugins, posts forms only to itself", () => {
    assert.equal(prod["frame-ancestors"], "frame-ancestors 'none'");
    assert.equal(prod["object-src"], "object-src 'none'");
    assert.equal(prod["form-action"], "form-action 'self'");
    assert.equal(prod["base-uri"], "base-uri 'self'");
  });

  test("loads scripts only from this site unless GA is configured", () => {
    assert.equal(prod["script-src"], "script-src 'self' 'unsafe-inline'");
    const withGa = directives(contentSecurityPolicy({ dev: false, ga: true }));
    assert.match(withGa["script-src"], /https:\/\/www\.googletagmanager\.com/);
    assert.match(withGa["connect-src"], /google-analytics\.com/);
    assert.doesNotMatch(prod["connect-src"], /google/);
  });

  test("frames the Zoho forms", () => {
    for (const host of ZOHO) assert.ok(prod["frame-src"].split(" ").includes(host), host);
  });

  test("sends HSTS, nosniff, DENY framing and a locked-down Permissions-Policy", () => {
    const h = securityHeaders({ dev: false, ga: false });
    assert.match(header(h, "Strict-Transport-Security"), /max-age=\d{8,}/);
    assert.equal(header(h, "X-Content-Type-Options"), "nosniff");
    assert.equal(header(h, "X-Frame-Options"), "DENY");
    assert.match(header(h, "Permissions-Policy"), /camera=\(\).*payment=\(\)/);
  });
});

describe("development relaxations", () => {
  const dev = directives(contentSecurityPolicy({ dev: true, ga: false }));

  test("allow eval and the hot-reload socket, and don't force https", () => {
    assert.match(dev["script-src"], /'unsafe-eval'/);
    assert.match(dev["connect-src"], /ws:/);
    assert.ok(!("upgrade-insecure-requests" in dev));
  });
});

describe("dev-only browser error log (/api/dev-log)", () => {
  const post = () => devLog(new Request("http://localhost/api/dev-log", { method: "POST", body: "{}" }));

  test("answers 404 in production", async () => {
    const was = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      assert.equal((await post()).status, 404);
    } finally {
      process.env.NODE_ENV = was;
    }
  });

  test("accepts reports under next dev", async () => {
    const was = process.env.NODE_ENV;
    const log = console.log;
    process.env.NODE_ENV = "development";
    console.log = () => {};
    try {
      assert.equal((await post()).status, 204);
    } finally {
      process.env.NODE_ENV = was;
      console.log = log;
    }
  });
});
