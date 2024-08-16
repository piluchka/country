import { Component } from '@angular/core';
import { SearchingInputComponent } from '../../components/searching-input/searching-input.component';
import { RandomContriesWidgetComponent } from '../../components/random-contries-widget/random-contries-widget.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchingInputComponent, RandomContriesWidgetComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
