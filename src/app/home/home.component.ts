import { Component, OnInit } from '@angular/core';
import { Serie } from '../interfaces/series/series.interface';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { MoviesService } from '../movies.service';
import { SeriesService } from '../series.service';
import { Genre } from '../interfaces/common/common.interfaces';
import { MovieDetail } from '../interfaces/movies/movieDetail.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  dramaMovies: Movie[] = [];
  thrillerMovies: Movie[] = [];

  featuredDramaMovie: MovieDetail | undefined;

  popularSeries: Serie[] = [];
  mysterySeries: Serie[] = [];
  animationSeries: Serie[] = [];

  similarMovies: Movie[] = [];
  similarMoviesTitle: string | undefined;

  recommendationMovies: Movie[] = [];
  recommendationMoviesTitle: string | undefined;

  similarSeries: Serie[] = [];
  similarSeriesTitle: string | undefined;

  moviesGenreList: Genre[] = [];
  seriesGenreList: Genre[] = [];

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.moviesService.getGenresList().subscribe((response) => {
      this.moviesGenreList = response.genres;
      let drama = this.moviesGenreList.find(genre => genre.name === "Drama");

      if (drama) {
        this.moviesService.getMoviesByGenre(drama.id.toString()).subscribe((response) => {
          let movies = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);

          this.moviesService.getMovieById(movies.splice(0, 1)[0].id).subscribe((response) => {
            this.featuredDramaMovie = response;
          });
          this.dramaMovies = movies;

          this.loadSimilarMovies();
        });
      }

      let thriller = this.moviesGenreList.filter(genre => genre.name === "Thriller" || genre.name === "Mystery" || genre.name === "Horror").map(item => item.id);

      if (thriller) {
        this.moviesService.getMoviesByGenre(thriller.join()).subscribe((response) => {
          this.thrillerMovies = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }
    });

    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      this.popularMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      this.loadRecommendationMovies();
    });

    this.seriesService.getPopularSeriesCatalog().subscribe((response) => {
      this.popularSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
    });

    this.seriesService.getGenresList().subscribe((response) => {
      this.seriesGenreList = response.genres;

      let mystery = this.seriesGenreList.find(genre => genre.name === "Mystery");

      if (mystery) {
        this.seriesService.getSeriesByGenre(mystery.id.toString()).subscribe((response) => {
          this.mysterySeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
          this.loadSimilarSeries();
        });
      }

      let animation = this.seriesGenreList.find(genre => genre.name === "Animation");
      if (animation) {
        this.seriesService.getSeriesByGenre(animation.id.toString()).subscribe((response) => {
          this.animationSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }
    });
  }

  private loadSimilarMovies(): void {
    let randomIndex = Math.floor(Math.random() * this.dramaMovies.length);
    let similarSeries = this.dramaMovies[randomIndex];
    this.similarMoviesTitle = `Movies similar to ${similarSeries.title}`;
    this.moviesService.getSimilarMoviesCatalog(similarSeries.id).subscribe((response) => {
      let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      if (movies.length === 0)
        this.loadSimilarMovies();
      else
        this.similarMovies = movies;
    });
  }

  private loadRecommendationMovies(): void {
    let randomIndex = Math.floor(Math.random() * this.popularMovies.length);
    let recommendationMovies = this.popularMovies[randomIndex];
    this.recommendationMoviesTitle = `If you loved ${recommendationMovies.title}...`;
    this.moviesService.getRecommendationsMoviesCatalog(recommendationMovies.id).subscribe((response) => {
      let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      if (movies.length === 0)
        this.loadRecommendationMovies();
      else
        this.recommendationMovies = movies;
    });
  }

  private loadSimilarSeries(): void {
    let randomIndex = Math.floor(Math.random() * this.mysterySeries.length);
    let similarSeries = this.mysterySeries[randomIndex];
    this.similarSeriesTitle = `Series similar to ${similarSeries.name}`;
    this.seriesService.getSimilarSeriesCatalog(similarSeries.id).subscribe((response) => {
      let series = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
      if (series.length === 0)
        this.loadSimilarSeries();
      else
        this.similarSeries = series;
    });
  }
}
