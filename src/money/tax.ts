export function applyTax(cents: number, rate: number): number {
  if (rate < 0) throw new Error("tax rate cannot be negative");
  return Math.round(cents * (1 + rate));
}
