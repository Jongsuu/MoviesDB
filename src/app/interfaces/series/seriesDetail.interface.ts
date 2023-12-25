import { CreditsResponseItem, Genre, ProductionCompany, ProductionCountry, SpokenLanguage } from "../common/common.interfaces";

export interface SeriesDetail {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  last_air_date: string;
  created_by: SeriesCreatedBy[];
  genres: Genre[];
  homepage: string;
  episodes_run_time: number[];
  in_production: boolean;
  languages: string[];
  name: string;
  last_episode_to_air: SeriesEpisode;
  next_episode_to_air: SeriesEpisode;
  seasons: SeriesSeason[];
  number_of_episodes: number;
  number_of_seasons: number;
  networks: ProductionCompany[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface SeriesCreatedBy {
  id: number;
  credit_id: number;
  name: string;
  gender: number;
  profile_path: string;
}

export interface SeriesEpisode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface SeriesSeason {
  id: number;
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SeriesSeasonDetail {
  _id: number;
  id: number;
  air_date: string;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: SeriesSeasonDetailEpisode[];
}

export interface SeriesSeasonDetailEpisode extends SeriesEpisode {
  crew: CreditsResponseItem[];
  guest_stars: CreditsResponseItem[];
}

export interface SeriesSeasonEpisodeDetail {
  id: number;
  air_date: string;
  name: string;
  overview: string;
  season_number: number;
  episode_number: number;
  runtime: number;
  vote_average: number;
  crew: CreditsResponseItem[];
  guest_stars: CreditsResponseItem[];
  production_code: string;
  still_path: string;
}
