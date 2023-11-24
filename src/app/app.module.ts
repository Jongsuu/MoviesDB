import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeaturedMoviesCarruselComponent } from './featured-movies-carrusel/featured-movies-carrusel.component';
import { FeaturedItemComponent } from './featured-item/featured-item.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { CarruselItemComponent } from './carrusel-item/carrusel-item.component';
import { SeriesComponent } from './series/series.component';
import { FeaturedSeriesCarruselComponent } from './featured-series-carrusel/featured-series-carrusel.component';
import { FeaturedSeriesItemComponent } from './featured-series-item/featured-series-item.component';
import { HomeComponent } from './home/home.component';
import { CarruselMoviesComponent } from './carrusel-movies/carrusel-movies.component';
import { CarruselMoviesItemComponent } from './carrusel-movies-item/carrusel-movies-item.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MoviesComponent,
    FeaturedMoviesCarruselComponent,
    FeaturedItemComponent,
    CarruselComponent,
    CarruselItemComponent,
    AppComponent,
    SeriesComponent,
    FeaturedSeriesCarruselComponent,
    FeaturedSeriesItemComponent,
    HomeComponent,
    CarruselMoviesComponent,
    CarruselMoviesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'tv-series', component: SeriesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
