import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, Page } from '..';

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivateChild {
pages: {
  Page: Page
}[];
  constructor(private router: Router, private _authService: AuthenticationService) {
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (state.url === '/admin') { return true; }
      this.pages = this._authService.getPages();
      if (this.pages.some(page => state.url.includes(page.Page.RouteName))) {
        return true;
      } else {
        this.router.navigate(['/access_denied']);
        return false;
      }
  }
}
