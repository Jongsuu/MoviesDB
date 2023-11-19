import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCarruselComponent } from './featured-carrusel.component';

describe('FeaturedCarruselComponent', () => {
  let component: FeaturedCarruselComponent;
  let fixture: ComponentFixture<FeaturedCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedCarruselComponent]
    });
    fixture = TestBed.createComponent(FeaturedCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
