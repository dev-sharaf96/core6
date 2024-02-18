import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
currentForm;
  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentForm = event.url.includes('login') ? 'login' : 'register';
      }
    });
  }

  toggleLogin() {
    this._router.navigate([`/account/${this.currentForm.includes('login') ? 'register' : 'login'}`]);
  }
}
