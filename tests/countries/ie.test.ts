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
  city: "Dublin",
  country: "IE",
  postalCode: "D02 X285",
};

describe("Ireland (IE)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like D02 X285" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("IE", "d02x285")).toBe("D02 X285");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nDublin\nD02 X285\nIRELAND",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "IE")).toBe(
      "Ada Lovelace\n1 Example Street\nDublin\nD02 X285",
    );
  });
});
