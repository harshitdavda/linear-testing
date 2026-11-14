# Events and webhooks

Checkout emits these events, in this order:

1. `promotion.applied`, once per applied promotion, with that promotion's own discount
2. `checkout.completed`
3. `invoice.issued`, when an invoice was created

## Webhook deliveries

`buildWebhook(event, endpointId, sentAt)` returns the body and headers to POST.

| Header | Value |
| --- | --- |
| `content-type` | `application/json` |
| `x-event-type` | The event type |
| `x-idempotency-key` | Same for every retry of the same event to the same endpoint |

Receivers should ignore a delivery whose idempotency key they have already processed.

## Retries

Retry on 408, 429 and any 5xx. Do not retry other 4xx responses.

`backoffDelays(maxAttempts, baseMs, capMs)` gives the waits between attempts: they double each time and stop growing at `capMs`.
