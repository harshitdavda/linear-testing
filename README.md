# linear-testing

Sandbox repo for testing Linear Reviews (Diffs), PR automations and Loops.

```bash
pnpm install --frozen-lockfile
pnpm typecheck && pnpm test
pnpm lint
```

## Docs

- [Checkout v2](docs/checkout.md)
- [Regions and tax](docs/regions.md)
- [Shipping](docs/shipping.md)
- [Promotions](docs/promotions.md)
- [Invoices](docs/invoices.md)
- [Events and webhooks](docs/webhooks.md)
- [Pricing (v1)](docs/pricing.md)

## CI on demand

Add these PR labels to force a CI job to fail:

- `fail-test`: fails the required `test` check
- `fail-lint`: fails the non-required `lint` check
