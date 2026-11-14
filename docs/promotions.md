# Promotions

| Kind | What it does |
| --- | --- |
| `percent-off` | A percentage off the cart, or off selected SKUs only |
| `amount-off` | A fixed amount off the cart |
| `buy-x-get-y` | For every `buy + get` units of one SKU, `get` are free |
| `free-shipping` | Removes the shipping charge |

Every promotion can also have `startsAt`, `endsAt` (exclusive) and `minSubtotalCents`.

## Stacking

1. Ineligible promotions are dropped.
2. The rest are sorted by `priority` (highest first), then by `id`.
3. If the top promotion is not stackable, it applies on its own.
4. Otherwise every stackable promotion applies, in order. Non-stackable ones are dropped.

Each promotion is applied to what is left after the ones before it, and no promotion can take the total below zero.

Invalid promotions (for example a percentage over 100) make checkout throw rather than silently skip.
