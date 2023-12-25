import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesSeasonsEpisodeDetailComponent } from './series-seasons-episode-detail.component';

describe('SeriesSeasonsEpisodeDetailComponent', () => {
  let component: SeriesSeasonsEpisodeDetailComponent;
  let fixture: ComponentFixture<SeriesSeasonsEpisodeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesSeasonsEpisodeDetailComponent]
    });
    fixture = TestBed.createComponent(SeriesSeasonsEpisodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
