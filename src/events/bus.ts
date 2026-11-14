import type { CheckoutEvent, CheckoutEventType, EventOf } from "./types";

type Handler<T extends CheckoutEventType> = (event: EventOf<T>) => void;

export type EventBus = {
  subscribe<T extends CheckoutEventType>(
    type: T,
    handler: Handler<T>,
  ): () => void;
  publish(event: CheckoutEvent): number;
};

export function createEventBus(): EventBus {
  const handlers = new Map<
    CheckoutEventType,
    Set<(event: CheckoutEvent) => void>
  >();
  return {
    subscribe(type, handler) {
      const set = handlers.get(type) ?? new Set();
      const wrapped = handler as (event: CheckoutEvent) => void;
      set.add(wrapped);
      handlers.set(type, set);
      return () => set.delete(wrapped);
    },
    publish(event) {
      const set = handlers.get(event.type);
      if (!set) return 0;
      for (const handler of [...set]) handler(event);
      return set.size;
    },
  };
}
