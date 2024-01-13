import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeaturedMoviesCarruselComponent } from './featured-movies-carrusel/featured-movies-carrusel.component';
import { MoviesCarruselComponent } from './movies-carrusel/movies-carrusel.component';
import { MoviesCarruselItemComponent } from './movies-carrusel-item/movies-carrusel-item.component';
import { SeriesComponent } from './series/series.component';
import { FeaturedSeriesCarruselComponent } from './featured-series-carrusel/featured-series-carrusel.component';
import { FeaturedSeriesItemComponent } from './featured-series-item/featured-series-item.component';
import { HomeComponent } from './home/home.component';
import { FeaturedMoviesItemComponent } from './featured-movies-item/featured-movies-item.component';
import { SeriesCarruselItemComponent } from './series-carrusel-item/series-carrusel-item.component';
import { SeriesCarruselComponent } from './series-carrusel/series-carrusel.component';
import { FeaturedMovieComponent } from './featured-movie/featured-movie.component';
import { FeaturedSeriesComponent } from './featured-series/featured-series.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { WatchProvidersComponent } from './watch-providers/watch-providers.component';
import { CreditsComponent } from './credits/credits.component';
import { SeriesSeasonsComponent } from './series-seasons/series-seasons.component';
import { SeriesSeasonsEpisodesComponent } from './series-seasons-episodes/series-seasons-episodes.component';
import { SeriesSeasonsEpisodeDetailComponent } from './series-seasons-episode-detail/series-seasons-episode-detail.component';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';
import { ExploreComponent } from './explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MoviesComponent,
    FeaturedMoviesCarruselComponent,
    FeaturedMoviesItemComponent,
    MoviesCarruselComponent,
    MoviesCarruselItemComponent,
    SeriesComponent,
    FeaturedSeriesCarruselComponent,
    FeaturedSeriesItemComponent,
    SeriesCarruselComponent,
    SeriesCarruselItemComponent,
    FeaturedMovieComponent,
    FeaturedSeriesComponent,
    MovieDetailComponent,
    SeriesDetailComponent,
    WatchProvidersComponent,
    CreditsComponent,
    SeriesSeasonsComponent,
    SeriesSeasonsEpisodesComponent,
    SeriesSeasonsEpisodeDetailComponent,
    CircularProgressBarComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/:movieId', component: MovieDetailComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'series/:seriesId', component: SeriesDetailComponent },
      { path: 'series/:seriesId/season/:seasonNumber/episode/:episodeNumber', component: SeriesSeasonsEpisodeDetailComponent },
      { path: 'explore', component: ExploreComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
