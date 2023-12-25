import { Component } from '@angular/core';
import { CreditsResponseItem, WatchProvidersResultsItem } from '../interfaces/common/common.interfaces';
import { SeriesService } from '../series.service';
import { environment } from 'environment/environment';
import { SeriesDetail } from '../interfaces/series/seriesDetail.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent {
  private baseImageUrl: string;

  item: SeriesDetail = undefined as any;

  rentWatchProviders: WatchProvidersResultsItem[] = [];
  buyWatchProviders: WatchProvidersResultsItem[] = [];
  watchProvidersLink: string | undefined;

  seriesCast: CreditsResponseItem[] = [];
  seriesCrew: CreditsResponseItem[] = [];

  constructor(private seriesService: SeriesService, private route: ActivatedRoute) {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const seriesId = Number(routeParams.get("seriesId"));

    this.seriesService.getSeriesById(seriesId).subscribe((response) => {
      let today = new Date();
      response.seasons = response.seasons.filter(season => season.air_date && new Date(season.air_date) <= today);
      response.number_of_seasons = response.seasons.length;

      this.item = response;
    });

    this.seriesService.getSeriesWatchProviders(seriesId).subscribe((response) => {
      let rent = response.results?.GB?.rent;

      if (rent && rent.length > 0)
        this.rentWatchProviders = rent;

      let buy = response.results?.GB?.buy;

      if (buy && buy.length > 0)
        this.buyWatchProviders = buy;

      this.watchProvidersLink = response.results?.GB?.link;
    });

    this.seriesService.getSeriesCredits(seriesId).subscribe((response) => {
      let seriesCast = this.removeDuplicates<CreditsResponseItem>(response.cast).filter(item => item.profile_path);

      if (seriesCast && seriesCast.length > 0)
        this.seriesCast = seriesCast;

      let seriesCrew = this.removeDuplicates<CreditsResponseItem>(response.crew).filter(item => item.profile_path);

      if (seriesCrew && seriesCrew.length > 0)
        this.seriesCrew = seriesCrew;
    });
  }

  getImageSrc(isPoster: boolean): string {
    if (isPoster)
      return this.baseImageUrl + this.item?.poster_path;

    return `url(${this.baseImageUrl + (this.item?.backdrop_path ?? this.item?.poster_path)})`;
  }

  getSeasonsCount() {
    let count = this.item.number_of_seasons;

    if (count === 1)
      return "1 season";

    return `${count} seasons`;
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
