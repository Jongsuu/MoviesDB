export interface GenresListResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface CatalogResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface WatchProviders {
  id: number;
  results: { GB: WatchProvidersResults; IE: WatchProvidersResults; }
}

export interface WatchProvidersResults {
  link: string;
  rent: WatchProvidersResultsItem[];
  buy: WatchProvidersResultsItem[];
}

export interface WatchProvidersResultsItem {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CreditsResponse {
  id: number;
  cast: CreditsResponseItem[];
  crew: CreditsResponseItem[];
}

export interface CreditsResponseItem {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character?: string;
  credit_id: string;
  department?: string;
  job?: string;
  order: number;
}
