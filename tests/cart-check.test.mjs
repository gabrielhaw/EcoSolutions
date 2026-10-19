// Cart validation rules (lib/cart-check.ts): what happens to a saved cart when
// Shopify's live data differs, and what /api/cart accepts. Run: npm test
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { buyable, MAX_CART_BODY, parseCartIds, reconcile } from "../lib/cart-check.ts";

const line = (id, o = {}) => ({ id, qty: 1, handle: `p${id}`, title: `Product ${id}`, variant: "Default Title", price: 100, ...o });
const live = (id, o = {}) => ({ id, handle: `p${id}`, title: `Product ${id}`, variant: "Default Title", price: 100, available: true, ...o });

describe("reconcile", () => {
  test("unchanged cart: no notices, lines kept", () => {
    const r = reconcile([line(1, { qty: 3 })], { 1: live(1) });
    assert.equal(r.notices.length, 0);
    assert.deepEqual(r.lines.map((l) => [l.id, l.qty, l.price, l.soldOut]), [[1, 3, 100, undefined]]);
  });

  test("deleted variant is removed and reported, never substituted", () => {
    const r = reconcile([line(1, { variant: "Barn Owl" }), line(2)], { 1: null, 2: live(2) });
    assert.deepEqual(r.lines.map((l) => l.id), [2]);
    assert.deepEqual(r.notices, [{ kind: "removed", id: 1, title: "Product 1", variant: "Barn Owl" }]);
  });

  test("price change updates the price and reports old and new", () => {
    const r = reconcile([line(1, { qty: 2 })], { 1: live(1, { price: 125.5 }) });
    assert.equal(r.lines[0].price, 125.5);
    assert.equal(r.lines[0].qty, 2);
    assert.deepEqual(r.notices, [{ kind: "price", id: 1, title: "Product 1", variant: "Default Title", from: 100, to: 125.5 }]);
  });

  test("sold out: kept, flagged, left out of checkout, reported once", () => {
    const r = reconcile([line(1), line(2)], { 1: live(1, { available: false }), 2: live(2) });
    assert.equal(r.lines[0].soldOut, true);
    assert.deepEqual(r.notices.map((n) => n.kind), ["soldout"]);
    assert.deepEqual(buyable(r.lines).map((l) => l.id), [2]);
    const again = reconcile(r.lines, { 1: live(1, { available: false }), 2: live(2) });
    assert.equal(again.notices.length, 0);
  });

  test("back in stock is reported and goes to checkout again", () => {
    const r = reconcile([line(1, { soldOut: true })], { 1: live(1) });
    assert.equal(r.lines[0].soldOut, undefined);
    assert.deepEqual(r.notices.map((n) => n.kind), ["back"]);
    assert.equal(buyable(r.lines).length, 1);
  });

  test("several products with mixed changes keep order and quantities", () => {
    const r = reconcile(
      [line(1, { qty: 2 }), line(2), line(3, { qty: 4 }), line(4)],
      { 1: live(1), 2: null, 3: live(3, { price: 90, available: false }), 4: live(4, { variant: "Renamed" }) },
    );
    assert.deepEqual(r.lines.map((l) => [l.id, l.qty]), [[1, 2], [3, 4], [4, 1]]);
    assert.deepEqual(r.notices.map((n) => `${n.kind}:${n.id}`).sort(), ["price:3", "removed:2", "soldout:3"]);
    assert.equal(r.lines[2].variant, "Renamed");
    assert.deepEqual(buyable(r.lines).map((l) => l.id), [1, 4]);
  });

  test("a line added while the check was in flight is left alone", () => {
    const r = reconcile([line(1), line(9)], { 1: live(1) });
    assert.deepEqual(r.lines.map((l) => l.id), [1, 9]);
    assert.equal(r.notices.length, 0);
  });
});

describe("parseCartIds (/api/cart input)", () => {
  test("accepts positive integer ids and drops duplicates", () => {
    assert.deepEqual(parseCartIds(JSON.stringify({ ids: [42230376366151, 7, 7] })), [42230376366151, 7]);
  });

  for (const [name, body] of [
    ["empty list", { ids: [] }],
    ["no ids", {}],
    ["strings", { ids: ["1"] }],
    ["zero / negative", { ids: [0, -1] }],
    ["fractions", { ids: [1.5] }],
    ["unsafe integers", { ids: [2 ** 60] }],
    ["more than 100 ids", { ids: Array.from({ length: 101 }, (_, i) => i + 1) }],
    ["null body", null],
  ]) {
    test(`rejects ${name}`, () => assert.equal(parseCartIds(JSON.stringify(body)), null));
  }

  test("rejects malformed JSON", () => assert.equal(parseCartIds("{ids:"), null));

  test("rejects bodies over the size limit before parsing", () => {
    assert.equal(parseCartIds(JSON.stringify({ ids: [1], pad: "x".repeat(MAX_CART_BODY) })), null);
  });
});
