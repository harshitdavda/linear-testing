// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const RO: Country = {
  code: "RO",
  name: "Romania",
  callingCode: "40",
  currency: "RON",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "010011",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
