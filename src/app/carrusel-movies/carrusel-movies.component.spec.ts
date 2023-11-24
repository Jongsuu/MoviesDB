import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMoviesComponent } from './carrusel-movies.component';

describe('CarruselMoviesComponent', () => {
  let component: CarruselMoviesComponent;
  let fixture: ComponentFixture<CarruselMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMoviesComponent]
    });
    fixture = TestBed.createComponent(CarruselMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
