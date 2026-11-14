import { type Order, type OrderLine, placedAt } from "../orders";
import { type CsvColumn, toCsv } from "./csv";

const ORDER_COLUMNS: readonly CsvColumn<Order>[] = [
  { header: "order_id", value: (o) => o.id },
  { header: "status", value: (o) => o.status },
  { header: "placed_at", value: placedAt },
  { header: "currency", value: (o) => o.currency },
  { header: "discount_code", value: (o) => o.discountCode },
  {
    header: "item_count",
    value: (o) => o.lines.reduce((sum, l) => sum + l.quantity, 0),
  },
  { header: "subtotal_cents", value: (o) => o.totals.subtotalCents },
  { header: "discount_cents", value: (o) => o.totals.discountCents },
  { header: "tax_cents", value: (o) => o.totals.taxCents },
  { header: "total_cents", value: (o) => o.totals.totalCents },
];

type LineRow = { order: Order; line: OrderLine };

const LINE_COLUMNS: readonly CsvColumn<LineRow>[] = [
  { header: "order_id", value: (r) => r.order.id },
  { header: "sku", value: (r) => r.line.sku },
  { header: "quantity", value: (r) => r.line.quantity },
  { header: "unit_price_cents", value: (r) => r.line.priceCents },
  {
    header: "line_total_cents",
    value: (r) => r.line.priceCents * r.line.quantity,
  },
];

export function ordersToCsv(orders: readonly Order[]): string {
  return toCsv(orders, ORDER_COLUMNS);
}

export function orderLinesToCsv(orders: readonly Order[]): string {
  const rows = orders.flatMap((order) =>
    order.lines.map((line) => ({ order, line })),
  );
  return toCsv(rows, LINE_COLUMNS);
}
