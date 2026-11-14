import { REGIONS, type RegionCode } from "../../generated/regions";
import type { Region } from "./types";

export function isRegionCode(code: string): code is RegionCode {
  return Object.hasOwn(REGIONS, code);
}

export function getRegion(code: string): Region {
  if (!isRegionCode(code)) throw new Error(`unknown region: ${code}`);
  return { code, ...REGIONS[code] };
}

export function regionsForCountry(country: string): Region[] {
  return (Object.keys(REGIONS) as RegionCode[])
    .filter((code) => REGIONS[code].country === country)
    .map((code) => getRegion(code));
}
