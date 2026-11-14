// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const PH: Country = {
  code: "PH",
  name: "Philippines",
  callingCode: "63",
  currency: "PHP",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "1000",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
