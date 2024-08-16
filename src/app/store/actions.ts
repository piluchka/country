import { createAction, props } from '@ngrx/store';
import { Country, CountryInfo } from '../models/country.model';
import { HolidayInfo } from '../models/holidays.model';

// All countries
export const loadAllCountries = createAction('[Country] Load All Countries');
export const loadAllCountriesSuccess = createAction(
  '[Country] Load All Countries Success',
  props<{ allCountries: Country[] }>()
);
export const loadAllCountriesFailure = createAction(
  '[Country] Load All Countries',
  props<{ error: any }>()
);

// Country info
export const loadCountryInfo = createAction(
  '[Country] Load Country Info',
  props<{ countryCode: string }>()
);
export const loadCountryInfoSuccess = createAction(
  '[Country] Load Country Info Success',
  props<{ countryInfo: CountryInfo }>()
);
export const loadCountryInfoFailure = createAction(
  '[Country] Load Country Info Failure',
  props<{ error: any }>()
);

// Holiday info
export const loadHolidayInfo = createAction(
  '[Country] Load Holiday Info',
  props<{ year: string; countryCode: string }>()
);
export const loadHolidayInfoSuccess = createAction(
  '[Country] Load Holiday Info Success',
  props<{ countryHolidayInfo: HolidayInfo[] }>()
);
export const loadHolidayInfoFailure = createAction(
  '[Country] Load Holiday Info Failure',
  props<{ error: any }>()
);
