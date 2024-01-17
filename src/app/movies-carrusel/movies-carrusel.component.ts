import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movies-carrusel',
  templateUrl: './movies-carrusel.component.html',
  styleUrls: ['./movies-carrusel.component.css']
})
export class MoviesCarruselComponent implements OnInit {
  @Input() list: Movie[] | undefined;
  @Input() carruselTitle: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = false;

  private currentScroll = 0;
  private itemWidth = 0;

  isMobile: boolean = false;

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    if (!this.list || this.list.length === 0)
      this.list = undefined;

    this.responsive.observe(Breakpoints.XSmall).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.isMobile = this.responsive.isMatched(Breakpoints.XSmall);
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

    if (this.isMobile) {
      this.currentScroll -= carrusel.clientWidth + this.itemWidth / 2;

      if (this.currentScroll <= this.itemWidth)
        this.currentScroll = 0;
    }
    else {
      this.currentScroll -= carrusel.clientWidth + this.itemWidth;

      if (this.currentScroll <= this.itemWidth * 4)
        this.currentScroll = 0;
    }

    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideLeftArrow = this.currentScroll === 0;
      this.hideRightArrow = false;
    }, 250);
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

    if (this.isMobile) {
      this.currentScroll += carrusel.clientWidth - this.itemWidth / 2;

      if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth)
        this.currentScroll = carrusel.scrollWidth;
    }
    else {
      this.currentScroll += carrusel.clientWidth - this.itemWidth;

      if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth * 4)
        this.currentScroll = carrusel.scrollWidth;
    }

    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideRightArrow = this.currentScroll === carrusel.scrollWidth;
      this.hideLeftArrow = false;
    }, 250);
  }

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.scrollTo({
      left: this.currentScroll,
      behavior: "smooth"
    });
  }
}
