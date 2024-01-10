import { Component, Input, OnInit } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';

@Component({
  selector: 'app-series-carrusel',
  templateUrl: './series-carrusel.component.html',
  styleUrls: ['./series-carrusel.component.css']
})
export class SeriesCarruselComponent implements OnInit {
  @Input() list: Serie[] | undefined;
  @Input() carruselTitle: string | undefined;
  hideLeftArrow = true;
  hideRightArrow = true;

  private arrowsState: { hideLeftArrow: boolean, hideRightArrow: boolean } = { hideLeftArrow: true, hideRightArrow: false };
  private currentScroll = 0;
  private itemWidth = 0;

  ngOnInit(): void {
    if (!this.list || this.list.length === 0)
      this.list = undefined;
  }

  onClickLeftArrow(carrusel: HTMLUListElement) {
    if (this.itemWidth === 0)
      this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

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
      this.itemWidth = carrusel.scrollWidth / (this.list?.length ?? 1);

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

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.scrollTo({
      left: this.currentScroll,
      behavior: "smooth"
    });
  }
}
