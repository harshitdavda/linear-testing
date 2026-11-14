import { describe, expect, it } from "vitest";
import {
  addItem,
  createCart,
  removeItem,
  subtotal,
  updateQuantity,
} from "../src/cart";

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

  it("updates the quantity of an item", () => {
    const cart = addItem(createCart(), {
      sku: "a",
      priceCents: 500,
      quantity: 1,
    });
    expect(updateQuantity(cart, "a", 4).items[0].quantity).toBe(4);
  });
});
