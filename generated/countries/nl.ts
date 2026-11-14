// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const NL: Country = {
  code: "NL",
  name: "Netherlands",
  callingCode: "31",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{4} [A-Z]{2}$/,
    example: "1012 JS",
    required: true,
    canonical: { fromEnd: 2, separator: " " },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
