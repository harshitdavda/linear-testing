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
  city: "București",
  country: "RO",
  postalCode: "010011",
};

describe("Romania (RO)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 010011" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("RO", "010011 ")).toBe("010011");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\n010011 București\nROMANIA",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "RO")).toBe(
      "Ada Lovelace\n1 Example Street\n010011 București",
    );
  });
});
