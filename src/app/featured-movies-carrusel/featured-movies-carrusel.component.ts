import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-featured-movies-carrusel',
  templateUrl: './featured-movies-carrusel.component.html',
  styleUrls: ['./featured-movies-carrusel.component.css']
})
export class FeaturedMoviesCarruselComponent implements OnInit {
  @Input() list: Movie[] | undefined;
  @Input() carruselTitle: string | undefined;
  @Input() genreList: Genre[] | undefined;
  @Input() seeMoreLink: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = false;
  canHoverItem = true;

  private currentScroll = 0;
  private itemWidth = 0;

  ngOnInit(): void {
    if (!this.list || this.list.length === 0)
      this.list = undefined;
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (!this.hideLeftArrow) {
      this.canHoverItem = false;

      if (this.itemWidth === 0)
        this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

      this.currentScroll -= carrusel.clientWidth + this.itemWidth;

      if (this.currentScroll <= this.itemWidth * 2)
        this.currentScroll = 0;

      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideLeftArrow = this.currentScroll === 0;
        this.hideRightArrow = false;
      }, 250);
    }
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    if (!this.hideRightArrow) {
      this.canHoverItem = false;

      if (this.itemWidth === 0)
        this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

      this.currentScroll += carrusel.clientWidth - this.itemWidth;

      if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth * 2)
        this.currentScroll = carrusel.scrollWidth;

      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideRightArrow = this.currentScroll === carrusel.scrollWidth;
        this.hideLeftArrow = false;
      }, 250);
    }
  }

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.scrollTo({
      left: this.currentScroll,
      behavior: "smooth"
    });

    setTimeout(() => {
      this.canHoverItem = true;
    }, 1000);
  }
}
