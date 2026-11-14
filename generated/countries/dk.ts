// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const DK: Country = {
  code: "DK",
  name: "Denmark",
  callingCode: "45",
  currency: "DKK",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "1050",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
