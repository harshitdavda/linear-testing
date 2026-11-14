// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const NZ: Country = {
  code: "NZ",
  name: "New Zealand",
  callingCode: "64",
  currency: "NZD",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "6011",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
