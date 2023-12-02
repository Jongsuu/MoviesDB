import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesComponent } from './featured-series.component';

describe('FeaturedSeriesComponent', () => {
  let component: FeaturedSeriesComponent;
  let fixture: ComponentFixture<FeaturedSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedSeriesComponent]
    });
    fixture = TestBed.createComponent(FeaturedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
