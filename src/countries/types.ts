export type PostalCodeRule = {
  pattern: RegExp;
  example: string;
  required: boolean;
  canonical?: { fromEnd: number; separator: string };
};

export type SubdivisionRule = { label: string; required: boolean };

export type Country = {
  code: string;
  name: string;
  callingCode: string;
  currency: string;
  postalCode: PostalCodeRule | null;
  subdivision: SubdivisionRule | null;
  localityLines: readonly string[];
};
