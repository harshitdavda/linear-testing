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
  city: "Bangkok",
  country: "TH",
  postalCode: "10200",
};

describe("Thailand (TH)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 10200" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("TH", " 10200")).toBe("10200");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nBangkok 10200\nTHAILAND",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "TH")).toBe(
      "Ada Lovelace\n1 Example Street\nBangkok 10200",
    );
  });
});
