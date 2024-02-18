import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageService, UserService, AuthService } from 'src/app/core/services';
import { CommonResponse, IUser } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  navIsActive = false;
  userInfo;
  constructor(
    private _router: Router,
    private _languageService: LanguageService,
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this.isAuthenticated = this._authService.getUserId() ? true : false;
  }

  ngOnInit() {
    this._authService.currentUser$.subscribe(userId => {
      this.isAuthenticated = userId ? true : false;
      if (this.isAuthenticated) {
        this._userService.getUserInfo(userId).subscribe(
          (data: CommonResponse<IUser>) => {
            this.userInfo = data.data;
          },
          (error: any) => error
        );
      }
    });
    this._router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      this.navIsActive = false;
    });
    $('.menuToggle').on('click', function () {
      $('.mobile-nav').toggleClass('active');
    });
  }
  toggleLang() {
    const lang = this._languageService.getLanguage() === 'en' ? 'ar' : 'en';
    this._languageService.setLanguage(lang);
    location.reload();
  }
}
