import { Component, Input } from '@angular/core';
import { environment } from 'environment/environment';
import { MovieDetail } from '../interfaces/movies/movieDetail.interfaces';

@Component({
  selector: 'app-featured-movie',
  templateUrl: './featured-movie.component.html',
  styleUrls: ['./featured-movie.component.css']
})
export class FeaturedMovieComponent {
  private baseImageUrl: string;
  @Input() item: MovieDetail | undefined;

  constructor() {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  getImageSrc(): string {
    return `url(${this.baseImageUrl}${(this.item?.backdrop_path ?? this.item?.poster_path)})`;
  }

  getMovieLength(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours === 0)
      return `${minutes} min`;

    return `${hours} h ${minutes} min`;
  }
}
