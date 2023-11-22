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
}
