import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchingInputComponent } from '../../components/searching-input/searching-input.component';
import { ActivatedRoute } from '@angular/router';
import { CountryInfo } from '../../models/country.model';
import { Store } from '@ngrx/store';
import {
  selectCountryHolidayInfo,
  selectCountryInfo,
} from '../../store/selectors';
import { loadCountryInfo, loadHolidayInfo } from '../../store/actions';
import { HolidayCardComponent } from '../../components/holiday-card/holiday-card.component';
import { HolidayInfo } from '../../models/holidays.model';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    SearchingInputComponent,
    HolidayCardComponent,
  ],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit, OnDestroy {
  selectedCountry: string = '';
  selectedYear: string = '';
  yearsList: string[] = [];
  countryInfo: CountryInfo | null = null;
  holidaysInfo: HolidayInfo[] | null = null;

  private countrySubscription: Subscription | null = null;
  private holidaySubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.yearsList = this.createYearListFromTo(2020, 2030);
    this.selectedCountry =
      this.route.snapshot.params['selectedCountry'].toLowerCase();
    this.selectedYear = new Date().getFullYear().toString();
  }

  ngOnInit(): void {
    this.getCountryInfo();
    this.getHolidaysInfo(this.selectedYear);

    this.route.params.subscribe((country) => {
      this.selectedCountry = country['selectedCountry'];
      this.getCountryInfo();
      this.getHolidaysInfo(this.selectedYear);
      this.selectedYear = new Date().getFullYear().toString();
    });
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
    this.holidaySubscription?.unsubscribe();
  }

  createYearListFromTo(from: number, to: number): string[] {
    const yearList: string[] = [];
    for (let i = from; i <= to; i++) {
      yearList.push(i.toString());
    }
    return yearList;
  }

  getCountryInfo() {
    this.store.dispatch(loadCountryInfo({ countryCode: this.selectedCountry }));
    this.countrySubscription = this.store
      .select(selectCountryInfo)
      .subscribe((info) => {
        this.countryInfo = info;
      });
  }

  getHolidaysInfo(year: string) {
    this.store.dispatch(
      loadHolidayInfo({
        year: year,
        countryCode: this.selectedCountry,
      })
    );

    this.holidaySubscription = this.store
      .select(selectCountryHolidayInfo)
      .subscribe((info) => (this.holidaysInfo = info));
  }
}
