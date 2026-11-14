export type ShippingZone = "domestic-us" | "eu" | "asia";

const ZONE_BY_COUNTRY: Record<string, ShippingZone> = {
  US: "domestic-us",
  DE: "eu",
  FR: "eu",
  IN: "asia",
  JP: "asia",
};

export function zoneFor(country: string): ShippingZone {
  const zone = ZONE_BY_COUNTRY[country];
  if (!zone) throw new Error(`no shipping zone for country: ${country}`);
  return zone;
}
