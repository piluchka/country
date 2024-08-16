import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountryService } from '../services/country.service';
import {
  loadAllCountries,
  loadAllCountriesFailure,
  loadAllCountriesSuccess,
  loadCountryInfo,
  loadCountryInfoFailure,
  loadCountryInfoSuccess,
  loadHolidayInfo,
  loadHolidayInfoFailure,
  loadHolidayInfoSuccess,
} from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CountryEffects {
  loadAllCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllCountries),
      switchMap(() => {
        return this.countryService.getAllCountries().pipe(
          map((countryList) =>
            loadAllCountriesSuccess({ allCountries: countryList })
          ),
          catchError((error) => of(loadAllCountriesFailure({ error: error })))
        );
      })
    )
  );

  loadCountryInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCountryInfo),
      switchMap((props) => {
        return this.countryService.getInfoAboutCountry(props.countryCode).pipe(
          map((info) => loadCountryInfoSuccess({ countryInfo: info })),
          catchError((error) => of(loadCountryInfoFailure({ error: error })))
        );
      })
    )
  );

  loadHolidayInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHolidayInfo),
      switchMap((props) => {
        return this.countryService
          .getHolidayInfo(props.year, props.countryCode)
          .pipe(
            map((info) => loadHolidayInfoSuccess({ countryHolidayInfo: info })),
            catchError((error) => of(loadHolidayInfoFailure({ error: error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) {}
}
