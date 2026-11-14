import type { CheckoutLine } from "./types";

export function validateLines(lines: readonly CheckoutLine[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  lines.forEach((line, index) => {
    const at = `line ${index + 1} (${line.sku})`;
    if (!line.sku.trim()) errors.push(`line ${index + 1}: sku is required`);
    if (seen.has(line.sku)) errors.push(`${at}: duplicate sku`);
    seen.add(line.sku);
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      errors.push(`${at}: quantity must be a positive whole number`);
    }
    if (!Number.isInteger(line.unitCents) || line.unitCents < 0) {
      errors.push(`${at}: unitCents must be a non-negative whole number`);
    }
    if (line.weightGrams < 0) errors.push(`${at}: weight cannot be negative`);
  });
  return errors;
}
