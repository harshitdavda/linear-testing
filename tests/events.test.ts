import { describe, expect, it } from "vitest";
import { checkout } from "../src/checkout";
import { createEventBus } from "../src/events/bus";
import { checkoutEvents } from "../src/events/from-checkout";
import { backoffDelays, shouldRetry } from "../src/events/retry";
import type { CheckoutEvent } from "../src/events/types";
import { buildWebhook } from "../src/events/webhooks";
import { buildInvoice } from "../src/invoices/build";
import { input, NOW, percentOff } from "./fixtures";

const completed: CheckoutEvent = {
  type: "checkout.completed",
  sessionId: "chk_1",
  totalCents: 100,
  currency: "USD",
};

describe("event bus", () => {
  it("delivers to subscribers of that type only", () => {
    const bus = createEventBus();
    const seen: number[] = [];
    const stop = bus.subscribe("checkout.completed", (e) =>
      seen.push(e.totalCents),
    );
    bus.subscribe("invoice.issued", () => seen.push(-1));
    expect(bus.publish(completed)).toBe(1);
    stop();
    expect(bus.publish(completed)).toBe(0);
    expect(seen).toEqual([100]);
  });
});

describe("checkoutEvents", () => {
  it("emits one event per promotion with its own discount", () => {
    const promos = [
      percentOff("ten", 10, { priority: 2 }),
      percentOff("five", 5, { priority: 1 }),
    ];
    const { session, totals } = checkout(input({ promotions: promos }));
    const events = checkoutEvents(
      session,
      totals,
      buildInvoice(session, totals, 1, NOW),
    );
    expect(events.map((e) => e.type)).toEqual([
      "promotion.applied",
      "promotion.applied",
      "checkout.completed",
      "invoice.issued",
    ]);
    expect(
      events.flatMap((e) =>
        e.type === "promotion.applied" ? [e.discountCents] : [],
      ),
    ).toEqual([600, 270]);
  });
});

describe("webhooks", () => {
  it("keeps the idempotency key across retries", () => {
    const first = buildWebhook(completed, "ep_1", NOW);
    const retry = buildWebhook(
      completed,
      "ep_1",
      new Date(NOW.getTime() + 1000),
    );
    expect(retry.idempotencyKey).toBe(first.idempotencyKey);
    expect(retry.id).not.toBe(first.id);
    expect(first.headers["x-event-type"]).toBe("checkout.completed");
    expect(JSON.parse(first.body).event).toEqual(completed);
  });

  it("uses a different key per endpoint", () => {
    expect(buildWebhook(completed, "ep_1", NOW).idempotencyKey).not.toBe(
      buildWebhook(completed, "ep_2", NOW).idempotencyKey,
    );
  });
});

describe("retry", () => {
  it("retries timeouts, rate limits and server errors", () => {
    expect([408, 429, 500, 503].every(shouldRetry)).toBe(true);
    expect([200, 400, 404].some(shouldRetry)).toBe(false);
  });

  it("backs off exponentially up to a cap", () => {
    expect(backoffDelays(6, 100, 1000)).toEqual([100, 200, 400, 800, 1000]);
    expect(backoffDelays(1, 100, 1000)).toEqual([]);
    expect(() => backoffDelays(0, 100, 1000)).toThrow();
  });
});
