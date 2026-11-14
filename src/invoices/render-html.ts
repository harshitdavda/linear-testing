import { formatMoney } from "../format";
import { escapeHtml } from "../util/html";
import type { Invoice } from "./types";

export function renderInvoiceHtml(invoice: Invoice): string {
  const { totals, region } = invoice;
  const money = (cents: number) =>
    escapeHtml(formatMoney(cents, totals.currency));
  const row = (label: string, value: string) =>
    `<tr><th>${escapeHtml(label)}</th><td>${value}</td></tr>`;
  const lineRows = totals.lines
    .map(
      (line) =>
        `<tr><td>${escapeHtml(line.sku)}</td><td>${line.quantity}</td><td>${money(line.grossCents)}</td></tr>`,
    )
    .join("");
  const summary = [
    row("Subtotal", money(totals.subtotalCents)),
    totals.discountCents > 0
      ? row("Discount", `-${money(totals.discountCents)}`)
      : "",
    row("Shipping", money(totals.shippingCents)),
    row(region.taxInclusive ? "Tax included" : "Tax", money(totals.taxCents)),
    row("Total", money(totals.totalCents)),
  ].join("");
  return [
    `<article class="invoice" data-number="${escapeHtml(invoice.number)}">`,
    `<h1>Invoice ${escapeHtml(invoice.number)}</h1>`,
    `<p>${escapeHtml(region.name)} · ${invoice.issuedAt.toISOString().slice(0, 10)}</p>`,
    `<table class="lines">${lineRows}</table>`,
    `<table class="summary">${summary}</table>`,
    "</article>",
  ].join("");
}
