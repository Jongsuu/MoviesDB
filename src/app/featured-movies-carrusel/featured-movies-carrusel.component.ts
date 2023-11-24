import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-featured-movies-carrusel',
  templateUrl: './featured-movies-carrusel.component.html',
  styleUrls: ['./featured-movies-carrusel.component.css']
})
export class FeaturedMoviesCarruselComponent {
  @Input() list: Movie[] = [];
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
