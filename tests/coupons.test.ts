import { describe, expect, it } from "vitest";
import { addItem, checkoutTotal, createCart } from "../src";
import { applyDiscount, isCouponExpired } from "../src/pricing";

const BEFORE = new Date("2026-11-20T12:00:00.000Z");
const LAST_MOMENT = new Date("2026-11-30T23:59:59.999Z");
const AFTER = new Date("2026-12-01T00:00:00.000Z");

describe("coupon expiry", () => {
  it("never expires coupons without a date", () => {
    expect(isCouponExpired({ rate: 0.1 }, new Date("2100-01-01"))).toBe(false);
  });

  it("accepts a dated coupon up to and including its expiry", () => {
    expect(applyDiscount(1000, "BLACKFRIDAY30", BEFORE)).toBe(700);
    expect(applyDiscount(1000, "blackfriday30", LAST_MOMENT)).toBe(700);
  });

  it("rejects a dated coupon after it expires", () => {
    expect(() => applyDiscount(1000, "BLACKFRIDAY30", AFTER)).toThrow(
      "discount code expired",
    );
  });

  it("keeps undated codes working at any time", () => {
    expect(applyDiscount(1000, "WELCOME10", AFTER)).toBe(900);
  });

  it("passes the checkout time through to the coupon check", () => {
    const cart = addItem(createCart(), {
      sku: "a",
      priceCents: 2000,
      quantity: 1,
    });
    expect(checkoutTotal(cart, 0.1, "BLACKFRIDAY30", BEFORE)).toBe(1540);
    expect(() => checkoutTotal(cart, 0.1, "BLACKFRIDAY30", AFTER)).toThrow();
  });
});
