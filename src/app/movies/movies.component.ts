import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../interfaces/movies/movies.interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  featuredMovies: Movie[] = [];
  latestMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.moviesService.getPopularMoviesCatalog().subscribe((response) => {
      console.log(response.results);
      this.featuredMovies = response.results;
    });

    this.moviesService.getLatestMoviesCatalog().subscribe((response) => {
      console.log(response.results);
      this.latestMovies = response.results;
    });
  }
}
