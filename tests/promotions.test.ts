import { describe, expect, it } from "vitest";
import { applyPromotions } from "../src/promotions/apply";
import { isEligible } from "../src/promotions/eligibility";
import { discountFor, validatePromotion } from "../src/promotions/rules";
import { selectPromotions } from "../src/promotions/stacking";
import type { Promotion, PromotionLine } from "../src/promotions/types";
import { NOW, percentOff } from "./fixtures";

const LINES: PromotionLine[] = [
  { sku: "a", category: "standard", unitCents: 1000, quantity: 3 },
  { sku: "b", category: "food", unitCents: 500, quantity: 2 },
];

const amountOff = (
  id: string,
  amountCents: number,
  priority = 1,
): Promotion => ({
  id,
  kind: "amount-off",
  amountCents,
  stackable: true,
  priority,
});

describe("discountFor", () => {
  it("takes a percentage of the cart", () => {
    expect(discountFor(percentOff("p", 10), LINES, 4000).discountCents).toBe(
      400,
    );
  });

  it("takes a percentage of selected skus", () => {
    const promo = percentOff("p", 50, { skus: ["b"] });
    expect(discountFor(promo, LINES, 4000).discountCents).toBe(500);
  });

  it("never discounts more than what is left", () => {
    expect(discountFor(amountOff("x", 5000), LINES, 4000).discountCents).toBe(
      4000,
    );
  });

  it("gives free units for buy x get y", () => {
    const promo: Promotion = {
      id: "b2g1",
      kind: "buy-x-get-y",
      sku: "a",
      buy: 2,
      get: 1,
      stackable: true,
      priority: 1,
    };
    expect(discountFor(promo, LINES, 4000).discountCents).toBe(1000);
    expect(isEligible(promo, [{ ...LINES[0], quantity: 2 }], NOW)).toBe(false);
  });

  it("marks free shipping without a discount", () => {
    const promo: Promotion = {
      id: "ship",
      kind: "free-shipping",
      stackable: true,
      priority: 1,
    };
    expect(discountFor(promo, LINES, 4000)).toEqual({
      promotionId: "ship",
      discountCents: 0,
      freeShipping: true,
    });
  });
});

describe("eligibility", () => {
  it("respects the active window", () => {
    expect(
      isEligible(percentOff("p", 10, { startsAt: "2026-11-15" }), LINES, NOW),
    ).toBe(false);
    expect(
      isEligible(
        percentOff("p", 10, { endsAt: NOW.toISOString() }),
        LINES,
        NOW,
      ),
    ).toBe(false);
    expect(
      isEligible(percentOff("p", 10, { endsAt: "2026-11-15" }), LINES, NOW),
    ).toBe(true);
  });

  it("respects the minimum subtotal", () => {
    expect(
      isEligible(percentOff("p", 10, { minSubtotalCents: 5000 }), LINES, NOW),
    ).toBe(false);
  });

  it("needs a matching sku for sku-limited promotions", () => {
    expect(isEligible(percentOff("p", 10, { skus: ["zzz"] }), LINES, NOW)).toBe(
      false,
    );
  });
});

describe("validatePromotion", () => {
  it("reports problems", () => {
    expect(validatePromotion(percentOff("p", 0))).toContain(
      "percent must be between 0 and 100",
    );
    expect(
      validatePromotion(
        percentOff("p", 10, { startsAt: "2026-12-01", endsAt: "2026-11-01" }),
      ),
    ).toContain("startsAt must be before endsAt");
    expect(validatePromotion(amountOff(" ", 100))).toContain("id is required");
  });
});

describe("stacking", () => {
  it("lets a non-stackable top promotion win alone", () => {
    const top = percentOff("top", 10, { stackable: false, priority: 10 });
    const ids = selectPromotions(
      [top, amountOff("low", 100, 5)],
      LINES,
      NOW,
    ).map((p) => p.id);
    expect(ids).toEqual(["top"]);
  });

  it("stacks stackable promotions and drops non-stackable ones below", () => {
    const promos = [
      percentOff("ten", 10, { priority: 10 }),
      amountOff("hundred", 100, 5),
      percentOff("solo", 50, { stackable: false, priority: 1 }),
    ];
    expect(selectPromotions(promos, LINES, NOW).map((p) => p.id)).toEqual([
      "ten",
      "hundred",
    ]);
  });

  it("breaks priority ties by id", () => {
    const ids = selectPromotions(
      [amountOff("b", 1), amountOff("a", 1)],
      LINES,
      NOW,
    ).map((p) => p.id);
    expect(ids).toEqual(["a", "b"]);
  });

  it("applies stacked promotions one after another", () => {
    const applied = applyPromotions(
      [percentOff("ten", 10, { priority: 10 }), amountOff("hundred", 100, 5)],
      LINES,
      NOW,
    );
    expect(applied.results.map((r) => r.discountCents)).toEqual([400, 100]);
    expect(applied.discountCents).toBe(500);
  });

  it("rejects invalid promotions", () => {
    expect(() => applyPromotions([percentOff("bad", 150)], LINES, NOW)).toThrow(
      "invalid promotion bad",
    );
  });
});
