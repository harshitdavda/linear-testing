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
  city: "Santiago",
  country: "CL",
  postalCode: "8320000",
};

describe("Chile (CL)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 8320000" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("CL", " 8320000")).toBe("8320000");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\n8320000 Santiago\nCHILE",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "CL")).toBe(
      "Ada Lovelace\n1 Example Street\n8320000 Santiago",
    );
  });
});
