import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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
// ! Отписка
export class SearchingInputComponent implements OnInit {
  countryForm: FormGroup = new FormGroup({});
  countryName: FormControl<string | null> = new FormControl();

  allContriesList: Country[] | null = [];
  filteredCountries: Country[] | undefined;

  selectedCountry: string | null = '';

  constructor(private store: Store, private router: Router) {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadAllCountries());
    this.store.select(selectAllCountries).subscribe((allCountries) => {
      this.allContriesList = allCountries;
    });

    this.countryName.valueChanges.subscribe((value) => {
      this.filteredCountries = this._filterCountries(value || '');
    });
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
