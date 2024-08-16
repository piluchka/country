import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCountries } from '../../store/selectors';
import { Country } from '../../models/country.model';
import {
  loadAllCountries,
} from '../../store/actions';
import { map, Subscription, take, } from 'rxjs';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';
import { WidgetCardComponent } from '../widget-card/widget-card.component';

@Component({
  selector: 'app-random-contries-widget',
  standalone: true,
  imports: [WidgetCardComponent, CommonModule, HolidayCardComponent],
  templateUrl: './random-contries-widget.component.html',
  styleUrl: './random-contries-widget.component.scss',
})
export class RandomContriesWidgetComponent implements OnInit, OnDestroy {
  selectedCountries: Country[] | null = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAllCountries());

    this.getRandomCountries(3);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRandomCountries(countriesAmount: number) {
    this.subscription = this.store
      .select(selectAllCountries)
      .pipe(
        take(1),
        map((countries) => {
          const randomCountriesArr = [];
          if (countries) {
            for (let i = 0; i < countriesAmount; i++) {
              const randomIndex =
                0 + Math.floor(Math.random() * countries.length);
              randomCountriesArr.push(countries[randomIndex]);
            }
          }
          this.selectedCountries = randomCountriesArr;
          return randomCountriesArr;
        })
      )
      .subscribe();
  }
}
