import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountryInfo,
  selectThreeRandomContries,
} from '../../store/selectors';
import { Country } from '../../models/country.model';
import { loadCountryInfo } from '../../store/actions';

@Component({
  selector: 'app-random-contries-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-contries-widget.component.html',
  styleUrl: './random-contries-widget.component.scss',
})
export class RandomContriesWidgetComponent implements OnInit {
  randomCountries: Country[] | undefined = undefined;
  info: any = [];
  constructor(private store: Store) {}
  ngOnInit(): void {}
}
