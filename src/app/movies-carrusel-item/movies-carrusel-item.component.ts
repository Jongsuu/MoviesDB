import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-movies-carrusel-item',
  templateUrl: './movies-carrusel-item.component.html',
  styleUrls: ['./movies-carrusel-item.component.css']
})
export class MoviesCarruselItemComponent {
  private baseImageUrl: string;

  @Input() item: Movie | undefined;
  activeBackgroundStyle: string | undefined;

  constructor() {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    this.activeBackgroundStyle = `url(${this.getImageSrc()})`;
  }

  private getImageSrc(): string {
    return this.baseImageUrl + (this.item?.backdrop_path ?? this.item?.poster_path);
  }
}
