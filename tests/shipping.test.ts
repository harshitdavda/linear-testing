import { describe, expect, it } from "vitest";
import { deliveryWindow, shippingQuote } from "../src/shipping/estimate";
import { zoneFor } from "../src/shipping/zones";

describe("zones", () => {
  it("maps countries to zones", () => {
    expect(zoneFor("US")).toBe("domestic-us");
    expect(zoneFor("FR")).toBe("eu");
    expect(() => zoneFor("BR")).toThrow();
  });
});

describe("shippingQuote", () => {
  it("charges the base rate for the first kilo", () => {
    expect(shippingQuote("domestic-us", "standard", 4999, 500)).toBe(499);
    expect(shippingQuote("domestic-us", "standard", 1000, 0)).toBe(499);
  });

  it("adds a charge per extra kilo", () => {
    expect(shippingQuote("domestic-us", "standard", 1000, 2500)).toBe(699);
  });

  it("ships free above the threshold for standard only", () => {
    expect(shippingQuote("domestic-us", "standard", 5000, 500)).toBe(0);
    expect(shippingQuote("domestic-us", "express", 10000, 500)).toBe(1499);
  });

  it("charges nothing for an empty order", () => {
    expect(shippingQuote("asia", "express", 0, 0)).toBe(0);
  });

  it("rejects negative weight", () => {
    expect(() => shippingQuote("eu", "standard", 100, -1)).toThrow();
  });

  it("gives delivery windows", () => {
    expect(deliveryWindow("asia", "express")).toEqual({
      minDays: 3,
      maxDays: 4,
    });
  });
});
