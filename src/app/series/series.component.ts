import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';
import { Serie } from '../interfaces/series/series.interface';
import { Genre } from '../interfaces/common/common.interfaces';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  genresList: Genre[] = [];

  popularSeries: Serie[] = [];
  topRatedSeries: Serie[] = [];
  airingTodaySeries: Serie[] = [];
  onTheAirSeries: Serie[] = [];

  recommendationsSeries: Serie[] = [];
  recommendationsSeriesTitle: string | undefined;

  similarSeries: Serie[] = [];
  similarSeriesTitle: string | undefined;

  comedySeries: Serie[] = [];
  actionAdventureSeries: Serie[] = [];
  crimeDocumentarySeries: Serie[] = [];
  familyKidsSeries: Serie[] = [];
  westernSeries: Serie[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.seriesService.getPopularSeriesCatalog().subscribe((response) => {
      this.popularSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
      this.loadSimilarSeries();
    });

    this.loadGenreSeries();

    this.seriesService.getTopRatedSeriesCatalog().subscribe((response) => {
      this.topRatedSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
      this.loadRecommendationSeries();
    });

    this.seriesService.getAiringTodaySeriesCatalog().subscribe((response) => {
      this.airingTodaySeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
    });

    this.seriesService.getOnTheAirSeriesCatalog().subscribe((response) => {
      this.onTheAirSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
    });
  }

  private loadGenreSeries(): void {
    this.seriesService.getGenresList().subscribe((response) => {
      this.genresList = response.genres;
      console.log(this.genresList);

      let comedy = this.genresList.find(genre => genre.name === "Comedy")?.id.toString();
      if (comedy) {
        this.seriesService.getSeriesByGenre(comedy).subscribe((response) => {
          this.comedySeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }

      let actionAdventure = this.genresList.find(genre => genre.name === "Action & Adventure")?.id.toString();
      if (actionAdventure) {
        this.seriesService.getSeriesByGenre(actionAdventure).subscribe((response) => {
          this.actionAdventureSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }

      let crimeDocumentary = this.genresList.filter(genre => genre.name === "Crime" || genre.name === "Documentary").map(item => item.id);
      if (crimeDocumentary) {
        this.seriesService.getSeriesByGenre(crimeDocumentary.join()).subscribe((response) => {
          this.crimeDocumentarySeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }

      let familyKids = this.genresList.filter(genre => genre.name === "Family" || genre.name === "Kids").map(item => item.id);
      if (familyKids) {
        this.seriesService.getSeriesByGenre(familyKids.join()).subscribe((response) => {
          this.familyKidsSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }

      let western = this.genresList.filter(genre => genre.name === "Western").map(item => item.id);
      if (western.length > 0) {
        this.seriesService.getSeriesByGenre(western.join()).subscribe((response) => {
          this.westernSeries = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
        });
      }
    });
  }

  private loadSimilarSeries(): void {
    let randomIndex = Math.floor(Math.random() * this.popularSeries.length);
    let similarSeries = this.popularSeries[randomIndex];
    this.similarSeriesTitle = `Series similar to ${similarSeries.name}`;
    this.seriesService.getSimilarSeriesCatalog(similarSeries.id).subscribe((response) => {
      let series = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
      if (series.length === 0)
        this.loadSimilarSeries();
      else
        this.similarSeries = series;
    });
  }

  private loadRecommendationSeries(): void {
    let randomIndex = Math.floor(Math.random() * this.topRatedSeries.length);
    let recommendationSeries = this.topRatedSeries[randomIndex];
    this.recommendationsSeriesTitle = `If you loved ${recommendationSeries.name}...`;
    this.seriesService.getRecommendationsSeriesCatalog(recommendationSeries.id).subscribe((response) => {
      let series = response.results.filter(series => series.poster_path && series.backdrop_path && series.overview.length > 0);
      if (series.length === 0)
        this.loadRecommendationSeries();
      else
        this.recommendationsSeries = series;
    });
  }
}
