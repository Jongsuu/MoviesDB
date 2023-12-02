import { Component, Input, OnInit } from '@angular/core';
import { WatchProvidersResultsItem } from '../interfaces/common/common.interfaces';
import { environment } from 'environment/environment';

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
  hideRightArrow = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScrolledItem = 0;

  constructor() {
    this.baseImageUrl = environment.baseImgUrl;
  }

  ngOnInit(): void {
    if (this.watchProviders && this.watchProviders.length === 0)
      this.watchProviders = undefined;
    else if (this.watchProviders)
      this.arrowsState.hideRightArrow = this.watchProviders.length <= 5;
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
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

  onClickRightArrow(carrusel: HTMLUListElement) {
    let newIndex = this.currentScrolledItem + 5;

    if (newIndex >= this.watchProviders!.length - 2)
      newIndex = this.watchProviders!.length - 2;

    this.currentScrolledItem = newIndex;
    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideRightArrow = newIndex === this.watchProviders!.length - 2;
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

  getImageSrc(logoSrc: string): string {
    return `url(${this.baseImageUrl + logoSrc})`;
  }

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.children[this.currentScrolledItem].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  }
}
