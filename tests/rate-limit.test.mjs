// /api/cart request limits (lib/rate-limit.ts), driven with a fake clock. Run: npm test
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { clientKey, createLimiter } from "../lib/rate-limit.ts";

describe("createLimiter", () => {
  test("allows `limit` hits per window, then refuses with Retry-After", () => {
    const take = createLimiter({ limit: 3, windowMs: 60_000 });
    for (let i = 0; i < 3; i++) assert.equal(take("a", 1_000).ok, true);
    const refused = take("a", 21_000);
    assert.equal(refused.ok, false);
    assert.equal(refused.retryAfterSeconds, 40);
  });

  test("repeated requests over time are limited, not just simultaneous ones", () => {
    const take = createLimiter({ limit: 30, windowMs: 60_000 });
    let allowed = 0;
    for (let t = 0; t < 60_000; t += 1_000) if (take("bot", t).ok) allowed++; // one request a second for a minute
    assert.equal(allowed, 30);
  });

  test("a new window starts after the old one ends", () => {
    const take = createLimiter({ limit: 1, windowMs: 1_000 });
    assert.equal(take("a", 0).ok, true);
    assert.equal(take("a", 999).ok, false);
    assert.equal(take("a", 1_000).ok, true);
  });

  test("visitors are counted separately", () => {
    const take = createLimiter({ limit: 1, windowMs: 60_000 });
    assert.equal(take("a", 0).ok, true);
    assert.equal(take("b", 0).ok, true);
    assert.equal(take("a", 0).ok, false);
  });

  test("a flood of new addresses can't grow memory past maxKeys", () => {
    const take = createLimiter({ limit: 5, windowMs: 60_000, maxKeys: 100 });
    for (let i = 0; i < 100; i++) assert.equal(take(`ip${i}`, 0).ok, true);
    assert.equal(take("ip-new", 1).ok, false, "refused while every slot is live");
    assert.equal(take("ip-new", 60_000).ok, true, "expired slots are reclaimed");
  });
});

describe("clientKey", () => {
  const h = (o) => new Headers(o);
  test("prefers x-real-ip", () => assert.equal(clientKey(h({ "x-real-ip": "203.0.113.9", "x-forwarded-for": "1.1.1.1" })), "203.0.113.9"));
  test("uses the last x-forwarded-for entry (the one our proxy added), not a client-typed one", () => {
    assert.equal(clientKey(h({ "x-forwarded-for": "6.6.6.6, 198.51.100.7" })), "198.51.100.7");
  });
  test("falls back to one shared key without a proxy", () => assert.equal(clientKey(h({})), "unknown"));
});
