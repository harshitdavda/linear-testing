import type { CheckoutInput, CheckoutLine } from "../src/checkout/types";
import type { Promotion } from "../src/promotions/types";

export const NOW = new Date("2026-11-14T12:00:00Z");

export const LAMP: CheckoutLine = {
  sku: "lamp",
  category: "standard",
  unitCents: 4000,
  quantity: 1,
  weightGrams: 400,
};

export const TEA: CheckoutLine = {
  sku: "tea",
  category: "food",
  unitCents: 1000,
  quantity: 2,
  weightGrams: 300,
};

export function input(overrides: Partial<CheckoutInput> = {}): CheckoutInput {
  return {
    regionCode: "US_CA",
    lines: [LAMP, TEA],
    shippingMethod: "standard",
    promotions: [],
    now: NOW,
    ...overrides,
  };
}

export function percentOff(
  id: string,
  percent: number,
  extra: Partial<Promotion> = {},
): Promotion {
  return {
    id,
    kind: "percent-off",
    percent,
    stackable: true,
    priority: 1,
    ...extra,
  } as Promotion;
}
