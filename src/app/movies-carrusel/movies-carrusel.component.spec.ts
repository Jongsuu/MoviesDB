import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCarruselComponent } from './movies-carrusel.component';

describe('MoviesCarruselComponent', () => {
  let component: MoviesCarruselComponent;
  let fixture: ComponentFixture<MoviesCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCarruselComponent]
    });
    fixture = TestBed.createComponent(MoviesCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
