import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import {
  loadAllCountriesFailure,
  loadAllCountriesSuccess,
  loadCountryInfoFailure,
  loadCountryInfoSuccess,
  loadHolidayInfoFailure,
  loadHolidayInfoSuccess,
} from './actions';

export const CountryReducer = createReducer(
  initialState,

  // All countries
  on(loadAllCountriesSuccess, (state, { allCountries }) => {
    return {
      ...state,
      allCountries: allCountries,
    };
  }),
  on(loadAllCountriesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Country Info
  on(loadCountryInfoSuccess, (state, { countryInfo }) => {
    return {
      ...state,
      selectedCountryInfo: countryInfo,
    };
  }),
  on(loadCountryInfoFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // Holiday Info
  on(loadHolidayInfoSuccess, (state, { countryHolidayInfo }) => {
    return {
      ...state,
      countryHolidayInfo: countryHolidayInfo,
    };
  }),
  on(loadHolidayInfoFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
