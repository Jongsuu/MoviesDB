import { Component, Input, OnInit } from '@angular/core';
import { SeriesSeason, SeriesSeasonDetail, SeriesSeasonDetailEpisode } from '../interfaces/series/seriesDetail.interface';
import { SeriesService } from '../series.service';
import { Serie } from '../interfaces/series/series.interface';
import { CreditsResponseItem, Genre, WatchProvidersResultsItem } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-series-seasons',
  templateUrl: './series-seasons.component.html',
  styleUrls: ['./series-seasons.component.css']
})
export class SeriesSeasonsComponent implements OnInit {
  @Input() seasonsCount = 0;
  @Input() seasons: SeriesSeason[] | undefined;
  @Input() seriesId: number = 0;
  @Input() seriesName: string | undefined;

  seasonNumber: number | undefined;
  seasonDetail: SeriesSeasonDetail | undefined;
  seasonEpisodes: SeriesSeasonDetailEpisode[] = [];

  seriesCast: CreditsResponseItem[] | undefined;
  seriesCrew: CreditsResponseItem[] | undefined;

  rentWatchProviders: WatchProvidersResultsItem[] | undefined;
  buyWatchProviders: WatchProvidersResultsItem[] | undefined;
  watchProvidersLink: string | undefined;

  relatedSeries: Serie[] = [];
  genreList: Genre[] = [];

  actionState: { episodes: boolean, related: boolean, details: boolean } = {
    episodes: true,
    related: false,
    details: false
  };

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    let seasonNumber = 1;

    if (this.seasons) {
      let firstSeason = this.seasons[0];
      seasonNumber = firstSeason.season_number > 0 ? firstSeason.season_number : 1;
    }

    this.seriesService.getSeriesSeasonDetail(this.seriesId, seasonNumber).subscribe((response) => {
      this.seasonDetail = response;
      this.seasonEpisodes = response.episodes;
    });

    this.seriesService.getRecommendationsSeriesCatalog(this.seriesId).subscribe((response) => {
      this.relatedSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
    });

    this.seriesService.getGenresList().subscribe((response) => {
      this.genreList = response.genres;
    });

    this.seriesService.getSeriesCredits(this.seriesId).subscribe((response) => {
      let seriesCast = this.removeDuplicates<CreditsResponseItem>(response.cast).filter(item => item.profile_path);

      if (seriesCast.length > 0)
        this.seriesCast = seriesCast;

      let seriesCrew = this.removeDuplicates<CreditsResponseItem>(response.crew).filter(item => item.profile_path);

      if (seriesCrew.length > 0)
        this.seriesCrew = seriesCrew;
    });

    this.seriesService.getSeriesWatchProviders(this.seriesId).subscribe((response) => {
      let rent = response.results?.GB?.rent;

      if (rent && rent.length > 0)
        this.rentWatchProviders = rent;

      let buy = response.results?.GB?.buy;

      if (buy && buy.length > 0)
        this.buyWatchProviders = buy;

      this.watchProvidersLink = response.results?.GB?.link;
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

  private removeDuplicates<T>(array: { id: number }[]): T[] {
    let filtered: T[] = [];
    let ids: number[] = [];

    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      if (!ids.includes(item.id)) {
        filtered.push(item as T);
        ids.push(item.id);
      }
    }

    return filtered;
  }
}
