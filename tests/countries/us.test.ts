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
  city: "San Francisco",
  country: "US",
  subdivision: "CA",
  postalCode: "94103",
};

describe("United States (US)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("rejects a malformed postal code", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: "ABC12" })).toEqual([
      { field: "postalCode", message: "postal code should look like 94103" },
    ]);
  });

  it("normalizes how people type the postal code", () => {
    expect(normalizePostalCode("US", "941031234")).toBe("94103-1234");
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
      "Ada Lovelace\n1 Example Street\nSan Francisco, CA 94103\nUNITED STATES",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "US")).toBe(
      "Ada Lovelace\n1 Example Street\nSan Francisco, CA 94103",
    );
  });
});
