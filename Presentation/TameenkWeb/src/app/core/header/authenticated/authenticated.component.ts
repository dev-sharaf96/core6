import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { IUser } from 'src/app/core';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  @Input() userInfo: IUser;
  returnUrl;
  constructor(private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  logout() {
    this._authService.deleteUserId();
    this._authService.deleteUserToken();
    this._authService.getAccessToken().then(() => {
      this._router.navigate(['/']);
    });
  }
}
