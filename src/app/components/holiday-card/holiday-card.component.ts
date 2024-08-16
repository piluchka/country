import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { HolidayInfo } from '../../models/holidays.model';

@Component({
  selector: 'app-holiday-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './holiday-card.component.html',
  styleUrl: './holiday-card.component.scss',
})
export class HolidayCardComponent {
  @Input() holidayInfo: HolidayInfo | null = null;

  constructor() {}
}
