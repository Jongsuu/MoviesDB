import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedMoviesItemComponent } from './featured-movies-item.component';

describe('FeaturedMoviesItemComponent', () => {
  let component: FeaturedMoviesItemComponent;
  let fixture: ComponentFixture<FeaturedMoviesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedMoviesItemComponent]
    });
    fixture = TestBed.createComponent(FeaturedMoviesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
