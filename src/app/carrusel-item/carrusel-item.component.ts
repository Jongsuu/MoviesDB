import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-carrusel-item',
  templateUrl: './carrusel-item.component.html',
  styleUrls: ['./carrusel-item.component.css']
})
export class CarruselItemComponent {
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
    return this.baseImageUrl + this.item?.backdrop_path;
  }
}
