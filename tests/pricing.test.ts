import { describe, expect, it } from "vitest";
import { addItem, checkoutTotal, createCart } from "../src";
import { addTax, applyDiscount } from "../src/pricing";

describe("pricing", () => {
  it("applies discount codes case-insensitively", () => {
    expect(applyDiscount(1000, "welcome10")).toBe(900);
  });

  it("throws on unknown codes", () => {
    expect(() => applyDiscount(1000, "NOPE")).toThrow();
  });

  it("adds tax and rejects negative rates", () => {
    expect(addTax(1000, 0.18)).toBe(1180);
    expect(() => addTax(1000, -0.1)).toThrow();
  });

  it("computes checkout total", () => {
    const cart = addItem(createCart(), {
      sku: "a",
      priceCents: 2000,
      quantity: 1,
    });
    expect(checkoutTotal(cart, 0.1, "HALFOFF")).toBe(1100);
  });
});
