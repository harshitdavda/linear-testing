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
  city: "Roma",
  country: "IT",
  subdivision: "RM",
  postalCode: "00184",
};

describe("Italy (IT)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 00184" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("IT", "00184 ")).toBe("00184");
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
      "Ada Lovelace\n1 Example Street\n00184 Roma RM\nITALY",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "IT")).toBe(
      "Ada Lovelace\n1 Example Street\n00184 Roma RM",
    );
  });
});
