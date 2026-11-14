import { describe, expect, it } from "vitest";
import {
  formatGiftCard,
  giftMessageLines,
  validateGiftMessage,
} from "../src/gifts/message";
import {
  validateWrapRequests,
  type WrappableItem,
  wrapLines,
  wrapTotal,
} from "../src/gifts/wrap";

const ITEMS: WrappableItem[] = [
  { sku: "mug", quantity: 2, isFood: false },
  { sku: "tea", quantity: 1, isFood: true },
];

describe("wrapLines", () => {
  it("prices wrapping per item", () => {
    const lines = wrapLines(ITEMS, [
      { sku: "mug", style: "paper", quantity: 1 },
      { sku: "mug", style: "box", quantity: 1 },
    ]);
    expect(lines.map((line) => line.cents)).toEqual([299, 599]);
    expect(wrapTotal(lines)).toBe(898);
  });

  it("allows no wrapping at all", () => {
    expect(wrapTotal(wrapLines(ITEMS, []))).toBe(0);
  });

  it("refuses to wrap food", () => {
    expect(() =>
      wrapLines(ITEMS, [{ sku: "tea", style: "paper", quantity: 1 }]),
    ).toThrow("food can't be gift-wrapped");
  });
});

describe("validateWrapRequests", () => {
  it("rejects items that are not in the cart", () => {
    expect(
      validateWrapRequests(ITEMS, [{ sku: "vase", style: "box", quantity: 1 }]),
    ).toEqual(["vase: not in the cart"]);
  });

  it("rejects wrapping more than the cart holds, across requests", () => {
    expect(
      validateWrapRequests(ITEMS, [
        { sku: "mug", style: "paper", quantity: 2 },
        { sku: "mug", style: "box", quantity: 1 },
      ]),
    ).toEqual(["mug: wrapping 3 but only 2 in the cart"]);
  });

  it("rejects bad quantities", () => {
    expect(
      validateWrapRequests(ITEMS, [
        { sku: "mug", style: "paper", quantity: 0.5 },
      ]),
    ).toEqual(["mug: quantity must be a positive whole number"]);
  });
});

describe("gift messages", () => {
  it("drops blank lines and trims", () => {
    expect(giftMessageLines("  Happy birthday! \r\n\r\n Love you ")).toEqual([
      "Happy birthday!",
      "Love you",
    ]);
  });

  it("limits lines and line length", () => {
    expect(validateGiftMessage("a\nb\nc\nd\ne")).toEqual([
      "use at most 4 lines",
    ]);
    expect(validateGiftMessage("x".repeat(41))).toEqual([
      "line 1 is longer than 40 characters",
    ]);
    expect(validateGiftMessage("🎉".repeat(40))).toEqual([]);
  });

  it("adds a signature when given", () => {
    expect(formatGiftCard("Enjoy!", " Sam ")).toBe("Enjoy!\n— Sam");
    expect(formatGiftCard("Enjoy!", "  ")).toBe("Enjoy!");
  });

  it("throws on invalid messages", () => {
    expect(() => formatGiftCard("a\nb\nc\nd\ne")).toThrow(
      "use at most 4 lines",
    );
  });
});
