# Invoices

Invoice numbers look like `INV-US-CA-2026-000042`: region, year of issue (UTC), then a six-digit sequence.

- `nextSequence(last)` gives the next number. Store the last one per region.
- `renderInvoiceText` gives a plain-text receipt for email.
- `renderInvoiceHtml` gives an HTML fragment. Every value is escaped, including SKUs.

Inclusive regions show "Tax included" instead of "Tax", and the total does not change.
