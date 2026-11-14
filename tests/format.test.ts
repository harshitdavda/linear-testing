import { describe, expect, it } from "vitest";
import { formatMoney } from "../src/format";

describe("formatMoney", () => {
  it("formats decimal currencies", () => {
    expect(formatMoney(1234, "USD")).toBe("$12.34");
    expect(formatMoney(99, "INR")).toBe("₹0.99");
    expect(formatMoney(500, "GBP")).toBe("£5.00");
    expect(formatMoney(1999, "CAD")).toBe("CA$19.99");
  });

  it("formats zero-decimal currencies", () => {
    expect(formatMoney(12300, "JPY")).toBe("¥123");
  });
});
