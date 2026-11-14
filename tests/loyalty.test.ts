import { describe, expect, it } from "vitest";
import {
  createLoyaltyAccount,
  earnPoints,
  pointsForPurchase,
  tierFor,
} from "../src/loyalty";

describe("loyalty points", () => {
  it("earns one point per whole dollar at bronze", () => {
    expect(pointsForPurchase(1999, "bronze")).toBe(19);
    expect(pointsForPurchase(99, "bronze")).toBe(0);
    expect(pointsForPurchase(-500, "bronze")).toBe(0);
  });

  it("applies tier multipliers and rounds down", () => {
    expect(pointsForPurchase(1000, "silver")).toBe(12);
    expect(pointsForPurchase(1000, "gold")).toBe(15);
  });

  it("moves up tiers from lifetime points", () => {
    expect(tierFor(createLoyaltyAccount())).toBe("bronze");
    expect(tierFor({ points: 0, lifetimePoints: 1000 })).toBe("silver");
    expect(tierFor({ points: 0, lifetimePoints: 5000 })).toBe("gold");
  });

  it("adds earned points to balance and lifetime", () => {
    const account = earnPoints({ points: 10, lifetimePoints: 1000 }, 4000);
    expect(account).toEqual({ points: 60, lifetimePoints: 1050 });
  });
});
