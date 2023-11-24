import { Component, Input } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';

@Component({
  selector: 'app-featured-series-carrusel',
  templateUrl: './featured-series-carrusel.component.html',
  styleUrls: ['./featured-series-carrusel.component.css']
})
export class FeaturedSeriesCarruselComponent {
  @Input() list: Serie[] = [];
  @Input() carruselTitle: string | undefined;
  @Input() seeMoreLink: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = true;
  canHoverItem = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScrolledItem = 0;

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (!this.hideLeftArrow) {
      this.canHoverItem = false;
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
      this.canHoverItem = false;
      let newIndex = this.currentScrolledItem + 5;

      if (newIndex >= this.list.length - 5)
        newIndex = this.list.length - 5;

      this.currentScrolledItem = newIndex;
      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideRightArrow = newIndex === this.list.length - 5;
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

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.children[this.currentScrolledItem].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });

    setTimeout(() => {
      this.canHoverItem = true;
    }, 1000);
  }
}
