import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { MovieDetail } from './interfaces/movies/movieDetail.interfaces';
import { CatalogResponse, GenresListResponse, WatchProviders } from './interfaces/common/common.interfaces';
import { Movie } from './interfaces/movies/movies.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey: string;
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.apiKey = environment.apiKey;
    this.baseUrl = environment.baseApiUrl;
  }

  private getAuthorization() {
    return "Bearer " + this.apiKey;
  }

  getGenresList() {
    return this.http.get<GenresListResponse>(this.baseUrl + `/genre/movie/list`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getPopularMoviesCatalog() {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/popular`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getUpcomingMoviesCatalog() {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/upcoming`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getTopRatedMoviesCatalog() {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/top_rated`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getNowPlayingMoviesCatalog() {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/now_playing`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getMoviesByGenre(genreIds: string) {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/discover/movie`, {
      headers: {
        Authorization: this.getAuthorization()
      },
      params: {
        with_genres: genreIds
      }
    });
  }

  getRecommendationsMoviesCatalog(id: number) {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/${id}/recommendations`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getSimilarMoviesCatalog(id: number) {
    return this.http.get<CatalogResponse<Movie>>(this.baseUrl + `/movie/${id}/similar`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getMovieById(id: number) {
    return this.http.get<MovieDetail>(this.baseUrl + `/movie/${id}`, {
      headers: {
        Authorization: this.getAuthorization()
      },
      params: {
        append_to_response: "videos"
      }
    });
  }

  getMovieWatchProviders(id: number) {
    return this.http.get<WatchProviders>(this.baseUrl + `/movie/${id}/watch/providers`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }
}
