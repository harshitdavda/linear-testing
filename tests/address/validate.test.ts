import { describe, expect, it } from "vitest";
import type { Address } from "../../src/address/types";
import { validateAddress } from "../../src/address/validate";

const BASE: Address = {
  name: "Ada Lovelace",
  line1: "1 Example Street",
  city: "Paris",
  postalCode: "75008",
  country: "fr",
};

describe("validateAddress", () => {
  it("accepts lowercase country codes", () => {
    expect(validateAddress(BASE)).toEqual([]);
  });

  it("stops at an unknown country", () => {
    expect(validateAddress({ ...BASE, country: "XX", name: "" })).toEqual([
      { field: "country", message: "unknown country" },
    ]);
  });

  it("reports every missing basic field", () => {
    expect(
      validateAddress({ ...BASE, name: " ", line1: "", city: "" }).map(
        (e) => e.field,
      ),
    ).toEqual(["name", "line1", "city"]);
  });

  it("does not require an optional postal code", () => {
    expect(
      validateAddress({
        ...BASE,
        country: "IE",
        city: "Dublin",
        postalCode: "",
      }),
    ).toEqual([]);
  });
});
