import { describe, expect, it } from "vitest";
import { addItem, checkoutTotal, createCart } from "../src";
import { addTax, applyDiscount, roundHalfEven } from "../src/pricing";

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

  it("rounds halves to the nearest even number", () => {
    expect(roundHalfEven(2.5)).toBe(2);
    expect(roundHalfEven(3.5)).toBe(4);
    expect(roundHalfEven(-2.5)).toBe(-2);
    expect(roundHalfEven(2.4)).toBe(2);
    expect(roundHalfEven(2.6)).toBe(3);
    expect(roundHalfEven(7)).toBe(7);
  });

  it("treats float noise near a half as a half", () => {
    expect(150 * 0.07).not.toBe(10.5);
    expect(roundHalfEven(150 * 0.07)).toBe(10);
  });

  it("uses banker's rounding for tax", () => {
    expect(addTax(25, 0.1)).toBe(27);
    expect(addTax(35, 0.1)).toBe(39);
    expect(addTax(150, 0.07)).toBe(160);
    expect(addTax(1001, 0.05)).toBe(1051);
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
