import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingInputComponent } from './searching-input.component';

describe('SearchingInputComponent', () => {
  let component: SearchingInputComponent;
  let fixture: ComponentFixture<SearchingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchingInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
