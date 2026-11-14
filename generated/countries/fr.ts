// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const FR: Country = {
  code: "FR",
  name: "France",
  callingCode: "33",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "75008",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
