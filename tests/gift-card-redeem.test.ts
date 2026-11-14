import { describe, expect, it } from "vitest";
import { isExhausted, issueGiftCard, redeemGiftCard } from "../src/gift-cards";

const card = issueGiftCard("ABCD-1234-EFGH-5678", 5000);

describe("redeemGiftCard", () => {
  it("covers the full amount when the balance is enough", () => {
    const result = redeemGiftCard(card, 1200);
    expect(result.appliedCents).toBe(1200);
    expect(result.remainingDueCents).toBe(0);
    expect(result.card.balanceCents).toBe(3800);
  });

  it("uses the whole balance when the amount is larger", () => {
    const result = redeemGiftCard(card, 8000);
    expect(result.appliedCents).toBe(5000);
    expect(result.remainingDueCents).toBe(3000);
    expect(isExhausted(result.card)).toBe(true);
  });

  it("does not change the original card", () => {
    redeemGiftCard(card, 1000);
    expect(card.balanceCents).toBe(5000);
  });

  it("applies nothing from an exhausted card", () => {
    const empty = redeemGiftCard(card, 5000).card;
    expect(redeemGiftCard(empty, 700)).toEqual({
      card: empty,
      appliedCents: 0,
      remainingDueCents: 700,
    });
  });

  it("rejects negative or fractional amounts", () => {
    expect(() => redeemGiftCard(card, -1)).toThrow();
    expect(() => redeemGiftCard(card, 1.5)).toThrow();
  });
});
