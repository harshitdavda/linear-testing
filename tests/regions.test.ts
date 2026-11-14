import { describe, expect, it } from "vitest";
import {
  getRegion,
  isRegionCode,
  regionsForCountry,
} from "../src/regions/registry";
import { rateFor, taxLine } from "../src/regions/tax";

describe("regions", () => {
  it("looks up a region", () => {
    expect(getRegion("DE")).toMatchObject({
      code: "DE",
      currency: "EUR",
      taxInclusive: true,
    });
  });

  it("rejects unknown and inherited keys", () => {
    expect(() => getRegion("XX")).toThrow("unknown region");
    expect(isRegionCode("toString")).toBe(false);
  });

  it("lists regions in a country", () => {
    expect(regionsForCountry("US").map((r) => r.code)).toEqual([
      "US_CA",
      "US_NY",
      "US_OR",
    ]);
  });
});

describe("tax", () => {
  it("adds tax on top in exclusive regions", () => {
    expect(taxLine(getRegion("US_CA"), "standard", 4000)).toEqual({
      netCents: 4000,
      taxCents: 290,
      grossCents: 4290,
    });
  });

  it("uses category overrides", () => {
    expect(rateFor(getRegion("US_CA"), "food")).toBe(0);
    expect(rateFor(getRegion("DE"), "books")).toBe(0.07);
    expect(rateFor(getRegion("DE"), "digital")).toBe(0.19);
  });

  it("extracts tax from the price in inclusive regions", () => {
    expect(taxLine(getRegion("DE"), "standard", 1190)).toEqual({
      netCents: 1000,
      taxCents: 190,
      grossCents: 1190,
    });
  });

  it("rejects negative amounts", () => {
    expect(() => taxLine(getRegion("JP"), "standard", -1)).toThrow();
  });
});
