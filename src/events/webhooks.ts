import { fnv1a } from "../util/hash";
import type { CheckoutEvent } from "./types";

export type WebhookDelivery = {
  id: string;
  endpointId: string;
  idempotencyKey: string;
  headers: Record<string, string>;
  body: string;
};

export function buildWebhook(
  event: CheckoutEvent,
  endpointId: string,
  sentAt: Date,
): WebhookDelivery {
  const body = JSON.stringify({ event, sentAt: sentAt.toISOString() });
  const idempotencyKey = fnv1a(`${endpointId}:${JSON.stringify(event)}`);
  return {
    id: `whd_${fnv1a(`${idempotencyKey}:${sentAt.toISOString()}`)}`,
    endpointId,
    idempotencyKey,
    headers: {
      "content-type": "application/json",
      "x-event-type": event.type,
      "x-idempotency-key": idempotencyKey,
    },
    body,
  };
}
