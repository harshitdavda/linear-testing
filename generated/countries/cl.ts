// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CL: Country = {
  code: "CL",
  name: "Chile",
  callingCode: "56",
  currency: "CLP",
  postalCode: {
    pattern: /^\d{7}$/,
    example: "8320000",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
