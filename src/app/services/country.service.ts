import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country, CountryInfo } from '../models/country.model';
import { environment } from '../../environments/environment.development';
import { RequestStringPaths } from '../enums/requests.enum';
import { HolidayInfo } from '../models/holidays.model';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${environment.apiBaseUrl}${RequestStringPaths.AVAILABLE_CONTRIES}`
    );
  }

  getInfoAboutCountry(countryCode: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(
      `${environment.apiBaseUrl}${RequestStringPaths.COUNTRY_INFO}/${countryCode}`
    );
  }

  getHolidayInfo(year: string, countryCode: string): Observable<HolidayInfo[]> {
    return this.http.get<HolidayInfo[]>(
      `${environment.apiBaseUrl}${RequestStringPaths.HOLIDAY_INFO}/${year}/${countryCode}`
    );
  }
}
