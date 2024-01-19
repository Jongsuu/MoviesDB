import { Component, Input } from '@angular/core';
import { environment } from 'environment/environment';
import { Serie } from '../interfaces/series/series.interface';
import { Genre } from '../interfaces/common/common.interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  isMobile: boolean = false;

  constructor(private responsive: BreakpointObserver) {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.isMobile = this.responsive.isMatched(Breakpoints.XSmall);
    this.activeBackgroundStyle = `url(${this.getImageSrc(false)})`;
  }

  getImageSrc(mouseOver: boolean): string {
    if (mouseOver)
      return this.baseImageUrl + (this.item?.backdrop_path ?? this.item?.poster_path);
    else
      return this.baseImageUrl + this.item?.poster_path;
  }

  getGenreName(genreId: number): string | undefined {
    if (this.isMobile)
      this.item!.genre_ids = [this.item!.genre_ids[0]];

    if (!this.item!.genre_ids.includes(genreId))
      return undefined;

    return this.genreList?.find(genre => genre.id === genreId)?.name;
  }

  onMouseOver() {
    if (this.canHover && !this.isMobile) {
      setTimeout(() => {
        this.activeBackgroundStyle = `url(${this.getImageSrc(true)})`;
      }, 150);
    }
  }

  onMouseLeave() {
    if (!this.isMobile) {
      setTimeout(() => {
        this.activeBackgroundStyle = `url(${this.getImageSrc(false)})`;
      }, 150);
    }
  }
}
