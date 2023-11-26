import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { CatalogResponse, GenresListResponse } from './interfaces/common/common.interfaces';
import { Serie } from './interfaces/series/series.interface';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
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
    return this.http.get<GenresListResponse>(this.baseUrl + `/genre/tv/list`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getPopularSeriesCatalog() {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/popular`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getTopRatedSeriesCatalog() {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/top_rated`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getAiringTodaySeriesCatalog() {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/airing_today`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getOnTheAirSeriesCatalog() {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/on_the_air`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getSeriesByGenre(genreIds: string) {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/discover/tv`, {
      headers: {
        Authorization: this.getAuthorization()
      },
      params: {
        with_genres: genreIds
      }
    });
  }

  getRecommendationsSeriesCatalog(id: number) {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/${id}/recommendations`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }

  getSimilarSeriesCatalog(id: number) {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/${id}/similar`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }
}
