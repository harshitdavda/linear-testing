# Orders

An order is a priced snapshot of a cart. It owns its lines, its totals and a
history of every status it has been in. All functions are pure: they return a
new order (and a new inventory when stock changes) instead of mutating.

## Lifecycle

```
pending ──▶ paid ──▶ shipped ──▶ delivered
   │          │                      │
   ▼          ▼                      ▼
cancelled  refunded              refunded
```

| From        | Allowed next              |
| ----------- | ------------------------- |
| `pending`   | `paid`, `cancelled`       |
| `paid`      | `shipped`, `refunded`     |
| `shipped`   | `delivered`               |
| `delivered` | `refunded`                |
| `cancelled` | none (terminal)           |
| `refunded`  | none (terminal)           |

Any other move throws `InvalidTransitionError`. A paid order cannot be
cancelled; refund it instead. An order in transit cannot be refunded until it
is delivered.

## Inventory

Stock is tracked per SKU as `onHand` and `reserved`. Available stock is
`onHand - reserved`.

| Action          | Stock effect                                 |
| --------------- | -------------------------------------------- |
| `placeOrder`    | reserves every line, or throws and reserves nothing |
| `shipOrder`     | commits the reservation: `onHand` and `reserved` both drop |
| `cancelOrder`   | releases the reservation                     |
| `refundOrder`   | releases the reservation if the order was only paid; delivered refunds leave stock alone |

`InsufficientStockError.shortages` lists every SKU that was short, with the
requested and available quantities.

## Totals

Totals reuse the pricing rules in [pricing.md](./pricing.md): the discount is
applied to the subtotal, then tax is added. `discountCents` and `taxCents` are
the differences between those steps, so the parts always add up to
`totalCents`.

## Receipts

`buildReceipt(order)` formats every amount in the order currency.
`renderReceipt(receipt)` prints a 32-column text receipt. The discount row is
left out when no discount applies.

## CSV export

Both exports use CRLF line endings and quote fields that contain commas,
quotes, newlines or edge whitespace.

`ordersToCsv(orders)` writes one row per order:

```
order_id,status,placed_at,currency,discount_code,item_count,subtotal_cents,discount_cents,tax_cents,total_cents
```

`orderLinesToCsv(orders)` writes one row per order line:

```
order_id,sku,quantity,unit_price_cents,line_total_cents
```

Amounts are integer cents so spreadsheets do not round them.
