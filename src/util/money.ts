export function sumCents(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function allocate(
  totalCents: number,
  weights: readonly number[],
): number[] {
  if (!Number.isInteger(totalCents) || totalCents < 0) {
    throw new Error("total must be a non-negative whole number of cents");
  }
  if (weights.some((weight) => weight < 0)) {
    throw new Error("weights cannot be negative");
  }
  const weightSum = sumCents(weights);
  if (weightSum === 0) {
    if (totalCents === 0) return weights.map(() => 0);
    throw new Error("cannot allocate a positive total across zero weights");
  }
  const exact = weights.map((weight) => (totalCents * weight) / weightSum);
  const shares = exact.map(Math.floor);
  let remainder = totalCents - sumCents(shares);
  const byFraction = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (const { index } of byFraction) {
    if (remainder === 0) break;
    shares[index] += 1;
    remainder -= 1;
  }
  return shares;
}
