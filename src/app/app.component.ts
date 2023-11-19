import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Movies';
  scrolled: boolean = false;

  @HostListener("window:scroll", ["$event"]) onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }
}
