import { Component, Input, OnInit } from '@angular/core';
import { SeriesSeasonDetailEpisode } from '../interfaces/series/seriesDetail.interface';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-series-seasons-episodes',
  templateUrl: './series-seasons-episodes.component.html',
  styleUrls: ['./series-seasons-episodes.component.css']
})
export class SeriesSeasonsEpisodesComponent implements OnInit {
  @Input() episodes: SeriesSeasonDetailEpisode[] | undefined;
  @Input() showEpisodes: boolean | undefined;

  private baseImageUrl: string;

  constructor() {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {

  }

  getImageSrc(imageSrc: string): string | undefined {
    if (imageSrc)
      return this.baseImageUrl + imageSrc;
    return undefined;
  }

  getEpisodeTitle(episode: SeriesSeasonDetailEpisode): string {
    return `S${episode.season_number} E${episode.episode_number} - ${episode.name}`;
  }

  getEpisodeLength(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours === 0)
      return `${minutes} min`;

    return `${hours} h ${minutes} min`;
  }
}
