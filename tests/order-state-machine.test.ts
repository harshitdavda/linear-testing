import { describe, expect, it } from "vitest";
import {
  assertTransition,
  canTransition,
  InvalidTransitionError,
  isTerminal,
  nextStatuses,
  type OrderStatus,
} from "../src/orders";

const ALL: OrderStatus[] = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

describe("order state machine", () => {
  it("follows the happy path", () => {
    expect(canTransition("pending", "paid")).toBe(true);
    expect(canTransition("paid", "shipped")).toBe(true);
    expect(canTransition("shipped", "delivered")).toBe(true);
  });

  it("only allows cancelling before payment", () => {
    expect(canTransition("pending", "cancelled")).toBe(true);
    expect(canTransition("paid", "cancelled")).toBe(false);
    expect(canTransition("shipped", "cancelled")).toBe(false);
  });

  it("allows refunds after payment or delivery but not in transit", () => {
    expect(canTransition("paid", "refunded")).toBe(true);
    expect(canTransition("delivered", "refunded")).toBe(true);
    expect(canTransition("shipped", "refunded")).toBe(false);
    expect(canTransition("pending", "refunded")).toBe(false);
  });

  it("never moves backwards or to the same status", () => {
    for (const status of ALL) expect(canTransition(status, status)).toBe(false);
    expect(canTransition("shipped", "paid")).toBe(false);
    expect(canTransition("delivered", "shipped")).toBe(false);
  });

  it("marks cancelled and refunded as terminal", () => {
    expect(ALL.filter(isTerminal)).toEqual(["cancelled", "refunded"]);
    expect(nextStatuses("refunded")).toEqual([]);
  });

  it("throws a typed error on invalid transitions", () => {
    expect(() => assertTransition("pending", "paid")).not.toThrow();
    try {
      assertTransition("cancelled", "paid");
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidTransitionError);
      expect(error).toMatchObject({ from: "cancelled", to: "paid" });
    }
  });
});
