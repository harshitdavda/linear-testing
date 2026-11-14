import { getCountry } from "../countries/registry";

function insertFromEnd(
  value: string,
  fromEnd: number,
  separator: string,
): string {
  if (value.length <= fromEnd) return value;
  return `${value.slice(0, -fromEnd)}${separator}${value.slice(-fromEnd)}`;
}

export function normalizePostalCode(countryCode: string, raw: string): string {
  const rule = getCountry(countryCode).postalCode;
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, " ");
  if (!rule) return cleaned;
  const compact = cleaned.replace(/[\s-]/g, "");
  const candidates = [
    rule.canonical
      ? insertFromEnd(compact, rule.canonical.fromEnd, rule.canonical.separator)
      : cleaned,
    cleaned,
    compact,
  ];
  return (
    candidates.find((candidate) => rule.pattern.test(candidate)) ?? cleaned
  );
}

export function isValidPostalCode(countryCode: string, raw: string): boolean {
  const rule = getCountry(countryCode).postalCode;
  if (!rule) return raw.trim() === "";
  return rule.pattern.test(normalizePostalCode(countryCode, raw));
}
