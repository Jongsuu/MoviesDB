import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../interfaces/movies/movieDetail.interfaces';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environment/environment';
import { WatchProviders } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private baseImageUrl: string;
  private youtubeBaseUrl: string;
  item: MovieDetail = undefined as any;
  watchProviders: WatchProviders = undefined as any;

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
      this.watchProviders = response;
    });
  }

  getImageSrc(isPoster: boolean): string {
    if (isPoster)
      return this.baseImageUrl + this.item?.poster_path;

    return `url(${this.baseImageUrl}${(this.item?.backdrop_path ?? this.item?.poster_path)})`;
  }

  getTrailerUrl(): string | undefined {
    let trailers = this.item.videos.results.filter(video => video.type === "Trailer" && video.site === "YouTube");

    if (trailers.length > 0)
      return this.youtubeBaseUrl + trailers.reverse()[0].key;

    return undefined;
  }

  getMovieLength(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    if (hours === 0)
      return `${minutes} min`;

    return `${hours} h ${minutes} min`;
  }
}
