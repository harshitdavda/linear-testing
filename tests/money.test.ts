import { describe, expect, it } from "vitest";
import { allocate, sumCents } from "../src/util/money";

describe("allocate", () => {
  it("splits evenly and gives leftover cents to the first share", () => {
    expect(allocate(100, [1, 1, 1])).toEqual([34, 33, 33]);
  });

  it("splits by weight", () => {
    expect(allocate(10, [3, 7])).toEqual([3, 7]);
  });

  it("never loses or adds a cent", () => {
    expect(sumCents(allocate(999, [1, 2, 3, 4]))).toBe(999);
  });

  it("allows zero across zero weights", () => {
    expect(allocate(0, [0, 0])).toEqual([0, 0]);
  });

  it("rejects bad input", () => {
    expect(() => allocate(5, [0, 0])).toThrow();
    expect(() => allocate(-1, [1])).toThrow();
    expect(() => allocate(1.5, [1])).toThrow();
    expect(() => allocate(5, [-1, 2])).toThrow();
  });
});
