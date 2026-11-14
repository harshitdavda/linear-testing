import { applyPromotions } from "../promotions/apply";
import { taxLine } from "../regions/tax";
import { shippingQuote } from "../shipping/estimate";
import { zoneFor } from "../shipping/zones";
import { allocate, sumCents } from "../util/money";
import type { CheckoutSession, CheckoutTotals, TotalsLine } from "./types";

export function computeTotals(session: CheckoutSession): CheckoutTotals {
  const { region, input } = session;
  const amounts = input.lines.map((line) => line.unitCents * line.quantity);
  const subtotalCents = sumCents(amounts);
  const promotions = applyPromotions(input.promotions, input.lines, input.now);
  const discounts = allocate(promotions.discountCents, amounts);

  const lines: TotalsLine[] = input.lines.map((line, index) => {
    const tax = taxLine(
      region,
      line.category,
      amounts[index] - discounts[index],
    );
    return {
      sku: line.sku,
      quantity: line.quantity,
      amountCents: amounts[index],
      discountCents: discounts[index],
      taxCents: tax.taxCents,
      grossCents: tax.grossCents,
    };
  });

  const weightGrams = sumCents(
    input.lines.map((line) => line.weightGrams * line.quantity),
  );
  const goodsAfterDiscount = subtotalCents - promotions.discountCents;
  const shippingCents = promotions.freeShipping
    ? 0
    : shippingQuote(
        zoneFor(region.country),
        input.shippingMethod,
        goodsAfterDiscount,
        weightGrams,
      );

  return {
    currency: region.currency,
    lines,
    subtotalCents,
    discountCents: promotions.discountCents,
    shippingCents,
    taxCents: sumCents(lines.map((line) => line.taxCents)),
    totalCents: sumCents(lines.map((line) => line.grossCents)) + shippingCents,
    appliedPromotions: promotions.results,
  };
}
