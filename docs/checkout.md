# Checkout v2

`checkout(input)` turns a cart into a session and its totals.

1. `createSession` looks up the region and validates the lines. Duplicate SKUs, non-whole quantities and negative prices are rejected.
2. Promotions are applied to the line subtotal (see [promotions](promotions.md)).
3. The discount is spread across lines in proportion to their amount, so every cent is accounted for.
4. Tax is worked out per line after its share of the discount (see [regions](regions.md)).
5. Shipping is quoted on the goods total **after** discounts (see [shipping](shipping.md)).

## Totals

| Field | Meaning |
| --- | --- |
| `subtotalCents` | Sum of unit price × quantity |
| `discountCents` | Total of all applied promotions |
| `shippingCents` | Zero when a free-shipping promotion applies |
| `taxCents` | Added on top in exclusive regions, included in the price in inclusive ones |
| `totalCents` | What the customer pays |
| `appliedPromotions` | Each promotion with its own discount |

All amounts are whole hundredths of the region's currency. Shipping is not taxed.

## Example

```ts
const { session, totals } = checkout({
  regionCode: "US_CA",
  lines: [{ sku: "lamp", category: "standard", unitCents: 4000, quantity: 1, weightGrams: 400 }],
  shippingMethod: "standard",
  promotions: [],
  now: new Date(),
});
```
