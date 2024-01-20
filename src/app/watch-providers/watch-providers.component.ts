import { Component, Input, OnInit } from '@angular/core';
import { WatchProvidersResultsItem } from '../interfaces/common/common.interfaces';
import { environment } from 'environment/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.css']
})
export class WatchProvidersComponent implements OnInit {
  private baseImageUrl: string;

  @Input() watchProviders: WatchProvidersResultsItem[] | undefined;
  @Input() watchProvidersTitle: string | undefined;
  @Input() link: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = false;

  private currentScroll = 0;
  private itemWidth = 0;

  isMobile: boolean = false;

  constructor(private responsive: BreakpointObserver) {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    if (this.watchProviders && this.watchProviders.length === 0)
      this.watchProviders = undefined;

    this.responsive.observe(Breakpoints.XSmall).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.isMobile = this.responsive.isMatched(Breakpoints.XSmall);
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.watchProviders?.length ?? 1);

    if (this.isMobile) {
      this.currentScroll -= carrusel.clientWidth + this.itemWidth / 2;

      if (this.currentScroll <= this.itemWidth * 2)
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
      this.itemWidth = carrusel.scrollWidth / (this.watchProviders?.length ?? 1);

    if (this.isMobile) {
      this.currentScroll += carrusel.clientWidth - this.itemWidth / 2;

      if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth * 2)
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

  getImageSrc(logoSrc: string): string {
    return `url(${this.baseImageUrl + logoSrc})`;
  }
}
