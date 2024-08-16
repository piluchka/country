import { Country, CountryInfo } from '../models/country.model';
import { HolidayInfo } from '../models/holidays.model';

export interface CountryState {
  allCountries: Country[] | null;
  selectedCountryInfo: CountryInfo | null;
  countryHolidayInfo: HolidayInfo[] | null;

  error: any;
}

export const initialState: CountryState = {
  allCountries: null,
  selectedCountryInfo: null,
  countryHolidayInfo: null,

  error: null,
};
