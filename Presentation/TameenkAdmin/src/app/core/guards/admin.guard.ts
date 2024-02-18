import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '..';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private _authService: AuthenticationService
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._authService.getUserToken();
    user.isAdmin = user.isAdmin === 'True' ? true : false;
    if (user.isAdmin) {
      // is Admin so return true
      return true;
    } else {
      this.router.navigate(['/access_denied']);
      return false;
    }
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._authService.getUserToken();
    user.isAdmin = user.isAdmin === 'True' ? true : false;
    if (user.isAdmin) {
      // is Admin so return true
      return true;
    } else {
      this.router.navigate(['/access_denied']);
      return false;
    }
  }
}
