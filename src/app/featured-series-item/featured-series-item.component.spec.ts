import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesItemComponent } from './featured-series-item.component';

describe('FeaturedSeriesItemComponent', () => {
  let component: FeaturedSeriesItemComponent;
  let fixture: ComponentFixture<FeaturedSeriesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedSeriesItemComponent]
    });
    fixture = TestBed.createComponent(FeaturedSeriesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
