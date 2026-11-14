import type { CheckoutSession, CheckoutTotals } from "../checkout/types";
import { invoiceNumber } from "./numbering";
import type { Invoice } from "./types";

export function buildInvoice(
  session: CheckoutSession,
  totals: CheckoutTotals,
  sequence: number,
  issuedAt: Date,
): Invoice {
  return {
    number: invoiceNumber(session.region.code, sequence, issuedAt),
    issuedAt,
    region: session.region,
    sessionId: session.id,
    totals,
  };
}
