import { Component, Input } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-series-carrusel-item',
  templateUrl: './series-carrusel-item.component.html',
  styleUrls: ['./series-carrusel-item.component.css']
})
export class SeriesCarruselItemComponent {
  private baseImageUrl: string;

  @Input() item: Serie | undefined;
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
