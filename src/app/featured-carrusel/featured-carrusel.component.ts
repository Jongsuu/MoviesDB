import { Component, Input } from '@angular/core';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-featured-carrusel',
  templateUrl: './featured-carrusel.component.html',
  styleUrls: ['./featured-carrusel.component.css']
})
export class FeaturedCarruselComponent {
  @Input() list: Movie[] | undefined;
  @Input() carruselTitle: string | undefined;
}
