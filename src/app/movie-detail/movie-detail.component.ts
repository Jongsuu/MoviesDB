import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../interfaces/movies/movieDetail.interfaces';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environment/environment';
import { CreditsResponseItem, WatchProvidersResultsItem } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private baseImageUrl: string;
  private youtubeBaseUrl: string;

  item: MovieDetail = undefined as any;

  rentWatchProviders: WatchProvidersResultsItem[] | undefined;
  buyWatchProviders: WatchProvidersResultsItem[] | undefined;
  watchProvidersLink: string | undefined;

  movieCast: CreditsResponseItem[] | undefined;
  movieCrew: CreditsResponseItem[] | undefined;
  trailerUrl: string | undefined;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
    this.baseImageUrl = environment.baseImgOriginalUrl;
    this.youtubeBaseUrl = "https://youtube.com/watch?v=";
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const movieId = Number(routeParams.get("movieId"));

    this.moviesService.getMovieById(movieId).subscribe((response) => {
      this.item = response;
    });

    this.moviesService.getMovieWatchProviders(movieId).subscribe((response) => {
      let rent = response.results?.GB?.rent;

      if (rent && rent.length > 0)
        this.rentWatchProviders = rent;

      let buy = response.results?.GB?.buy;

      if (buy && buy.length > 0)
        this.buyWatchProviders = buy;

      this.watchProvidersLink = response.results?.GB?.link;
    });

    this.moviesService.getMovieCredits(movieId).subscribe((response) => {
      let moviesCast = this.removeDuplicates<CreditsResponseItem>(response.cast).filter(item => item.profile_path);

      if (moviesCast.length > 0)
        this.movieCast = moviesCast;

      let moviesCrew = this.removeDuplicates<CreditsResponseItem>(response.crew).filter(item => item.profile_path);

      if (moviesCrew.length > 0)
        this.movieCrew = moviesCrew;
    });
  }

  getImageSrc(isPoster: boolean): string {
    if (isPoster)
      return this.baseImageUrl + this.item?.poster_path;

    return `url(${this.baseImageUrl}${(this.item?.backdrop_path ?? this.item?.poster_path)})`;
  }

  getTrailerUrl(): string | undefined {
    let trailers = this.item.videos.results.filter(video => video.type === "Trailer" && video.site === "YouTube");

    this.trailerUrl = undefined;

    if (trailers.length > 0)
      this.trailerUrl = this.youtubeBaseUrl + trailers.reverse()[0].key;

    return this.trailerUrl;
  }

  getMovieLength(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours === 0)
      return `${minutes} min`;

    return `${hours} h ${minutes} min`;
  }

  private removeDuplicates<T>(array: { id: number }[]): T[] {
    let filtered: T[] = [];
    let ids: number[] = [];

    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      if (!ids.includes(item.id)) {
        filtered.push(item as T);
        ids.push(item.id);
      }
    }

    return filtered;
  }
}
