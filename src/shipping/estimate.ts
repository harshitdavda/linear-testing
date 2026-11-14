import { RATES, type ShippingMethod } from "./rates";
import type { ShippingZone } from "./zones";

export type DeliveryWindow = { minDays: number; maxDays: number };

export function shippingQuote(
  zone: ShippingZone,
  method: ShippingMethod,
  goodsCents: number,
  weightGrams: number,
): number {
  if (weightGrams < 0) throw new Error("weight cannot be negative");
  if (goodsCents <= 0) return 0;
  const table = RATES[zone][method];
  if (
    table.freeAboveCents !== undefined &&
    goodsCents >= table.freeAboveCents
  ) {
    return 0;
  }
  const kg = Math.max(1, Math.ceil(weightGrams / 1000));
  return table.baseCents + (kg - 1) * table.perExtraKgCents;
}

export function deliveryWindow(
  zone: ShippingZone,
  method: ShippingMethod,
): DeliveryWindow {
  const { minDays, maxDays } = RATES[zone][method];
  return { minDays, maxDays };
}
