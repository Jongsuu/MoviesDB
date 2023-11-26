import { Component, OnInit } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { MoviesService } from '../movies.service';
import { SeriesService } from '../series.service';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  popularSeries: Serie[] = [];

  moviesGenreList: Genre[] = [];
  seriesGenreList: Genre[] = [];

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      this.popularMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
    });

    this.seriesService.getPopularSeriesCatalog().subscribe((response) => {
      this.popularSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
    });

    this.moviesService.getGenresList().subscribe((response) => {
      this.moviesGenreList = response.genres;
    });

    this.seriesService.getGenresList().subscribe((response) => {
      this.seriesGenreList = response.genres;
    });
  }
}
