// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const GR: Country = {
  code: "GR",
  name: "Greece",
  callingCode: "30",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{3} \d{2}$/,
    example: "105 57",
    required: true,
    canonical: { fromEnd: 2, separator: " " },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
