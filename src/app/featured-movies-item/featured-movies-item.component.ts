import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { environment } from 'environment/environment';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-featured-movies-item',
  templateUrl: './featured-movies-item.component.html',
  styleUrls: ['./featured-movies-item.component.css']
})
export class FeaturedMoviesItemComponent implements OnInit {
  private baseImageUrl: string;

  @Input() item: Movie | undefined;
  @Input() canHover: boolean | undefined;
  @Input() genreList: Genre[] | undefined;
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
