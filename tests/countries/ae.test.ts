import { describe, expect, it } from "vitest";
import { formatAddress, validateAddress } from "../../src/address";
import type { Address } from "../../src/address/types";

const ADDRESS: Address = {
  name: "Ada Lovelace",
  line1: "1 Example Street",
  city: "Dubai",
  country: "AE",
  subdivision: "Dubai",
};

describe("United Arab Emirates (AE)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("does not use postal codes", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([]);
  });

  it("requires the emirate", () => {
    expect(validateAddress({ ...ADDRESS, subdivision: " " })).toEqual([
      { field: "subdivision", message: "emirate is required" },
    ]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nDubai\nDubai\nUNITED ARAB EMIRATES",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "AE")).toBe(
      "Ada Lovelace\n1 Example Street\nDubai\nDubai",
    );
  });
});
