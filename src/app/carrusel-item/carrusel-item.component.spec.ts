import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselItemComponent } from './carrusel-item.component';

describe('CarruselItemComponent', () => {
  let component: CarruselItemComponent;
  let fixture: ComponentFixture<CarruselItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarruselItemComponent]
    });
    fixture = TestBed.createComponent(CarruselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
