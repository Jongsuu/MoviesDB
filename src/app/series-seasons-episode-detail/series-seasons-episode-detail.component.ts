import { Component } from '@angular/core';
import { CreditsResponseItem } from '../interfaces/common/common.interfaces';
import { SeriesService } from '../series.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environment/environment';
import { SeriesSeasonEpisodeDetail } from '../interfaces/series/seriesDetail.interface';

@Component({
  selector: 'app-series-seasons-episode-detail',
  templateUrl: './series-seasons-episode-detail.component.html',
  styleUrls: ['./series-seasons-episode-detail.component.css']
})
export class SeriesSeasonsEpisodeDetailComponent {
  private baseImageUrl: string;

  item: SeriesSeasonEpisodeDetail = undefined as any;

  episodeCast: CreditsResponseItem[] | undefined;
  episodeCrew: CreditsResponseItem[] | undefined;

  constructor(private seriesService: SeriesService, private route: ActivatedRoute) {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const seriesId = Number(routeParams.get("seriesId"));
    const seasonNumber = Number(routeParams.get("seasonNumber"));
    const episodeNumber = Number(routeParams.get("episodeNumber"));

    this.seriesService.getSeriesSeasonEpisodeDetail(seriesId, seasonNumber, episodeNumber).subscribe((response) => {
      if (response.guest_stars.length > 8)
        response.guest_stars.splice(8, response.guest_stars.length - 8);

      this.item = response;
    });

    this.seriesService.getSeriesSeasonEpisodeCredits(seriesId, seasonNumber, episodeNumber).subscribe((response) => {
      let episodeCast = this.removeDuplicates<CreditsResponseItem>(response.cast).filter(item => item.profile_path);

      if (episodeCast.length > 0)
        this.episodeCast = episodeCast;

      let episodeCrew = this.removeDuplicates<CreditsResponseItem>(response.crew).filter(item => item.profile_path);

      if (episodeCrew.length > 0)
        this.episodeCrew = episodeCrew;
    });
  }

  getImageSrc(isImgTag: boolean): string {
    if (isImgTag)
      return this.baseImageUrl + this.item?.still_path;

    return `url(${this.baseImageUrl}${(this.item?.still_path)})`;
  }

  getEpisodeLength(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours === 0)
      return `${minutes} min`;

    return `${hours} h ${minutes} min`;
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
