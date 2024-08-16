import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, SearchingInputComponent, HolidayCardComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
})
export class CountryPageComponent implements OnInit {
  selectedCountry: string = '';
  countryInfo: CountryInfo | null = null;
  holidaysInfo: HolidayInfo[] | null = null;
  year: Date = new Date();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.getCountryInfo();
    this.getHolidaysInfo();
    this.updateCountryAndHolidayInfo();
  }

  getCountryInfo() {
    this.selectedCountry =
      this.route.snapshot.params['selectedCountry'].toLowerCase();

    this.store.dispatch(loadCountryInfo({ countryCode: this.selectedCountry }));
    this.store.select(selectCountryInfo).subscribe((info) => {
      this.countryInfo = info;
    });
  }

  getHolidaysInfo() {
    this.store.dispatch(
      loadHolidayInfo({
        year: this.year.getFullYear().toString(),
        countryCode: this.selectedCountry,
      })
    );

    this.store
      .select(selectCountryHolidayInfo)
      .subscribe((info) => (this.holidaysInfo = info));
  }

  updateCountryAndHolidayInfo() {
    this.route.params.subscribe((country) => {
      this.selectedCountry = country['selectedCountry'];
      this.store.dispatch(
        loadCountryInfo({ countryCode: this.selectedCountry })
      );
      this.store.dispatch(
        loadHolidayInfo({ year: '2024', countryCode: this.selectedCountry })
      );

      this.store.select(selectCountryInfo).subscribe((info) => {
        this.countryInfo = info;
      });
    });
    this.store.select(selectCountryHolidayInfo).subscribe((info) => {
      this.holidaysInfo = info;
    });
  }
}
