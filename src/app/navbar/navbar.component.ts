import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from "../utils/interfaces/navbar-item.interface";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navbarItems: NavbarItem[] = [
    { name: 'Home', route: '/home' },
    { name: 'Planner', route: '/planner' },
    { name: 'Player', route: '/player' },
  ];

  constructor(private router: Router) { }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}

