import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  genresList: Genre[] = [];

  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];

  recommendationsMovies: Movie[] = [];
  recommendationsMoviesTitle: string | undefined;

  similarSeries: Movie[] = [];
  similarMoviesTitle: string | undefined;

  crimeDocumentaryMovies: Movie[] = [];
  romanticComedyMovies: Movie[] = [];
  thrillerMovies: Movie[] = [];
  fantasyMovies: Movie[] = [];
  actionAdventureMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      this.popularMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);

      let randomIndex = Math.floor(Math.random() * this.popularMovies.length);
      let similarSeries = this.popularMovies[randomIndex];
      this.similarMoviesTitle = `Movies similar to ${similarSeries.title}`;
      this.moviesService.getSimilarMoviesCatalog(similarSeries.id).subscribe((response) => {
        this.similarSeries = response.results;
      });
    });

    this.loadGenreMovies();

    this.moviesService.getUpcomingMoviesCatalog().subscribe((response) => {
      this.upcomingMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
    });

    this.moviesService.getTopRatedMoviesCatalog().subscribe((response) => {
      this.topRatedMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      this.loadRecommendationMovies();
    });

    this.moviesService.getNowPlayingMoviesCatalog().subscribe((response) => {
      this.nowPlayingMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
    });
  }

  private loadGenreMovies(): void {
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

      let thrillerMisteryGenres = this.genresList.filter(genre => genre.name === "Thriller" || genre.name === "Mystery");
      this.moviesService.getMoviesByGenre(thrillerMisteryGenres.map(item => item.id).join()).subscribe((response) => {
        this.thrillerMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
      });

      let fantasyScienceFictionGenre = this.genresList.filter(genre => genre.name === "Fantasy" || genre.name === "Science Fiction");
      this.moviesService.getMoviesByGenre(fantasyScienceFictionGenre.map(item => item.id).join()).subscribe((response) => {
        this.fantasyMovies = response.results.filter(movie => movie.poster_path && movie.backdrop_path && movie.overview.length > 0);
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
}
