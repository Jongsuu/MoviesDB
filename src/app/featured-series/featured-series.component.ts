import { Component, Input } from '@angular/core';
import { SeriesDetail } from '../interfaces/series/seriesDetail.interface';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-featured-series',
  templateUrl: './featured-series.component.html',
  styleUrls: ['./featured-series.component.css']
})
export class FeaturedSeriesComponent {
  private baseImageUrl: string;
  @Input() item: SeriesDetail | undefined;

  constructor() {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  getImageSrc(): string {
    return `url(${this.baseImageUrl}${(this.item?.backdrop_path ?? this.item?.poster_path)})`;
  }

  getSeasonsCount() {
    let count = this.item!.number_of_seasons;

    if (count === 1)
      return "1 season";

    return `${count} seasons`;
  }
}
