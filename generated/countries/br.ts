// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const BR: Country = {
  code: "BR",
  name: "Brazil",
  callingCode: "55",
  currency: "BRL",
  postalCode: {
    pattern: /^\d{5}-\d{3}$/,
    example: "01310-100",
    required: true,
    canonical: { fromEnd: 3, separator: "-" },
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{city} - {subdivision}",
    "{postalCode}",
  ],
};
