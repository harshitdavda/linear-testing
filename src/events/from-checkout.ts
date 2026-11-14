import type { CheckoutSession, CheckoutTotals } from "../checkout/types";
import type { Invoice } from "../invoices/types";
import type { CheckoutEvent } from "./types";

export function checkoutEvents(
  session: CheckoutSession,
  totals: CheckoutTotals,
  invoice?: Invoice,
): CheckoutEvent[] {
  const promotionEvents: CheckoutEvent[] = totals.appliedPromotions.map(
    (result) => ({
      type: "promotion.applied",
      sessionId: session.id,
      promotionId: result.promotionId,
      discountCents: result.discountCents,
    }),
  );
  const completed: CheckoutEvent = {
    type: "checkout.completed",
    sessionId: session.id,
    totalCents: totals.totalCents,
    currency: totals.currency,
  };
  const issued: CheckoutEvent[] = invoice
    ? [
        {
          type: "invoice.issued",
          invoiceNumber: invoice.number,
          sessionId: session.id,
          totalCents: totals.totalCents,
        },
      ]
    : [];
  return [...promotionEvents, completed, ...issued];
}
