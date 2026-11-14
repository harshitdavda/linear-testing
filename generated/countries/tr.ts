// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const TR: Country = {
  code: "TR",
  name: "Türkiye",
  callingCode: "90",
  currency: "TRY",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "34000",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
