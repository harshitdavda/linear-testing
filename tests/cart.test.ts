import { describe, expect, it } from "vitest";
import { addItem, createCart, removeItem, subtotal } from "../src/cart";

describe("cart", () => {
  it("adds and merges items by sku", () => {
    let cart = addItem(createCart(), {
      sku: "a",
      priceCents: 500,
      quantity: 1,
    });
    cart = addItem(cart, { sku: "a", priceCents: 500, quantity: 2 });
    expect(cart.items).toEqual([{ sku: "a", priceCents: 500, quantity: 3 }]);
  });

  it("rejects non-positive quantity", () => {
    expect(() =>
      addItem(createCart(), { sku: "a", priceCents: 1, quantity: 0 }),
    ).toThrow();
  });

  it("removes items and totals the rest", () => {
    let cart = addItem(createCart(), {
      sku: "a",
      priceCents: 500,
      quantity: 2,
    });
    cart = addItem(cart, { sku: "b", priceCents: 250, quantity: 1 });
    expect(subtotal(removeItem(cart, "a"))).toBe(250);
  });

  it("rejects fractional quantity", () => {
    expect(() =>
      addItem(createCart(), { sku: "a", priceCents: 1, quantity: 1.5 }),
    ).toThrow();
  });
});
