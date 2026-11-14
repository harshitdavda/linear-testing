import { sumCents } from "../util/money";
import { lineSubtotal } from "./eligibility";
import { discountFor, validatePromotion } from "./rules";
import { selectPromotions } from "./stacking";
import type { Promotion, PromotionLine, PromotionResult } from "./types";

export type AppliedPromotions = {
  results: PromotionResult[];
  discountCents: number;
  freeShipping: boolean;
};

export function applyPromotions(
  promotions: readonly Promotion[],
  lines: readonly PromotionLine[],
  now: Date,
): AppliedPromotions {
  for (const promotion of promotions) {
    const errors = validatePromotion(promotion);
    if (errors.length > 0) {
      throw new Error(
        `invalid promotion ${promotion.id}: ${errors.join(", ")}`,
      );
    }
  }
  let remaining = lineSubtotal(lines);
  const results: PromotionResult[] = [];
  for (const promotion of selectPromotions(promotions, lines, now)) {
    const result = discountFor(promotion, lines, remaining);
    remaining -= result.discountCents;
    results.push(result);
  }
  return {
    results,
    discountCents: sumCents(results.map((result) => result.discountCents)),
    freeShipping: results.some((result) => result.freeShipping),
  };
}
