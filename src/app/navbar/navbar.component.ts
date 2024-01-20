import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  links = [
    {
      text: "Home",
      url: "/",
      active: true
    },
    {
      text: "Movies",
      url: "/movies",
      active: false
    },
    {
      text: "Series",
      url: "/series",
      active: false
    },
    {
      text: "Explore",
      url: "/explore",
      active: false
    }
  ];

  @Input() scrolled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        window.scrollTo({ top: 0, behavior: "instant" });
        this.links.forEach(item => {
          item.active = item.url === event.url;
        });
      }
    });
  }
}
