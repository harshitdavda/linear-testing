import { describe, expect, it } from "vitest";
import { addItem, checkout, createCart, issueGiftCard } from "../src";

const cart = addItem(createCart(), { sku: "a", priceCents: 2000, quantity: 2 });
const card = issueGiftCard("ABCD-1234-EFGH-5678", 3000);

describe("checkout", () => {
  it("charges the full total without a gift card", () => {
    expect(checkout(cart, 0.1)).toEqual({
      totalCents: 4400,
      giftCardCents: 0,
      dueCents: 4400,
    });
  });

  it("applies the gift card after discount and tax", () => {
    const result = checkout(cart, 0.1, { code: "HALFOFF", giftCard: card });
    expect(result.totalCents).toBe(2200);
    expect(result.giftCardCents).toBe(2200);
    expect(result.dueCents).toBe(0);
    expect(result.giftCard?.balanceCents).toBe(800);
  });

  it("charges the rest when the card runs out", () => {
    const result = checkout(cart, 0.1, { giftCard: card });
    expect(result.giftCardCents).toBe(3000);
    expect(result.dueCents).toBe(1400);
    expect(result.giftCard?.balanceCents).toBe(0);
  });
});
