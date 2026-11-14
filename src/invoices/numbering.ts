import type { RegionCode } from "../regions/types";

export function invoiceNumber(
  regionCode: RegionCode,
  sequence: number,
  issuedAt: Date,
): string {
  if (!Number.isInteger(sequence) || sequence < 1) {
    throw new Error("sequence must be a positive whole number");
  }
  const year = issuedAt.getUTCFullYear();
  const region = regionCode.replace("_", "-");
  return `INV-${region}-${year}-${String(sequence).padStart(6, "0")}`;
}

export function nextSequence(last: number | undefined): number {
  return (last ?? 0) + 1;
}
