import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSeasonsEpisodesComponent } from './series-seasons-episodes.component';

describe('SeriesSeasonsEpisodesComponent', () => {
  let component: SeriesSeasonsEpisodesComponent;
  let fixture: ComponentFixture<SeriesSeasonsEpisodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesSeasonsEpisodesComponent]
    });
    fixture = TestBed.createComponent(SeriesSeasonsEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
