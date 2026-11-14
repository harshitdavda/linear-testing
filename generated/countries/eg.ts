// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const EG: Country = {
  code: "EG",
  name: "Egypt",
  callingCode: "20",
  currency: "EGP",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "11511",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
