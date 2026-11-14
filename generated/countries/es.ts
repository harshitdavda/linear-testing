// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const ES: Country = {
  code: "ES",
  name: "Spain",
  callingCode: "34",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "28013",
    required: true,
  },
  subdivision: { label: "Province", required: false },
  localityLines: [
    "{postalCode} {city}",
    "{subdivision}",
  ],
};
