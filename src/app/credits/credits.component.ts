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
  private currentScrolledItem = 0;

  constructor() {
    this.baseImageUrl = environment.baseImgOriginalUrl;
  }

  ngOnInit(): void {
    if (this.credits && this.credits.length === 0)
      this.credits = undefined;
    else if (this.credits)
      this.arrowsState.hideRightArrow = this.credits.length <= 6;
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (!this.hideLeftArrow) {
      let newIndex = this.currentScrolledItem - 5;

      if (newIndex <= 5)
        newIndex = 0;

      this.currentScrolledItem = newIndex;
      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideLeftArrow = this.currentScrolledItem === 0;
        this.hideRightArrow = false;
        this.arrowsState.hideRightArrow = this.hideRightArrow;
        this.arrowsState.hideLeftArrow = this.hideLeftArrow;
      }, 250);
    }
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    if (!this.hideRightArrow) {
      let newIndex = this.currentScrolledItem + 5;

      if (newIndex >= this.credits!.length - 2)
        newIndex = this.credits!.length - 2;

      this.currentScrolledItem = newIndex;
      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideRightArrow = newIndex === this.credits!.length - 2;
        this.hideLeftArrow = false;
        this.arrowsState.hideRightArrow = this.hideRightArrow;
        this.arrowsState.hideLeftArrow = this.hideLeftArrow;
      }, 250);
    }
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
    carrusel.children[this.currentScrolledItem].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  }
}
