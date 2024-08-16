import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Country } from '../../models/country.model';
import { Store } from '@ngrx/store';
import { selectAllCountries } from '../../store/selectors';
import { loadAllCountries } from '../../store/actions';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searching-input',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './searching-input.component.html',
  styleUrl: './searching-input.component.scss',
})
export class SearchingInputComponent implements OnInit, OnDestroy {
  countryForm: FormGroup = new FormGroup({});
  countryName: FormControl<string | null> = new FormControl();

  allContriesList: Country[] | null = [];
  filteredCountries: Country[] | undefined;

  selectedCountry: string | null = '';

  countriesSubscription: Subscription = new Subscription();
  inputSubscription: Subscription = new Subscription();

  constructor(private store: Store, private router: Router) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadAllCountries());
    this.countriesSubscription = this.store
      .select(selectAllCountries)
      .subscribe((allCountries) => {
        this.allContriesList = allCountries;
      });

    this.inputSubscription = this.countryName.valueChanges.subscribe(
      (value) => {
        this.filteredCountries = this._filterCountries(value || '');
      }
    );
  }

  ngOnDestroy(): void {
    this.countriesSubscription.unsubscribe();
    this.inputSubscription.unsubscribe();
  }

  private _filterCountries(value: string): any {
    const filterValue = value.toLowerCase();
    if (this.allContriesList) {
      return this.allContriesList.filter((country) =>
        country.name.toLowerCase().includes(filterValue)
      );
    }
  }

  onCountrySelected(country: Country): void {
    this.selectedCountry = country.countryCode;
    this.router.navigate(['/country', this.selectedCountry]);
  }
}
