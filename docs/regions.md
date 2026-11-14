# Regions and tax

Regions live in `generated/regions.ts` and are regenerated from the tax provider export. Do not edit them by hand.

| Region | Currency | Standard rate | Tax style |
| --- | --- | --- | --- |
| US_CA | USD | 7.25% | Added at checkout |
| US_NY | USD | 4% | Added at checkout |
| US_OR | USD | 0% | Added at checkout |
| DE | EUR | 19% | Included in price |
| FR | EUR | 20% | Included in price |
| IN_MH | INR | 18% | Included in price |
| JP | JPY | 10% | Included in price |

## Category rates

Some categories have their own rate, in `generated/tax-rates.ts`. For example food is 0% in California and New York, 7% in Germany and 8% in Japan. Anything without an override uses the region's standard rate.

## Rounding

Tax is rounded to the nearest hundredth per line. In inclusive regions the net amount is rounded and the tax is the remainder, so net + tax always equals the price.
