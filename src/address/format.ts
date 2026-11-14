import { getCountry } from "../countries/registry";
import { normalizePostalCode } from "./postal-code";
import type { Address } from "./types";

type LocalityValues = Partial<Record<string, string>>;

export function renderLocalityLine(
  template: string,
  values: LocalityValues,
): string {
  return template
    .replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/^[\s,-]+|[\s,-]+$/g, "");
}

export function formatAddress(address: Address, fromCountry?: string): string {
  const country = getCountry(address.country);
  const postalCode = address.postalCode?.trim()
    ? normalizePostalCode(country.code, address.postalCode)
    : undefined;
  const values: LocalityValues = {
    city: address.city.trim(),
    subdivision: address.subdivision?.trim(),
    postalCode,
  };
  const domestic =
    fromCountry !== undefined && getCountry(fromCountry).code === country.code;
  return [
    address.name,
    address.line1,
    address.line2,
    ...country.localityLines.map((line) => renderLocalityLine(line, values)),
    domestic ? undefined : country.name.toUpperCase(),
  ]
    .map((line) => line?.trim() ?? "")
    .filter((line) => line.length > 0)
    .join("\n");
}

export function formatAddressOneLine(address: Address): string {
  return formatAddress(address).split("\n").join(", ");
}
