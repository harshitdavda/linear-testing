import { describe, expect, it } from "vitest";
import {
  isExhausted,
  issueGiftCard,
  isValidGiftCardCode,
  normalizeGiftCardCode,
} from "../src/gift-cards";

describe("gift card model", () => {
  it("normalizes codes", () => {
    expect(normalizeGiftCardCode(" abcd-1234-efgh-5678 ")).toBe(
      "ABCD-1234-EFGH-5678",
    );
  });

  it("validates the four-by-four code format", () => {
    expect(isValidGiftCardCode("ABCD-1234-EFGH-5678")).toBe(true);
    expect(isValidGiftCardCode("abcd-1234-efgh-5678")).toBe(true);
    expect(isValidGiftCardCode("ABCD-1234-EFGH")).toBe(false);
    expect(isValidGiftCardCode("ABCD-1234-EFGH-567!")).toBe(false);
  });

  it("issues a card with its full balance", () => {
    expect(issueGiftCard("abcd-1234-efgh-5678", 5000)).toEqual({
      code: "ABCD-1234-EFGH-5678",
      initialCents: 5000,
      balanceCents: 5000,
    });
  });

  it("rejects bad codes and amounts", () => {
    expect(() => issueGiftCard("nope", 5000)).toThrow("invalid gift card code");
    expect(() => issueGiftCard("ABCD-1234-EFGH-5678", 0)).toThrow();
    expect(() => issueGiftCard("ABCD-1234-EFGH-5678", 10.5)).toThrow();
  });

  it("reports exhausted cards", () => {
    const card = issueGiftCard("ABCD-1234-EFGH-5678", 100);
    expect(isExhausted(card)).toBe(false);
    expect(isExhausted({ ...card, balanceCents: 0 })).toBe(true);
  });
});
