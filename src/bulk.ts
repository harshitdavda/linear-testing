import type { Cart } from "./cart";

export type BulkTier = { minQuantity: number; rate: number };

export const BULK_TIERS: readonly BulkTier[] = [
  { minQuantity: 50, rate: 0.15 },
  { minQuantity: 25, rate: 0.1 },
  { minQuantity: 10, rate: 0.05 },
];

export function bulkRate(
  quantity: number,
  tiers: readonly BulkTier[] = BULK_TIERS,
): number {
  let best = 0;
  for (const tier of tiers) {
    if (quantity >= tier.minQuantity && tier.rate > best) best = tier.rate;
  }
  return best;
}

export function bulkDiscountCents(
  cart: Cart,
  tiers: readonly BulkTier[] = BULK_TIERS,
): number {
  return cart.items.reduce(
    (sum, i) =>
      sum + Math.round(i.priceCents * i.quantity * bulkRate(i.quantity, tiers)),
    0,
  );
}
