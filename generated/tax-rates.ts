// Generated file. Do not edit.
import type { TaxCategory } from "../src/regions/types";
import type { RegionCode } from "./regions";

export const CATEGORY_RATE_OVERRIDES: Partial<
  Record<RegionCode, Partial<Record<TaxCategory, number>>>
> = {
  US_CA: { food: 0 },
  US_NY: { food: 0 },
  DE: { food: 0.07, books: 0.07 },
  FR: { food: 0.055, books: 0.055 },
  IN_MH: { food: 0.05, books: 0 },
  JP: { food: 0.08 },
};
