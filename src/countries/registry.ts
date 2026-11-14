import { COUNTRIES, type CountryCode } from "../../generated/countries";
import type { Country } from "./types";

export type { CountryCode };

export function isCountryCode(code: string): code is CountryCode {
  return Object.hasOwn(COUNTRIES, code);
}

export function getCountry(code: string): Country {
  const upper = code.trim().toUpperCase();
  if (!isCountryCode(upper)) throw new Error(`unknown country: ${code}`);
  return COUNTRIES[upper];
}

export function listCountries(): Country[] {
  return Object.values(COUNTRIES).sort((a, b) =>
    a.name.localeCompare(b.name, "en"),
  );
}

export function countriesUsingCurrency(currency: string): Country[] {
  return listCountries().filter((country) => country.currency === currency);
}

export function internationalPrefix(code: string): string {
  return `+${getCountry(code).callingCode}`;
}
