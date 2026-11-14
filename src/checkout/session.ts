import { getRegion } from "../regions/registry";
import { fnv1a } from "../util/hash";
import type { CheckoutInput, CheckoutSession } from "./types";
import { validateLines } from "./validate";

export function createSession(input: CheckoutInput): CheckoutSession {
  const region = getRegion(input.regionCode);
  const errors = validateLines(input.lines);
  if (errors.length > 0) throw new Error(errors.join("; "));
  const fingerprint = [
    region.code,
    input.now.toISOString(),
    ...input.lines.map((line) => `${line.sku}x${line.quantity}`),
  ].join("|");
  return { id: `chk_${fnv1a(fingerprint)}`, region, input };
}
