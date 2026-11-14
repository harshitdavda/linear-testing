// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const HU: Country = {
  code: "HU",
  name: "Hungary",
  callingCode: "36",
  currency: "HUF",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "1051",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
