import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalizationService, UsersService, AuthenticationService, AccountService } from './core/services';
import { Router, NavigationStart } from '@angular/router';

/**
 * The Root Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * @constructor
   * Creates an instance of AppComponent.
   *
   * @param {TranslateService} translate
   * @param {LanguageService} _languageService
   * @memberof AppComponent
   */
  constructor(private _localizationService: LocalizationService, private accountService: AccountService,
              private _authService: AuthenticationService, private _router: Router) {
    _localizationService.configure();
    _router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        // console.log('AppComponent --> constructor');
        // console.log(val);
        // this.CheckPhoneConfirmationExpired();
      }
    });
  }

    /**
     * on Component Initial
     * @memberof AppComponent
     */
    ngOnInit(): void { }

  CheckPhoneConfirmationExpired() {
      const phoneTocken = this.accountService.getUserPhoneToken();
      if(phoneTocken) {
        const expireDate_Ticks = new Date(phoneTocken.expires_in).getTime();
        const NowTicks = new Date().getTime();
        console.log('AppComponent --> CheckPhoneConfirmationExpired');
        console.log(this._router.url);
        console.log(expireDate_Ticks);
        console.log(NowTicks);
        if (NowTicks > expireDate_Ticks) {
          this._authService.logout();
          sessionStorage.removeItem('phoneConfirmatinToken');
          this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });

        }
      }
    }
}
