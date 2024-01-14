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
  hideRightArrow = false;

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
    }, 250);
  }

  private scrollCarrusel(carrusel: HTMLUListElement) {
    carrusel.scrollTo({
      left: this.currentScroll,
      behavior: "smooth"
    });
  }
}
