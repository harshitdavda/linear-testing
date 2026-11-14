import { describe, expect, it } from "vitest";
import {
  isValidPostalCode,
  normalizePostalCode,
} from "../../src/address/postal-code";

describe("normalizePostalCode", () => {
  it("uppercases and collapses spaces", () => {
    expect(normalizePostalCode("gb", "  ec1a   1bb ")).toBe("EC1A 1BB");
  });

  it("adds the missing separator", () => {
    expect(normalizePostalCode("NL", "1012js")).toBe("1012 JS");
    expect(normalizePostalCode("PL", "00 950")).toBe("00-950");
  });

  it("keeps short ZIP codes as they are", () => {
    expect(normalizePostalCode("US", "94103")).toBe("94103");
    expect(normalizePostalCode("US", "94103 1234")).toBe("94103-1234");
  });

  it("returns the cleaned input when nothing matches", () => {
    expect(normalizePostalCode("DE", " 1o115 ")).toBe("1O115");
  });

  it("leaves countries without postal codes alone", () => {
    expect(normalizePostalCode("HK", " n/a ")).toBe("N/A");
  });
});

describe("isValidPostalCode", () => {
  it("checks the country's pattern", () => {
    expect(isValidPostalCode("IN", "110001")).toBe(true);
    expect(isValidPostalCode("IN", "010001")).toBe(false);
    expect(isValidPostalCode("AR", "1425")).toBe(true);
  });

  it("only accepts blank values where there are no postal codes", () => {
    expect(isValidPostalCode("AE", "")).toBe(true);
    expect(isValidPostalCode("AE", "12345")).toBe(false);
  });
});
