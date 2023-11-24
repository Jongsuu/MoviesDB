import { Component, OnInit } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { MoviesService } from '../movies.service';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  popularSeries: Serie[] = [];

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      this.popularMovies = response.results;
    });

    this.seriesService.getPopularSeriesCatalog().subscribe((response) => {
      this.popularSeries = response.results;
    });
  }
}
