import { describe, expect, it } from "vitest";
import { formatMoney } from "../src/format";

describe("formatMoney", () => {
  it("formats decimal currencies", () => {
    expect(formatMoney(1234, "USD")).toBe("$12.34");
    expect(formatMoney(99, "INR")).toBe("₹0.99");
  });

  it("formats zero-decimal currencies", () => {
    expect(formatMoney(12300, "JPY")).toBe("¥123");
  });
});
