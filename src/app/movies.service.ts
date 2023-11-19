import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { MovieCatalogResponse } from './interfaces/movies/movies.interfaces';
import { MovieDetail } from './interfaces/movies/movieDetail.interfaces';

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

  getPopularMoviesCatalog() {
    return this.http.get<MovieCatalogResponse>(this.baseUrl + `/discover/movie`, {
      headers: {
        Authorization: this.getAuthorization()
      },
      params: {
        include_adult: false,
        include_video: false,
        sort_by: "popularity.desc"
      }
    });
  }

  getLatestMoviesCatalog() {
    return this.http.get(this.baseUrl + `/upcoming`, {
      headers: {
        Authorization: this.getAuthorization()
      },
      params: {
        language: "en-US",
        page: 1
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
}
