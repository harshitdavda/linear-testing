import { CATEGORY_RATE_OVERRIDES } from "../../generated/tax-rates";
import type { Region, TaxCategory } from "./types";

export type TaxLine = {
  netCents: number;
  taxCents: number;
  grossCents: number;
};

export function rateFor(region: Region, category: TaxCategory): number {
  return CATEGORY_RATE_OVERRIDES[region.code]?.[category] ?? region.taxRate;
}

export function taxLine(
  region: Region,
  category: TaxCategory,
  amountCents: number,
): TaxLine {
  if (amountCents < 0) throw new Error("amount cannot be negative");
  const rate = rateFor(region, category);
  if (region.taxInclusive) {
    const netCents = Math.round(amountCents / (1 + rate));
    return {
      netCents,
      taxCents: amountCents - netCents,
      grossCents: amountCents,
    };
  }
  const taxCents = Math.round(amountCents * rate);
  return {
    netCents: amountCents,
    taxCents,
    grossCents: amountCents + taxCents,
  };
}
