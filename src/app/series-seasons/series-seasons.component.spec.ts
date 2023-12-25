import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSeasonsComponent } from './series-seasons.component';

describe('SeriesSeasonsComponent', () => {
  let component: SeriesSeasonsComponent;
  let fixture: ComponentFixture<SeriesSeasonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesSeasonsComponent]
    });
    fixture = TestBed.createComponent(SeriesSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
