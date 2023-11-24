import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  @Input() list: Movie[] | undefined;
  @Input() carruselTitle: string | undefined;
  hideLeftArrow: boolean = true;
  hideRightArrow: boolean = false;

  onClickLeftArrow(carrusel: HTMLUListElement) {
    let newScroll = carrusel.scrollLeft - carrusel.clientWidth;

    if (newScroll < 0)
      newScroll = 0;

    carrusel.scrollTo({ left: newScroll, behavior: "smooth" });

    setTimeout(() => {
      this.hideLeftArrow = newScroll <= 0;
      this.hideRightArrow = false;
    }, 250);
  }

  onClickRightArrow(carrusel: HTMLUListElement) {
    let newScroll = carrusel.scrollLeft + carrusel.clientWidth;

    if (newScroll > carrusel.scrollWidth)
      newScroll = carrusel.scrollWidth;

    carrusel.scrollTo({ left: newScroll, behavior: "smooth" });

    setTimeout(() => {
      this.hideRightArrow = newScroll >= carrusel.scrollWidth - carrusel.clientWidth;
      this.hideLeftArrow = false;
    }, 250);
  }
}
