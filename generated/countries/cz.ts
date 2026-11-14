// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CZ: Country = {
  code: "CZ",
  name: "Czechia",
  callingCode: "420",
  currency: "CZK",
  postalCode: {
    pattern: /^\d{3} \d{2}$/,
    example: "110 00",
    required: true,
    canonical: { fromEnd: 2, separator: " " },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
