import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './state';
import { Country } from '../models/country.model';

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

// Random contries
export const selectThreeRandomContries = createSelector(
  selectState,
  (state) => {
    const randomCountries: Country[] = [];
    if (state.allCountries) {
      for (let i = 0; i < 3; i++) {
        const randomIndex =
          0 + Math.floor(Math.random() * (state.allCountries.length - 0 + 1));

        randomCountries.push(state.allCountries[randomIndex]);
      }
    }
    return randomCountries;
  }
);

// Holidays info
export const selectCountryHolidayInfo = createSelector(
  selectState,
  (state) => state.countryHolidayInfo
);
