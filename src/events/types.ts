import type { CurrencyCode } from "../../generated/currencies";

export type CheckoutEvent =
  | {
      type: "checkout.completed";
      sessionId: string;
      totalCents: number;
      currency: CurrencyCode;
    }
  | {
      type: "promotion.applied";
      sessionId: string;
      promotionId: string;
      discountCents: number;
    }
  | {
      type: "invoice.issued";
      invoiceNumber: string;
      sessionId: string;
      totalCents: number;
    };

export type CheckoutEventType = CheckoutEvent["type"];

export type EventOf<T extends CheckoutEventType> = Extract<
  CheckoutEvent,
  { type: T }
>;
