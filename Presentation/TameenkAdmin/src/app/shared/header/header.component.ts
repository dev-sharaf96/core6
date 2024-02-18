import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, LanguageService } from 'src/app/core';
import { AccountService } from '../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  language: string;
  username: string;
  isAdmin: boolean;
  /**
   * @constructor Creates an instance of HeaderComponent.
   * @param {LanguageService} _languageService
   * @memberof HeaderComponent
   */
  constructor(private _languageService: LanguageService, private _authService: AuthenticationService, private _router: Router, private _accountService: AccountService, private _toastrService: ToastrService) {
    const user = this._authService.getUserToken();
    this.username = user ? user.name || user.userName : 'user';
    this.isAdmin = user.isAdmin === 'True' ? true : false;
  }

  ngOnInit() {
    this.language = this._languageService.getLanguage();
  }

  /**
   *
   * @method toggleLang()
   * @description
   * toggle between arabic and english
   * and reload the location
   *
   * @memberof HeaderComponent
   */
  toggleLang() {
    const lang = this._languageService.getLanguage() === 'en' ? 'ar' : 'en';
    this._languageService.setLanguage(lang);
    location.reload();
  }

  logout() {
    this._accountService.SignOut().subscribe((result) => {
      if (result == true) {
        this._authService.logout();
        this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
      }
    }, (error: any) => {
      this._toastrService.error(error.error_description);
    });
  }
}
