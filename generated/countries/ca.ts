// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CA: Country = {
  code: "CA",
  name: "Canada",
  callingCode: "1",
  currency: "CAD",
  postalCode: {
    pattern: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/,
    example: "K1A 0B1",
    required: true,
    canonical: { fromEnd: 3, separator: " " },
  },
  subdivision: { label: "Province", required: true },
  localityLines: [
    "{city}, {subdivision} {postalCode}",
  ],
};
