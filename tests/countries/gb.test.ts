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
  city: "London",
  country: "GB",
  postalCode: "SW1A 1AA",
};

describe("United Kingdom (GB)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like SW1A 1AA" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("GB", "sw1a1aa")).toBe("SW1A 1AA");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nLondon\nSW1A 1AA\nUNITED KINGDOM",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "GB")).toBe(
      "Ada Lovelace\n1 Example Street\nLondon\nSW1A 1AA",
    );
  });
});
