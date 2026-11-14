import { describe, expect, it } from "vitest";
import { addItem, checkoutTotal, createCart } from "../src";
import { bulkDiscountCents, bulkRate } from "../src/bulk";

describe("bulk discount tiers", () => {
  it("picks the highest tier the quantity reaches", () => {
    expect(bulkRate(9)).toBe(0);
    expect(bulkRate(10)).toBe(0.05);
    expect(bulkRate(24)).toBe(0.05);
    expect(bulkRate(25)).toBe(0.1);
    expect(bulkRate(50)).toBe(0.15);
    expect(bulkRate(500)).toBe(0.15);
  });

  it("does not depend on tier order", () => {
    const tiers = [
      { minQuantity: 5, rate: 0.02 },
      { minQuantity: 20, rate: 0.2 },
    ];
    expect(bulkRate(30, tiers)).toBe(0.2);
    expect(bulkRate(6, tiers)).toBe(0.02);
  });

  it("discounts each line by its own quantity", () => {
    let cart = addItem(createCart(), {
      sku: "a",
      priceCents: 100,
      quantity: 10,
    });
    cart = addItem(cart, { sku: "b", priceCents: 999, quantity: 3 });
    cart = addItem(cart, { sku: "c", priceCents: 333, quantity: 25 });
    expect(bulkDiscountCents(cart)).toBe(50 + 0 + 833);
  });

  it("applies bulk tiers before codes and tax", () => {
    const cart = addItem(createCart(), {
      sku: "a",
      priceCents: 1000,
      quantity: 10,
    });
    expect(checkoutTotal(cart, 0.1)).toBe(10450);
    expect(checkoutTotal(cart, 0.1, "WELCOME10")).toBe(9405);
  });
});
