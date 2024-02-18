import { Component, OnInit } from '@angular/core';
import { UserService, IUser, AuthService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  code: string;
  user: IUser;
  constructor(private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService) { }

  ngOnInit() {
    this.user = this._userService.getRecentlyRegisteredUser();
    if (!this.user) {
      this._userService.getUserInfo(this._authService.getUserId()).subscribe(data => {
        this.user = data.data;
        this.user.userId = this._authService.getUserId();
      });
    }
  }

  ResendVerifyCode() {
    this._userService.resendverficationcode(this.user.userId, this.user.phoneNumber).subscribe();
  }

  VerifyPhoneNumber() {
    if (this.code) {
      this._userService.verifyPhoneNumber(this.user.userId, this.user.phoneNumber, this.code).subscribe(
        () => {
          if (this._activatedRoute.snapshot.queryParams['returnUrl']) {
            this._router.navigateByUrl(this._activatedRoute.snapshot.queryParams['returnUrl']);
          }
        }
      );
    }
  }
}
