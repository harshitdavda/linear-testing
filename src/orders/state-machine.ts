import type { OrderStatus } from "./types";

const TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["shipped", "refunded"],
  shipped: ["delivered"],
  delivered: ["refunded"],
  cancelled: [],
  refunded: [],
};

export class InvalidTransitionError extends Error {
  readonly from: OrderStatus;
  readonly to: OrderStatus;

  constructor(from: OrderStatus, to: OrderStatus) {
    super(`cannot move order from ${from} to ${to}`);
    this.name = "InvalidTransitionError";
    this.from = from;
    this.to = to;
  }
}

export function nextStatuses(from: OrderStatus): readonly OrderStatus[] {
  return TRANSITIONS[from];
}

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export function isTerminal(status: OrderStatus): boolean {
  return TRANSITIONS[status].length === 0;
}

export function assertTransition(from: OrderStatus, to: OrderStatus): void {
  if (!canTransition(from, to)) throw new InvalidTransitionError(from, to);
}
