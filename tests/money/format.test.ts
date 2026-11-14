import { describe, expect, it } from "vitest";
import { formatCents } from "../../src/money";

describe("formatCents", () => {
  it("formats decimal currencies", () => {
    expect(formatCents(1234, "USD")).toBe("$12.34");
    expect(formatCents(99, "INR")).toBe("₹0.99");
  });

  it("formats zero-decimal currencies", () => {
    expect(formatCents(12300, "JPY")).toBe("¥123");
  });
});
