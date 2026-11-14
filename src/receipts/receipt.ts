import type { CurrencyCode } from "../../generated/currencies";
import { formatMoney } from "../format";
import { type Order, type OrderStatus, placedAt } from "../orders";

export type ReceiptLine = {
  sku: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
};

export type Receipt = {
  orderId: string;
  status: OrderStatus;
  placedAt: string;
  currency: CurrencyCode;
  lines: ReceiptLine[];
  subtotal: string;
  discount?: string;
  tax: string;
  total: string;
};

export function buildReceipt(order: Order): Receipt {
  const money = (cents: number) => formatMoney(cents, order.currency);
  const { subtotalCents, discountCents, taxCents, totalCents } = order.totals;
  return {
    orderId: order.id,
    status: order.status,
    placedAt: placedAt(order),
    currency: order.currency,
    lines: order.lines.map((line) => ({
      sku: line.sku,
      quantity: line.quantity,
      unitPrice: money(line.priceCents),
      lineTotal: money(line.priceCents * line.quantity),
    })),
    subtotal: money(subtotalCents),
    discount: discountCents > 0 ? `-${money(discountCents)}` : undefined,
    tax: money(taxCents),
    total: money(totalCents),
  };
}
