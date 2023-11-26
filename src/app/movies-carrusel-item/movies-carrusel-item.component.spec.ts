import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCarruselItemComponent } from './movies-carrusel-item.component';

describe('MoviesCarruselItemComponent', () => {
  let component: MoviesCarruselItemComponent;
  let fixture: ComponentFixture<MoviesCarruselItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCarruselItemComponent]
    });
    fixture = TestBed.createComponent(MoviesCarruselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
