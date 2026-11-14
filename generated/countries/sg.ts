// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const SG: Country = {
  code: "SG",
  name: "Singapore",
  callingCode: "65",
  currency: "SGD",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "018956",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
