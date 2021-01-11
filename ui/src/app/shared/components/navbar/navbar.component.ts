import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  toggled = false;
  constructor() {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.toggled = !this.toggled;
  }
}
