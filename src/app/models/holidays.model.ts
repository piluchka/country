export interface HolidayInfo {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  countries: string[] | null;
  launchYear: string | null;
  types: string[];
}
