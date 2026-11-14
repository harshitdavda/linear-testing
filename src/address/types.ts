export type Address = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  subdivision?: string;
  postalCode?: string;
  country: string;
};

export type AddressError = { field: keyof Address; message: string };
