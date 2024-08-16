import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomContriesWidgetComponent } from './random-contries-widget.component';

describe('RandomContriesWidgetComponent', () => {
  let component: RandomContriesWidgetComponent;
  let fixture: ComponentFixture<RandomContriesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomContriesWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomContriesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
