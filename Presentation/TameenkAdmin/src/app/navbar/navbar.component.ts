import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Page } from '../core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pages: {
    Page: Page
  }[];
  constructor(public router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.pages = this._authenticationService.getPages();
  }

}
