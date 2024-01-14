import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { SeriesService } from '../series.service';
import { Genre } from '../interfaces/common/common.interfaces';
import { Movie } from '../interfaces/movies/movies.interfaces';
import { Serie } from '../interfaces/series/series.interface';

export interface SearchGenres {
  action: boolean;
  comedy: boolean;
  horror: boolean;
  fantasy: boolean;
  mystery: boolean;
  drama: boolean;
  documentary: boolean;
  romance: boolean;
};

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  searchFor = {
    movies: true,
    series: true,
    adult: false,
  };

  searchGenres: SearchGenres = {
    action: true,
    comedy: false,
    horror: true,
    fantasy: false,
    mystery: false,
    drama: true,
    documentary: false,
    romance: false
  };

  queryValue = "";

  queryMovies: Movie[] | undefined;
  actionMovies: Movie[] | undefined;
  comedyMovies: Movie[] | undefined;
  horrorMovies: Movie[] | undefined;
  fantasyMovies: Movie[] | undefined;
  mysteryMovies: Movie[] | undefined;
  dramaMovies: Movie[] | undefined;
  documentaryMovies: Movie[] | undefined;
  romanceMovies: Movie[] | undefined;

  querySeries: Serie[] | undefined;
  actionSeries: Serie[] | undefined;
  comedySeries: Serie[] | undefined;
  crimeSeries: Serie[] | undefined;
  fantasySeries: Serie[] | undefined;
  mysterySeries: Serie[] | undefined;
  dramaSeries: Serie[] | undefined;
  documentarySeries: Serie[] | undefined;
  romanceSeries: Serie[] | undefined;

  moviesGenres: Genre[] = [];
  seriesGenres: Genre[] = [];

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) { }

  ngOnInit(): void {
    let moviesGenreRequest = this.moviesService.getGenresList().subscribe((response) => {
      this.moviesGenres = response.genres;
    });

    let seriesGenreRequest = this.seriesService.getGenresList().subscribe((response) => {
      this.seriesGenres = response.genres;
    });

    let interval = setInterval(() => {
      if (moviesGenreRequest.closed && seriesGenreRequest.closed) {
        clearInterval(interval);
        this.searchResults();
      }
    }, 5);
  }

  clearInput(searchInput: HTMLInputElement): void {
    searchInput.value = "";
    this.queryValue = "";
  }

  searchInputKeydown(event: KeyboardEvent, searchInput: HTMLInputElement): void {
    this.queryValue = searchInput.value;
    if (event.key === "Enter") {
      this.searchResults();
    }
  }

  searchResults(): void {
    console.log("SEARCH", this.queryValue);
    console.log(this.searchFor);
    const searchGenres = { ...this.searchGenres };
    let includeAdult = this.searchFor.adult;

    if (this.searchFor.movies) {
      this.moviesService.searchMovies(this.queryValue.trim(), includeAdult).subscribe((response) => {
        this.queryMovies = this.filterList(response.results) as Movie[];
      });
      let moviesGenres: Genre[] = [];

      if (this.moviesGenres)
        moviesGenres = this.getGenreIds(searchGenres, this.moviesGenres);

      this.getMovies(moviesGenres, searchGenres);
    }
    else {
      this.queryMovies = undefined;
      this.actionMovies = undefined;
      this.comedyMovies = undefined;
      this.horrorMovies = undefined;
      this.fantasyMovies = undefined;
      this.mysteryMovies = undefined;
      this.dramaMovies = undefined;
      this.documentaryMovies = undefined;
      this.romanceMovies = undefined;
    }

    if (this.searchFor.series) {
      this.seriesService.searchSeries(this.queryValue.trim(), includeAdult).subscribe((response) => {
        this.querySeries = this.filterList(response.results) as Serie[];
      });
      let seriesGenres: Genre[] = [];

      if (this.seriesGenres)
        seriesGenres = this.getGenreIds(searchGenres, this.seriesGenres, true);

      this.getSeries(seriesGenres, searchGenres);
    }
    else {
      this.querySeries = undefined;
      this.actionSeries = undefined;
      this.comedySeries = undefined;
      this.crimeSeries = undefined;
      this.fantasySeries = undefined;
      this.mysterySeries = undefined;
      this.dramaSeries = undefined;
      this.documentarySeries = undefined;
      this.romanceSeries = undefined;
    }
  }

  private getGenreIds(searchGenres: SearchGenres, genres: Genre[], forSeries = false): Genre[] {
    let selectedGenres = Object.entries(searchGenres).filter(genre => genre[1]).map(genre => genre[0].toLowerCase());
    let activeGenres: Genre[] = [];

    if (forSeries) {
      let index = selectedGenres.findIndex((value) => value.includes("horror"));
      if (index !== -1)
        selectedGenres = selectedGenres.fill("crime", index, index + 1);
    }

    selectedGenres.forEach(item => {
      let foundGenre = genres.find(genre => genre.name.toLowerCase().includes(item));
      if (foundGenre)
        activeGenres.push({ id: foundGenre.id, name: foundGenre.name.toLowerCase() });
    });

    return activeGenres;
  }

  private getMovies(moviesGenres: Genre[], searchGenres: SearchGenres): void {
    if (searchGenres.action) {
      let id = moviesGenres.find(genre => genre.name.includes("action"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.actionMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.actionMovies = undefined;
    }
    else
      this.actionMovies = undefined;

    if (searchGenres.comedy) {
      let id = moviesGenres.find(genre => genre.name.includes("comedy"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.comedyMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.comedyMovies = undefined;
    }
    else
      this.comedyMovies = undefined;

    if (searchGenres.drama) {
      let id = moviesGenres.find(genre => genre.name.includes("drama"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.dramaMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.dramaMovies = undefined;
    }
    else
      this.dramaMovies = undefined;

    if (searchGenres.horror) {
      let id = moviesGenres.find(genre => genre.name.includes("horror"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.horrorMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.horrorMovies = undefined;
    }
    else
      this.horrorMovies = undefined;

    if (searchGenres.fantasy) {
      let id = moviesGenres.find(genre => genre.name.includes("fantasy"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.fantasyMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.fantasyMovies = undefined;
    }
    else
      this.fantasyMovies = undefined;

    if (searchGenres.mystery) {
      let id = moviesGenres.find(genre => genre.name.includes("mystery"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.mysteryMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.mysteryMovies = undefined;
    }
    else
      this.mysteryMovies = undefined;

    if (searchGenres.romance) {
      let id = moviesGenres.find(genre => genre.name.includes("romance"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.romanceMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.romanceMovies = undefined;
    }
    else
      this.romanceMovies = undefined;

    if (searchGenres.documentary) {
      let id = moviesGenres.find(genre => genre.name.includes("documentary"))?.id;
      if (id)
        this.moviesService.getMoviesByGenre("" + id).subscribe((response) => {
          this.documentaryMovies = this.filterList(response.results) as Movie[];
        });
      else
        this.documentaryMovies = undefined;
    }
    else
      this.documentaryMovies = undefined;
  }

  private getSeries(seriesGenres: Genre[], searchGenres: SearchGenres): void {
    if (searchGenres.action) {
      let id = seriesGenres.find(genre => genre.name.includes("action"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.actionSeries = this.filterList(response.results) as Serie[];
        });
      else
        this.actionSeries = undefined;
    }
    else
      this.actionSeries = undefined;

    if (searchGenres.comedy) {
      let id = seriesGenres.find(genre => genre.name.includes("comedy"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.comedySeries = this.filterList(response.results) as Serie[];
        });
      else
        this.comedySeries = undefined;
    }
    else
      this.comedySeries = undefined;

    if (searchGenres.drama) {
      let id = seriesGenres.find(genre => genre.name.includes("drama"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.dramaSeries = this.filterList(response.results) as Serie[];
        });
      else
        this.dramaSeries = undefined;
    }
    else
      this.dramaSeries = undefined;

    if (searchGenres.horror) {
      let id = seriesGenres.find(genre => genre.name.includes("crime"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.crimeSeries = this.filterList(response.results) as Serie[];
        });
      else
        this.crimeSeries = undefined;
    }
    else
      this.crimeSeries = undefined;

    if (searchGenres.fantasy) {
      let id = seriesGenres.find(genre => genre.name.includes("fantasy"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.fantasySeries = this.filterList(response.results) as Serie[];
        });
      else
        this.fantasySeries = undefined;
    }
    else
      this.fantasySeries = undefined;

    if (searchGenres.mystery) {
      let id = seriesGenres.find(genre => genre.name.includes("mystery"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.mysterySeries = this.filterList(response.results) as Serie[];
        });
      else
        this.mysterySeries = undefined;
    }
    else
      this.mysterySeries = undefined;

    if (searchGenres.romance) {
      let id = seriesGenres.find(genre => genre.name.includes("romance"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.romanceSeries = this.filterList(response.results) as Serie[];
        });
      else
        this.romanceSeries = undefined;
    }
    else
      this.romanceSeries = undefined;

    if (searchGenres.documentary) {
      let id = seriesGenres.find(genre => genre.name.includes("documentary"))?.id;
      if (id)
        this.seriesService.getSeriesByGenre("" + id).subscribe((response) => {
          this.documentarySeries = this.filterList(response.results) as Serie[];
        });
      else
        this.documentarySeries = undefined;
    }
    else
      this.documentarySeries = undefined;
  }

  private filterList(list: (Movie | Serie)[]): (Movie | Serie)[] | undefined {
    let filteredList = list.filter(item => item.poster_path && item.backdrop_path && item.overview.length > 0);
    return filteredList.length > 0 ? filteredList : undefined;
  }
}
