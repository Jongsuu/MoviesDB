import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-featured-carrusel',
  templateUrl: './featured-carrusel.component.html',
  styleUrls: ['./featured-carrusel.component.css']
})
export class FeaturedCarruselComponent {
  @Input() list: Movie[] = [];
  @Input() carruselTitle: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = true;
  canHoverItem = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScrolledItem = 0;

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (!this.hideLeftArrow) {
      this.canHoverItem = false;
      let newIndex = this.currentScrolledItem - 8;

      if (newIndex < 5)
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

  private scrollCarrusel(carrusel: HTMLUListElement) {
    console.log(this.currentScrolledItem);
    carrusel.children[this.currentScrolledItem].scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });

    setTimeout(() => {
      this.canHoverItem = true;
    }, 1000);
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    if (!this.hideRightArrow) {
      this.canHoverItem = false;
      let newIndex = this.currentScrolledItem + 8;

      if (newIndex >= this.list.length)
        newIndex = this.list.length - 1;

      this.currentScrolledItem = newIndex;
      this.scrollCarrusel(carrusel);

      setTimeout(() => {
        this.hideRightArrow = newIndex === this.list.length - 1;
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
}
