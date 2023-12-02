import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled = false;
  showScrollUpArrow = false;

  @HostListener("window:scroll", ["$event"])
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
    this.showScrollUpArrow = window.scrollY > 200;
  }

  onClickScrollUpArrow() {
    if (this.showScrollUpArrow)
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
