import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { Genre } from '../interfaces/common/common.interfaces';
import { MovieDetail } from '../interfaces/movies/movieDetail.interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  genresList: Genre[] = [];

  latestMovie: MovieDetail | undefined;
  horrorMovie: MovieDetail | undefined;

  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];

  recommendationsMovies: Movie[] = [];
  recommendationsMoviesTitle: string | undefined;

  similarMovies: Movie[] = [];
  similarMoviesTitle: string | undefined;

  crimeDocumentaryMovies: Movie[] = [];
  romanticComedyMovies: Movie[] = [];
  horrorMovies: Movie[] = [];
  fantasyMovies: Movie[] = [];
  actionAdventureMovies: Movie[] = [];
  historicalMovies: Movie[] = [];
  militaryMovies: Movie[] = [];
  comedyMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      let latest = movies.splice(0, 1);

      this.moviesService.getMovieById(latest[0].id).subscribe((response) => {
        this.latestMovie = response;
      });

      this.popularMovies = movies;
      this.loadSimilarMovies();
    });

    this.moviesService.getNowPlayingMoviesCatalog().subscribe((response) => {
      this.nowPlayingMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
    });

    this.loadGenreMovies();

    this.moviesService.getUpcomingMoviesCatalog().subscribe((response) => {
      this.upcomingMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
    });

    this.moviesService.getTopRatedMoviesCatalog().subscribe((response) => {
      this.topRatedMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      this.loadRecommendationMovies();
    });
  }

  private async loadGenreMovies(): Promise<void> {
    this.moviesService.getGenresList().subscribe((response) => {
      this.genresList = response.genres;

      let actionAdventureGenres = this.genresList.filter(genre => genre.name === "Action" || genre.name === "Adventure");
      this.moviesService.getMoviesByGenre(actionAdventureGenres.map(item => item.id).join()).subscribe((response) => {
        this.actionAdventureMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let crimeDocumentaryGenres = this.genresList.filter(genre => genre.name === "Documentary" || genre.name === "Crime");
      this.moviesService.getMoviesByGenre(crimeDocumentaryGenres.map(item => item.id).join()).subscribe((response) => {
        this.crimeDocumentaryMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let romanticComedyGenres = this.genresList.filter(genre => genre.name === "Romantic" || genre.name === "Comedy");
      this.moviesService.getMoviesByGenre(romanticComedyGenres.map(item => item.id).join()).subscribe((response) => {
        this.romanticComedyMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let horrorGenres = this.genresList.filter(genre => genre.name === "Horror");
      this.moviesService.getMoviesByGenre(horrorGenres.map(item => item.id).join()).subscribe((response) => {
        let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
        let firstMovie = movies.splice(0, 1);

        this.horrorMovies = movies;

        this.moviesService.getMovieById(firstMovie[0].id).subscribe((response) => {
          this.horrorMovie = response;
        });
      });

      let fantasyScienceFictionGenre = this.genresList.filter(genre => genre.name === "Fantasy" || genre.name === "Science Fiction");
      this.moviesService.getMoviesByGenre(fantasyScienceFictionGenre.map(item => item.id).join()).subscribe((response) => {
        this.fantasyMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let historicalGenre = this.genresList.filter(genre => genre.name === "History");
      this.moviesService.getMoviesByGenre(historicalGenre.map(item => item.id).join()).subscribe((response) => {
        this.historicalMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let comedyGenre = this.genresList.filter(genre => genre.name === "Comedy");
      this.moviesService.getMoviesByGenre(comedyGenre.map(item => item.id).join()).subscribe((response) => {
        this.comedyMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });
    });
  }

  private loadRecommendationMovies(): void {
    let randomIndex = Math.floor(Math.random() * this.topRatedMovies.length);
    let recommendationMovies = this.topRatedMovies[randomIndex];
    this.recommendationsMoviesTitle = `If you loved ${recommendationMovies.title}...`;
    this.moviesService.getRecommendationsMoviesCatalog(recommendationMovies.id).subscribe((response) => {
      let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      if (movies.length === 0)
        this.loadRecommendationMovies();
      else
        this.recommendationsMovies = movies;
    });
  }

  private loadSimilarMovies(): void {
    let randomIndex = Math.floor(Math.random() * this.popularMovies.length);
    let similarSeries = this.popularMovies[randomIndex];
    this.similarMoviesTitle = `Movies similar to ${similarSeries.title}`;
    this.moviesService.getSimilarMoviesCatalog(similarSeries.id).subscribe((response) => {
      let movies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      if (movies.length === 0)
        this.loadSimilarMovies();
      else
        this.similarMovies = movies;
    });
  }
}
