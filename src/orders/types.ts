import type { CurrencyCode } from "../../generated/currencies";

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type OrderLine = { sku: string; priceCents: number; quantity: number };

export type OrderTotals = {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
};

export type OrderEvent = { status: OrderStatus; at: string };

export type Order = {
  id: string;
  status: OrderStatus;
  currency: CurrencyCode;
  lines: readonly OrderLine[];
  discountCode?: string;
  taxRate: number;
  totals: OrderTotals;
  history: readonly OrderEvent[];
};
