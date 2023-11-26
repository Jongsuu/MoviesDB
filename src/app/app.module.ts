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
    SeriesCarruselItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
