import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { HolidayInfo } from '../../models/holidays.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule],
  templateUrl: './widget-card.component.html',
  styleUrl: './widget-card.component.scss',
})
export class WidgetCardComponent implements OnInit, OnDestroy {
  @Input() country: Country | null = null;

  countryNextHoliday: HolidayInfo | null = null;
  subscription: Subscription = new Subscription();
  constructor(private service: CountryService) {}

  ngOnInit(): void {
    if (this.country) {
      this.subscription = this.service
        .getNextHolidayInfo(this.country.countryCode)
        .subscribe((holiday) => {
          this.countryNextHoliday = holiday[0];
          console.log(this.countryNextHoliday);
        });
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
