// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const MY: Country = {
  code: "MY",
  name: "Malaysia",
  callingCode: "60",
  currency: "MYR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "50088",
    required: true,
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{postalCode} {city}",
    "{subdivision}",
  ],
};
