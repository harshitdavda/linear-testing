import { formatMoney } from "../format";
import type { Invoice } from "./types";

export function renderInvoiceText(invoice: Invoice): string {
  const { totals, region } = invoice;
  const money = (cents: number) => formatMoney(cents, totals.currency);
  const taxLabel = region.taxInclusive ? "Tax included" : "Tax";
  return [
    `Invoice ${invoice.number}`,
    `Issued ${invoice.issuedAt.toISOString().slice(0, 10)} · ${region.name}`,
    "",
    ...totals.lines.map(
      (line) => `${line.sku} x${line.quantity}  ${money(line.grossCents)}`,
    ),
    "",
    `Subtotal  ${money(totals.subtotalCents)}`,
    ...(totals.discountCents > 0
      ? [`Discount  -${money(totals.discountCents)}`]
      : []),
    `Shipping  ${money(totals.shippingCents)}`,
    `${taxLabel}  ${money(totals.taxCents)}`,
    `Total  ${money(totals.totalCents)}`,
  ].join("\n");
}
