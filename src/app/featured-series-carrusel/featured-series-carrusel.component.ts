import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';
import { Genre } from '../interfaces/common/common.interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-featured-series-carrusel',
  templateUrl: './featured-series-carrusel.component.html',
  styleUrls: ['./featured-series-carrusel.component.css']
})
export class FeaturedSeriesCarruselComponent implements OnInit {
  @Input() list: Serie[] | undefined;
  @Input() genreList: Genre[] | undefined;
  @Input() carruselTitle: string | undefined;
  @Input() seeMoreLink: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = false;
  canHoverItem = true;

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
    if (!this.hideLeftArrow) {
      this.canHoverItem = false;

      if (this.itemWidth === 0)
        this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

      if (this.isMobile) {
        this.currentScroll -= carrusel.clientWidth;

        if (this.currentScroll <= this.itemWidth)
          this.currentScroll = 0;
      }
      else {
        this.currentScroll -= carrusel.clientWidth + this.itemWidth;

        if (this.currentScroll <= this.itemWidth * 2)
          this.currentScroll = 0;
      }

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

      if (this.isMobile) {
        this.currentScroll += carrusel.clientWidth;

        if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth)
          this.currentScroll = carrusel.scrollWidth;
      }
      else {
        this.currentScroll += carrusel.clientWidth - this.itemWidth;

        if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth * 2)
          this.currentScroll = carrusel.scrollWidth;
      }

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
