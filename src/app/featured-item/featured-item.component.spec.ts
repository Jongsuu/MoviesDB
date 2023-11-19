import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedItemComponent } from './featured-item.component';

describe('FeaturedItemComponent', () => {
  let component: FeaturedItemComponent;
  let fixture: ComponentFixture<FeaturedItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedItemComponent]
    });
    fixture = TestBed.createComponent(FeaturedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
