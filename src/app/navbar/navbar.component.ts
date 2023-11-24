import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  links = [
    {
      text: "Home",
      url: "/"
    },
    {
      text: "Movies",
      url: "/movies"
    },
    {
      text: "TV Series",
      url: "/tv-series"
    },
    {
      text: "Artists",
      url: "/artists"
    }
  ];

  @Input() scrolled: boolean = false;
}
