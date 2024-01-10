import { Component, Input, OnInit } from '@angular/core';
import { CreditsResponseItem } from '../interfaces/common/common.interfaces';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  private baseImageUrl: string;

  @Input() credits: CreditsResponseItem[] | undefined;
  @Input() creditsTitle: string | undefined;

  hideLeftArrow = true;
  hideRightArrow = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScroll = 0;
  private itemWidth = 0;

  constructor() {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  ngOnInit(): void {
    if (this.credits && this.credits.length === 0)
      this.credits = undefined;
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.credits?.length ?? 1);

    this.currentScroll -= carrusel.clientWidth + this.itemWidth;

    if (this.currentScroll <= this.itemWidth * 4)
      this.currentScroll = 0;

    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideLeftArrow = this.currentScroll === 0;
      this.hideRightArrow = false;
      this.arrowsState.hideRightArrow = this.hideRightArrow;
      this.arrowsState.hideLeftArrow = this.hideLeftArrow;
    }, 250);
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.credits?.length ?? 1);

    this.currentScroll += carrusel.clientWidth - this.itemWidth;

    if (this.currentScroll >= carrusel.scrollWidth - this.itemWidth * 4)
      this.currentScroll = carrusel.scrollWidth;

    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideRightArrow = this.currentScroll === carrusel.scrollWidth;
      this.hideLeftArrow = false;
      this.arrowsState.hideRightArrow = this.hideRightArrow;
      this.arrowsState.hideLeftArrow = this.hideLeftArrow;
    }, 250);
  }

  onMouseOver() {
    this.hideLeftArrow = this.arrowsState.hideLeftArrow;
    this.hideRightArrow = this.arrowsState.hideRightArrow;
  }

  onMouseExit() {
    this.hideRightArrow = true;
    this.hideLeftArrow = true;
  }

  getImageSrc(profileSrc: string): string {
    return `url(${this.baseImageUrl + profileSrc})`;
  }

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.scrollTo({
      left: this.currentScroll,
      behavior: "smooth"
    });
  }
}
