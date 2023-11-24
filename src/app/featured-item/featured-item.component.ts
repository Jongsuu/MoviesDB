import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-featured-item',
  templateUrl: './featured-item.component.html',
  styleUrls: ['./featured-item.component.css']
})
export class FeaturedItemComponent implements OnInit {
  private baseImageUrl: string;

  @Input() item: Movie | undefined;
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

  onMouseOver() {
    if (this.canHover)
      this.activeBackgroundStyle = `url(${this.getImageSrc(true)})`;
  }

  onMouseLeave() {
    this.activeBackgroundStyle = `url(${this.getImageSrc(false)})`;
  }
}
