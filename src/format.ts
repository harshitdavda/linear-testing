import { CURRENCIES, type CurrencyCode } from "../generated/currencies";

export function formatMoney(
  cents: number,
  currency: CurrencyCode = "USD",
): string {
  const { symbol, decimals } = CURRENCIES[currency];
  const abs = Math.abs(cents);
  const amount = decimals === 0 ? Math.round(abs / 100) : abs / 100;
  const sign = cents < 0 ? "-" : "";
  return `${sign}${symbol}${amount.toFixed(decimals)}`;
}
