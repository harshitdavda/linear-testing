// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const PL: Country = {
  code: "PL",
  name: "Poland",
  callingCode: "48",
  currency: "PLN",
  postalCode: {
    pattern: /^\d{2}-\d{3}$/,
    example: "00-950",
    required: true,
    canonical: { fromEnd: 3, separator: "-" },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
