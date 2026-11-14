import { describe, expect, it } from "vitest";
import { checkout } from "../src/checkout";
import { buildInvoice } from "../src/invoices/build";
import { invoiceNumber, nextSequence } from "../src/invoices/numbering";
import { renderInvoiceHtml } from "../src/invoices/render-html";
import { renderInvoiceText } from "../src/invoices/render-text";
import { input, LAMP, NOW } from "./fixtures";

describe("numbering", () => {
  it("formats invoice numbers", () => {
    expect(invoiceNumber("US_CA", 42, NOW)).toBe("INV-US-CA-2026-000042");
  });

  it("rejects bad sequences", () => {
    expect(() => invoiceNumber("JP", 0, NOW)).toThrow();
  });

  it("counts up from the last number", () => {
    expect(nextSequence(undefined)).toBe(1);
    expect(nextSequence(41)).toBe(42);
  });
});

describe("rendering", () => {
  const de = checkout(
    input({
      regionCode: "DE",
      lines: [{ ...LAMP, unitCents: 1190, weightGrams: 200 }],
    }),
  );
  const invoice = buildInvoice(de.session, de.totals, 7, NOW);

  it("renders plain text", () => {
    const text = renderInvoiceText(invoice);
    expect(text).toContain("Invoice INV-DE-2026-000007");
    expect(text).toContain("Tax included  €1.90");
    expect(text).toContain("Total  €20.89");
    expect(text).not.toContain("Discount");
  });

  it("escapes html", () => {
    const tricky = checkout(
      input({ lines: [{ ...LAMP, sku: "<b>lamp</b>" }] }),
    );
    const html = renderInvoiceHtml(
      buildInvoice(tricky.session, tricky.totals, 1, NOW),
    );
    expect(html).toContain("&lt;b&gt;lamp&lt;/b&gt;");
    expect(html).not.toContain("<b>lamp");
  });
});
