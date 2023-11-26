import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-movies-carrusel',
  templateUrl: './movies-carrusel.component.html',
  styleUrls: ['./movies-carrusel.component.css']
})
export class MoviesCarruselComponent implements OnInit {
  @Input() list: Movie[] | undefined;
  @Input() carruselTitle: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScrolledItem = 0;

  ngOnInit(): void {
    if (!this.list || this.list.length === 0)
      this.list = undefined;
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

    if (newIndex >= this.list!.length - 5)
      newIndex = this.list!.length - 5;

    this.currentScrolledItem = newIndex;
    this.scrollCarrusel(carrusel);

    setTimeout(() => {
      this.hideRightArrow = newIndex === this.list!.length - 5;
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

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.children[this.currentScrolledItem].scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
  }
}
