import { describe, expect, it } from "vitest";
import { formatAddress, validateAddress } from "../../src/address";
import type { Address } from "../../src/address/types";

const ADDRESS: Address = {
  name: "Ada Lovelace",
  line1: "1 Example Street",
  city: "Hong Kong",
  country: "HK",
};

describe("Hong Kong (HK)", () => {
  it("accepts a complete address", () => {
    expect(validateAddress(ADDRESS)).toEqual([]);
  });

  it("does not use postal codes", () => {
    expect(validateAddress({ ...ADDRESS, postalCode: undefined })).toEqual([]);
  });

  it("formats for international mail", () => {
    expect(formatAddress(ADDRESS)).toBe(
      "Ada Lovelace\n1 Example Street\nHong Kong\nHONG KONG",
    );
  });

  it("leaves out the country for domestic mail", () => {
    expect(formatAddress(ADDRESS, "HK")).toBe(
      "Ada Lovelace\n1 Example Street\nHong Kong",
    );
  });
});
