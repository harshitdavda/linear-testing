import { describe, expect, it } from "vitest";
import {
  formatAddress,
  normalizePostalCode,
  validateAddress,
} from "../../src/address";
import type { Address } from "../../src/address/types";

const ADDRESS: Address = {
  name: "Ada Lovelace",
  line1: "1 Example Street",
  city: "Ottawa",
  country: "CA",
  subdivision: "ON",
  postalCode: "K1A 0B1",
};

describe("Canada (CA)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like K1A 0B1" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("CA", "k1a0b1")).toBe("K1A 0B1");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("requires the province", () => {
    expect(validateAddress({ ...ADDRESS, subdivision: " " })).toEqual([
      { field: "subdivision", message: "province is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nOttawa, ON K1A 0B1\nCANADA",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "CA")).toBe(
      "Ada Lovelace\n1 Example Street\nOttawa, ON K1A 0B1",
    );
  });
});
