import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCarruselItemComponent } from './series-carrusel-item.component';

describe('SeriesCarruselItemComponent', () => {
  let component: SeriesCarruselItemComponent;
  let fixture: ComponentFixture<SeriesCarruselItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesCarruselItemComponent]
    });
    fixture = TestBed.createComponent(SeriesCarruselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
