import type { Promotion, PromotionLine } from "./types";

export function lineSubtotal(lines: readonly PromotionLine[]): number {
  return lines.reduce(
    (total, line) => total + line.unitCents * line.quantity,
    0,
  );
}

export function isActive(promotion: Promotion, now: Date): boolean {
  if (promotion.startsAt && now < new Date(promotion.startsAt)) return false;
  if (promotion.endsAt && now >= new Date(promotion.endsAt)) return false;
  return true;
}

export function isEligible(
  promotion: Promotion,
  lines: readonly PromotionLine[],
  now: Date,
): boolean {
  if (!isActive(promotion, now)) return false;
  if (
    promotion.minSubtotalCents !== undefined &&
    lineSubtotal(lines) < promotion.minSubtotalCents
  ) {
    return false;
  }
  if (promotion.kind === "buy-x-get-y") {
    const { sku, buy, get } = promotion;
    return lines.some((line) => line.sku === sku && line.quantity >= buy + get);
  }
  if (promotion.kind === "percent-off" && promotion.skus) {
    const skus = promotion.skus;
    return lines.some((line) => skus.includes(line.sku));
  }
  return true;
}
