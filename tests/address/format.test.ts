import { describe, expect, it } from "vitest";
import {
  formatAddress,
  formatAddressOneLine,
  renderLocalityLine,
} from "../../src/address/format";
import type { Address } from "../../src/address/types";

describe("renderLocalityLine", () => {
  it("drops separators left by missing values", () => {
    expect(
      renderLocalityLine("{city}, {subdivision} {postalCode}", {
        city: "Austin",
      }),
    ).toBe("Austin");
    expect(
      renderLocalityLine("{city} - {subdivision}", { city: "Recife" }),
    ).toBe("Recife");
    expect(renderLocalityLine("{postalCode} {city}", { city: "Lyon" })).toBe(
      "Lyon",
    );
  });

  it("tidies spaces before commas", () => {
    expect(
      renderLocalityLine("{city} , {postalCode}", {
        city: "Bogotá",
        postalCode: "110111",
      }),
    ).toBe("Bogotá, 110111");
  });
});

describe("formatAddress", () => {
  const address: Address = {
    name: "Ada Lovelace",
    line1: "10 Downing Street",
    line2: "  ",
    city: "London",
    postalCode: "sw1a2aa",
    country: "GB",
  };

  it("skips blank lines and normalizes the postal code", () => {
    expect(formatAddress(address)).toBe(
      "Ada Lovelace\n10 Downing Street\nLondon\nSW1A 2AA\nUNITED KINGDOM",
    );
  });

  it("joins lines for one-line display", () => {
    expect(formatAddressOneLine(address)).toBe(
      "Ada Lovelace, 10 Downing Street, London, SW1A 2AA, UNITED KINGDOM",
    );
  });
});
