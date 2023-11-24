import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselMoviesItemComponent } from './carrusel-movies-item.component';

describe('CarruselMoviesItemComponent', () => {
  let component: CarruselMoviesItemComponent;
  let fixture: ComponentFixture<CarruselMoviesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselMoviesItemComponent]
    });
    fixture = TestBed.createComponent(CarruselMoviesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
