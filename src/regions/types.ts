import type { CurrencyCode } from "../../generated/currencies";
import type { RegionCode } from "../../generated/regions";

export type { RegionCode };

export type TaxCategory = "standard" | "food" | "books" | "digital";

export type Region = {
  code: RegionCode;
  country: string;
  name: string;
  currency: CurrencyCode;
  taxRate: number;
  taxInclusive: boolean;
};
