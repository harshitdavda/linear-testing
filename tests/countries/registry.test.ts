import { describe, expect, it } from "vitest";
import {
  countriesUsingCurrency,
  getCountry,
  internationalPrefix,
  isCountryCode,
  listCountries,
} from "../../src/countries/registry";

describe("country registry", () => {
  it("has 50 countries sorted by name", () => {
    const names = listCountries().map((c) => c.name);
    expect(names).toHaveLength(50);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
  });

  it("keys every country by its own code", () => {
    for (const country of listCountries()) {
      expect(getCountry(country.code)).toBe(country);
    }
  });

  it("matches every example postal code to its own pattern", () => {
    for (const { code, postalCode } of listCountries()) {
      if (postalCode)
        expect(postalCode.pattern.test(postalCode.example), code).toBe(true);
    }
  });

  it("looks up codes case-insensitively and rejects unknown ones", () => {
    expect(getCountry(" de ").name).toBe("Germany");
    expect(() => getCountry("XX")).toThrow("unknown country");
    expect(isCountryCode("constructor")).toBe(false);
  });

  it("finds countries by currency", () => {
    expect(countriesUsingCurrency("EUR").map((c) => c.code)).toEqual([
      "AT",
      "BE",
      "FI",
      "FR",
      "DE",
      "GR",
      "IE",
      "IT",
      "LU",
      "NL",
      "PT",
      "ES",
    ]);
  });

  it("gives the international dialling prefix", () => {
    expect(internationalPrefix("IE")).toBe("+353");
  });
});
