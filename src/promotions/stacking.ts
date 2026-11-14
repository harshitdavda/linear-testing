import { isEligible } from "./eligibility";
import type { Promotion, PromotionLine } from "./types";

export function orderPromotions(promotions: readonly Promotion[]): Promotion[] {
  return [...promotions].sort(
    (a, b) => b.priority - a.priority || a.id.localeCompare(b.id),
  );
}

export function selectPromotions(
  promotions: readonly Promotion[],
  lines: readonly PromotionLine[],
  now: Date,
): Promotion[] {
  const eligible = orderPromotions(
    promotions.filter((promotion) => isEligible(promotion, lines, now)),
  );
  const top = eligible[0];
  if (!top) return [];
  if (!top.stackable) return [top];
  return eligible.filter((promotion) => promotion.stackable);
}
