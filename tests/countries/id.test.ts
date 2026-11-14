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
  city: "Jakarta",
  country: "ID",
  postalCode: "10110",
};

describe("Indonesia (ID)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 10110" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("ID", " 10110")).toBe("10110");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nJakarta 10110\nINDONESIA",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "ID")).toBe(
      "Ada Lovelace\n1 Example Street\nJakarta 10110",
    );
  });
});
