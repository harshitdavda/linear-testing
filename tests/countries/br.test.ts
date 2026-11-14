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
  city: "São Paulo",
  country: "BR",
  subdivision: "SP",
  postalCode: "01310-100",
};

describe("Brazil (BR)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      {
        field: "postalCode",
        message: "postal code should look like 01310-100",
      },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("BR", "01310100")).toBe("01310-100");
  });

  it("checks whether the postal code is required", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([
      { field: "postalCode", message: "postal code is required" },
    ]);
  });

  it("requires the state", () => {
    expect(validateAddress({ ...ADDRESS, subdivision: " " })).toEqual([
      { field: "subdivision", message: "state is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nSão Paulo - SP\n01310-100\nBRAZIL",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "BR")).toBe(
      "Ada Lovelace\n1 Example Street\nSão Paulo - SP\n01310-100",
    );
  });
});
