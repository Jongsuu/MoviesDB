import { Component, Input } from '@angular/core';
import { environment } from 'environment/environment';
import { Serie } from '../interfaces/series/series.interface';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-featured-series-item',
  templateUrl: './featured-series-item.component.html',
  styleUrls: ['./featured-series-item.component.css']
})
export class FeaturedSeriesItemComponent {
  private baseImageUrl: string;

  @Input() item: Serie | undefined;
  @Input() genreList: Genre[] | undefined;
  @Input() canHover: boolean | undefined;
  activeBackgroundStyle: string | undefined;

  constructor() {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    this.activeBackgroundStyle = `url(${this.getImageSrc(false)})`;
  }

  getImageSrc(mouseOver: boolean): string {
    if (mouseOver)
      return this.baseImageUrl + (this.item?.backdrop_path ?? this.item?.poster_path);
    else
      return this.baseImageUrl + this.item?.poster_path;
  }

  getGenreName(genreId: number): string | undefined {
    return this.genreList?.find(genre => genre.id === genreId)?.name;
  }

  onMouseOver() {
    if (this.canHover)
      this.activeBackgroundStyle = `url(${this.getImageSrc(true)})`;
  }

  onMouseLeave() {
    this.activeBackgroundStyle = `url(${this.getImageSrc(false)})`;
  }
}
