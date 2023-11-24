import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMoviesCarruselComponent } from './featured-movies-carrusel.component';

describe('FeaturedMoviesCarruselComponent', () => {
  let component: FeaturedMoviesCarruselComponent;
  let fixture: ComponentFixture<FeaturedMoviesCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedMoviesCarruselComponent]
    });
    fixture = TestBed.createComponent(FeaturedMoviesCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
