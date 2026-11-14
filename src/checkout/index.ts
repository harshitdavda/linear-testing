import { createSession } from "./session";
import { computeTotals } from "./totals";
import type { CheckoutInput, CheckoutSession, CheckoutTotals } from "./types";

export * from "./session";
export * from "./totals";
export * from "./types";
export * from "./validate";

export function checkout(input: CheckoutInput): {
  session: CheckoutSession;
  totals: CheckoutTotals;
} {
  const session = createSession(input);
  return { session, totals: computeTotals(session) };
}
