import type { ShippingZone } from "./zones";

export type ShippingMethod = "standard" | "express";

export type RateTable = {
  baseCents: number;
  perExtraKgCents: number;
  freeAboveCents?: number;
  minDays: number;
  maxDays: number;
};

export const RATES: Record<ShippingZone, Record<ShippingMethod, RateTable>> = {
  "domestic-us": {
    standard: {
      baseCents: 499,
      perExtraKgCents: 100,
      freeAboveCents: 5000,
      minDays: 3,
      maxDays: 5,
    },
    express: { baseCents: 1499, perExtraKgCents: 250, minDays: 1, maxDays: 2 },
  },
  eu: {
    standard: {
      baseCents: 899,
      perExtraKgCents: 150,
      freeAboveCents: 7500,
      minDays: 4,
      maxDays: 7,
    },
    express: { baseCents: 2499, perExtraKgCents: 400, minDays: 2, maxDays: 3 },
  },
  asia: {
    standard: {
      baseCents: 1299,
      perExtraKgCents: 200,
      minDays: 6,
      maxDays: 10,
    },
    express: { baseCents: 3499, perExtraKgCents: 500, minDays: 3, maxDays: 4 },
  },
};
