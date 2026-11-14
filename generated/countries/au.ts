// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const AU: Country = {
  code: "AU",
  name: "Australia",
  callingCode: "61",
  currency: "AUD",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "2000",
    required: true,
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{city} {subdivision} {postalCode}",
  ],
};
