import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country/:selectedCountry',
    component: CountryPageComponent,
  },
];
