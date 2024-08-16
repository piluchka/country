import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './state';

export const selectState = createFeatureSelector<CountryState>('country');

// All countries
export const selectAllCountries = createSelector(
  selectState,
  (state) => state.allCountries
);

// Country Info
export const selectCountryInfo = createSelector(
  selectState,
  (state) => state.selectedCountryInfo
);

// Holidays info
export const selectCountryHolidayInfo = createSelector(
  selectState,
  (state) => state.countryHolidayInfo
);
