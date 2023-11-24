import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { CatalogResponse } from './interfaces/common/common.interfaces';
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

  getPopularSeriesCatalog() {
    return this.http.get<CatalogResponse<Serie>>(this.baseUrl + `/tv/popular`, {
      headers: {
        Authorization: this.getAuthorization()
      }
    });
  }
}
