// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CO: Country = {
  code: "CO",
  name: "Colombia",
  callingCode: "57",
  currency: "COP",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "110111",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city}, {postalCode}",
  ],
};
