import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSeriesCarruselComponent } from './featured-series-carrusel.component';

describe('FeaturedSeriesCarruselComponent', () => {
  let component: FeaturedSeriesCarruselComponent;
  let fixture: ComponentFixture<FeaturedSeriesCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedSeriesCarruselComponent]
    });
    fixture = TestBed.createComponent(FeaturedSeriesCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
