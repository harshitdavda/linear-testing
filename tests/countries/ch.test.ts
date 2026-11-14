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
  city: "Zürich",
  country: "CH",
  postalCode: "8001",
};

describe("Switzerland (CH)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 8001" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("CH", "8001 ")).toBe("8001");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\n8001 Zürich\nSWITZERLAND",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "CH")).toBe(
      "Ada Lovelace\n1 Example Street\n8001 Zürich",
    );
  });
});
