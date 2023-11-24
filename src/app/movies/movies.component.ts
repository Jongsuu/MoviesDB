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
  latestMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  crimeDocumentaryMovies: Movie[] = [];
  romanticComedyMovies: Movie[] = [];
  thrillerMovies: Movie[] = [];
  fantasyMovies: Movie[] = [];
  actionAdventureMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadGenreMovies();

    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      this.popularMovies = response.results;
    });

    this.moviesService.getUpcomingMoviesCatalog().subscribe((response) => {
      this.latestMovies = response.results;
    });

    this.moviesService.getTopRatedMoviesCatalog().subscribe((response) => {
      this.topRatedMovies = response.results;
    });

    this.moviesService.getNowPlayingMoviesCatalog().subscribe((response) => {
      this.nowPlayingMovies = response.results;
    });
  }

  private loadGenreMovies(): void {
    this.moviesService.getGenresList().subscribe((response) => {
      this.genresList = response.genres;

      let actionAdventureGenres = this.genresList.filter(genre => genre.name === "Action" || genre.name === "Adventure");
      this.moviesService.getMoviesByGenre(actionAdventureGenres.map(item => item.id).join()).subscribe((response) => {
        this.actionAdventureMovies = response.results;
      });

      let crimeDocumentaryGenres = this.genresList.filter(genre => genre.name === "Documentary" || genre.name === "Crime");
      this.moviesService.getMoviesByGenre(crimeDocumentaryGenres.map(item => item.id).join()).subscribe((response) => {
        this.crimeDocumentaryMovies = response.results;
      });

      let romanticComedyGenres = this.genresList.filter(genre => genre.name === "Romantic" || genre.name === "Comedy");
      this.moviesService.getMoviesByGenre(romanticComedyGenres.map(item => item.id).join()).subscribe((response) => {
        this.romanticComedyMovies = response.results;
      });

      let thrillerMisteryGenres = this.genresList.filter(genre => genre.name === "Thriller" || genre.name === "Mystery");
      this.moviesService.getMoviesByGenre(thrillerMisteryGenres.map(item => item.id).join()).subscribe((response) => {
        this.thrillerMovies = response.results;
      });

      let fantasyScienceFictionGenre = this.genresList.filter(genre => genre.name === "Fantasy" || genre.name === "Science Fiction");
      this.moviesService.getMoviesByGenre(fantasyScienceFictionGenre.map(item => item.id).join()).subscribe((response) => {
        this.fantasyMovies = response.results;
      });
    });
  }
}
