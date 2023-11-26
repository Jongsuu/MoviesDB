import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCarruselComponent } from './series-carrusel.component';

describe('SeriesCarruselComponent', () => {
  let component: SeriesCarruselComponent;
  let fixture: ComponentFixture<SeriesCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesCarruselComponent]
    });
    fixture = TestBed.createComponent(SeriesCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
