import { Component, Input, OnInit } from '@angular/core';
import { SeriesSeason, SeriesSeasonDetail, SeriesSeasonDetailEpisode } from '../interfaces/series/seriesDetail.interface';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-seasons',
  templateUrl: './series-seasons.component.html',
  styleUrls: ['./series-seasons.component.css']
})
export class SeriesSeasonsComponent implements OnInit {
  @Input() seasonsCount = 0;
  @Input() seasons: SeriesSeason[] | undefined;
  @Input() seriesId: number = 0;

  seasonNumber: number | undefined;
  seasonDetail: SeriesSeasonDetail | undefined;
  seasonEpisodes: SeriesSeasonDetailEpisode[] = [];

  actionState: { episodes: boolean, related: boolean, details: boolean } = {
    episodes: true,
    related: false,
    details: false
  };

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    let seasonNumber = 1;

    if (this.seasons)
      seasonNumber = this.seasons[0].season_number;

    this.seriesService.getSeriesSeasonDetail(this.seriesId, seasonNumber).subscribe((response) => {
      this.seasonDetail = response;
      this.seasonEpisodes = response.episodes;
    });
  }

  onSeasonsSelectChange(select: HTMLSelectElement): void {
    this.seasonNumber = Number(select.selectedOptions[0].value);
    if (this.seriesId) {
      this.seriesService.getSeriesSeasonDetail(this.seriesId, this.seasonNumber).subscribe((response) => {
        this.seasonDetail = response;
        this.seasonEpisodes = response.episodes;
      });
    }
  }

  onClickEpisodes(): void {
    this.actionState.details = false;
    this.actionState.related = false;
    this.actionState.episodes = true;
  }

  onClickRelated(): void {
    this.actionState.details = false;
    this.actionState.episodes = false;
    this.actionState.related = true;
  }

  onClickDetails(): void {
    this.actionState.episodes = false;
    this.actionState.related = false;
    this.actionState.details = true;
  }
}
