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
  hovered = false;
  hide = false;

  constructor() {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    this.activeBackgroundStyle = `url(${this.getImageSrc()})`;
  }

  getImageSrc(): string {
    return this.baseImageUrl + this.item?.backdrop_path;
  }

  onMouseOver() {
    this.hovered = true;
    this.activeBackgroundStyle = "";
  }

  onMouseLeave() {
    this.hide = true;
    this.activeBackgroundStyle = `url(${this.getImageSrc()})`;
    setTimeout(() => {
      this.hide = false;
      this.hovered = false;
    }, 200);
  }
}
