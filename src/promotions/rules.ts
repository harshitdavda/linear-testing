import { lineSubtotal } from "./eligibility";
import type { Promotion, PromotionLine, PromotionResult } from "./types";

export function validatePromotion(promotion: Promotion): string[] {
  const errors: string[] = [];
  if (!promotion.id.trim()) errors.push("id is required");
  if (
    promotion.startsAt &&
    promotion.endsAt &&
    new Date(promotion.startsAt) >= new Date(promotion.endsAt)
  ) {
    errors.push("startsAt must be before endsAt");
  }
  switch (promotion.kind) {
    case "percent-off":
      if (promotion.percent <= 0 || promotion.percent > 100) {
        errors.push("percent must be between 0 and 100");
      }
      break;
    case "amount-off":
      if (
        !Number.isInteger(promotion.amountCents) ||
        promotion.amountCents <= 0
      ) {
        errors.push("amountCents must be a positive whole number");
      }
      break;
    case "buy-x-get-y":
      if (!Number.isInteger(promotion.buy) || promotion.buy < 1) {
        errors.push("buy must be at least 1");
      }
      if (!Number.isInteger(promotion.get) || promotion.get < 1) {
        errors.push("get must be at least 1");
      }
      break;
    case "free-shipping":
      break;
  }
  return errors;
}

export function discountFor(
  promotion: Promotion,
  lines: readonly PromotionLine[],
  remainingCents: number,
): PromotionResult {
  const result = (discountCents: number, freeShipping = false) => ({
    promotionId: promotion.id,
    discountCents: Math.min(remainingCents, discountCents),
    freeShipping,
  });
  switch (promotion.kind) {
    case "percent-off": {
      const skus = promotion.skus;
      const base = skus
        ? lineSubtotal(lines.filter((line) => skus.includes(line.sku)))
        : remainingCents;
      return result(Math.round((base * promotion.percent) / 100));
    }
    case "amount-off":
      return result(promotion.amountCents);
    case "buy-x-get-y": {
      const line = lines.find((l) => l.sku === promotion.sku);
      if (!line) return result(0);
      const groups = Math.floor(
        line.quantity / (promotion.buy + promotion.get),
      );
      return result(groups * promotion.get * line.unitCents);
    }
    case "free-shipping":
      return result(0, true);
  }
}
