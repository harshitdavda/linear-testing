import type { Receipt } from "./receipt";

const WIDTH = 32;

function row(label: string, value: string): string {
  const gap = Math.max(1, WIDTH - label.length - value.length);
  return `${label}${" ".repeat(gap)}${value}`;
}

export function renderReceipt(receipt: Receipt): string {
  const rule = "-".repeat(WIDTH);
  const lines = [
    `Receipt ${receipt.orderId}`,
    `Placed ${receipt.placedAt}`,
    `Status ${receipt.status}`,
    rule,
    ...receipt.lines.map((line) =>
      row(`${line.quantity} x ${line.sku}`, line.lineTotal),
    ),
    rule,
    row("Subtotal", receipt.subtotal),
  ];
  if (receipt.discount) lines.push(row("Discount", receipt.discount));
  lines.push(row("Tax", receipt.tax), row("Total", receipt.total));
  return `${lines.join("\n")}\n`;
}
