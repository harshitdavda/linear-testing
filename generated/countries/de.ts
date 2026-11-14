// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const DE: Country = {
  code: "DE",
  name: "Germany",
  callingCode: "49",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "10115",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
