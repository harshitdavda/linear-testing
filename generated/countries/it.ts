// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const IT: Country = {
  code: "IT",
  name: "Italy",
  callingCode: "39",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "00184",
    required: true,
  },
  subdivision: { label: "Province", required: true },
  localityLines: [
    "{postalCode} {city} {subdivision}",
  ],
};
