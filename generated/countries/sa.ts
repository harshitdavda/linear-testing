// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const SA: Country = {
  code: "SA",
  name: "Saudi Arabia",
  callingCode: "966",
  currency: "SAR",
  postalCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    example: "11564",
    required: true,
    canonical: { fromEnd: 4, separator: "-" },
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
