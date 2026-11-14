import { describe, expect, it } from "vitest";
import { checkout, createSession, validateLines } from "../src/checkout";
import type { Promotion } from "../src/promotions/types";
import { input, LAMP, percentOff, TEA } from "./fixtures";

describe("checkout totals", () => {
  it("adds exclusive tax and ships free above the threshold", () => {
    const { totals } = checkout(input());
    expect(totals).toMatchObject({
      currency: "USD",
      subtotalCents: 6000,
      discountCents: 0,
      shippingCents: 0,
      taxCents: 290,
      totalCents: 6290,
    });
  });

  it("spreads a discount across lines before tax", () => {
    const { totals } = checkout(input({ promotions: [percentOff("ten", 10)] }));
    expect(totals.lines.map((l) => l.discountCents)).toEqual([400, 200]);
    expect(totals.taxCents).toBe(261);
    expect(totals.totalCents).toBe(5661);
    expect(totals.appliedPromotions).toEqual([
      { promotionId: "ten", discountCents: 600, freeShipping: false },
    ]);
  });

  it("checks the free shipping threshold after discounts", () => {
    const { totals } = checkout(
      input({ promotions: [percentOff("twenty", 20)] }),
    );
    expect(totals.shippingCents).toBe(499);
    expect(totals.totalCents).toBe(3432 + 1600 + 499);
  });

  it("keeps tax inside the price in inclusive regions", () => {
    const { totals } = checkout(
      input({
        regionCode: "DE",
        lines: [{ ...LAMP, unitCents: 1190, weightGrams: 200 }],
      }),
    );
    expect(totals).toMatchObject({
      currency: "EUR",
      taxCents: 190,
      shippingCents: 899,
      totalCents: 2089,
    });
  });

  it("applies a free shipping promotion", () => {
    const freeShip: Promotion = {
      id: "ship",
      kind: "free-shipping",
      stackable: true,
      priority: 1,
    };
    const { totals } = checkout(
      input({ lines: [TEA], promotions: [freeShip] }),
    );
    expect(totals.shippingCents).toBe(0);
  });
});

describe("sessions", () => {
  it("gives the same id for the same cart", () => {
    expect(createSession(input()).id).toBe(createSession(input()).id);
    expect(createSession(input()).id).toMatch(/^chk_[0-9a-f]{8}$/);
  });

  it("rejects unknown regions and bad lines", () => {
    expect(() => createSession(input({ regionCode: "XX" }))).toThrow();
    expect(() =>
      createSession(input({ lines: [{ ...LAMP, quantity: 0 }] })),
    ).toThrow("quantity must be a positive whole number");
  });

  it("reports duplicate skus", () => {
    expect(validateLines([LAMP, LAMP])).toEqual([
      "line 2 (lamp): duplicate sku",
    ]);
  });
});
