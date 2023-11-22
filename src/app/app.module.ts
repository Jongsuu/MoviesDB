import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeaturedCarruselComponent } from './featured-carrusel/featured-carrusel.component';
import { FeaturedItemComponent } from './featured-item/featured-item.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { CarruselItemComponent } from './carrusel-item/carrusel-item.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MoviesComponent,
    FeaturedCarruselComponent,
    FeaturedItemComponent,
    CarruselComponent,
    CarruselItemComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MoviesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
