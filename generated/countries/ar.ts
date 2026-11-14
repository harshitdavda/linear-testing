// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const AR: Country = {
  code: "AR",
  name: "Argentina",
  callingCode: "54",
  currency: "ARS",
  postalCode: {
    pattern: /^([A-Z]\d{4}[A-Z]{3}|\d{4})$/,
    example: "C1425DKA",
    required: true,
  },
  subdivision: { label: "Province", required: true },
  localityLines: [
    "{postalCode} {city}, {subdivision}",
  ],
};
