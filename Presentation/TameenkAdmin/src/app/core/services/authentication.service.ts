import { Injectable, Injector, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, retry, tap } from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "../../../environments/environment";
import { UserToken } from "../models/user-token.model";
import { Observable } from "rxjs";
import { CommonResponse, Page } from "../models";
import { ICaptcha } from "../models/captcha";

@Injectable()
export class AuthenticationService extends ApiService implements OnDestroy {
  _sessionStorageUserTokenKey = "userToken";

  ngOnDestroy(): void {
    this.logout();
  }
  /**
   * Create instance of AuthenticationService
   * @constructor
   */
  constructor(private _injector: Injector) {
    super(_injector);
     this.apiUrl = environment.identityUrl;
    //this.apiUrl = 'https://www.bcare.com.sa/';

  //  this.apiUrl = 'https://www.bcare.com.sa/IdentityApi/';
  }

  login(username: string, password: string, code: string): Observable<UserToken> {
    this.apiUrl=environment.tokenApi;
    return super.post<UserToken>(
      "token",
      this.getFormUrlEncoded({
        grant_type: "password",
        password: password,
        username: username,
        client_Id: environment.clientId,
        confirmation_code: code
      })
    );
  }

  getUserToken(): UserToken {
    return JSON.parse(
      sessionStorage.getItem(this._sessionStorageUserTokenKey)
    ) as UserToken;
  }

  setUserToken(userToken) {
    sessionStorage.setItem(
      this._sessionStorageUserTokenKey,
      JSON.stringify(userToken)
    );
  }
  setUserName(name) {
    const userToken = JSON.parse(sessionStorage.getItem(this._sessionStorageUserTokenKey)) as UserToken;
    userToken.name = name;
    this.setUserToken(userToken);
  }
  getPages(): {
    Page: Page;
  }[] {
    const userToken = JSON.parse(
      sessionStorage.getItem(this._sessionStorageUserTokenKey)
    ) as UserToken;
    return JSON.parse(userToken.pages);
  }
  setPages(page: Page) {
    const userToken = JSON.parse(
      sessionStorage.getItem(this._sessionStorageUserTokenKey)
    ) as UserToken;
    let pages = JSON.parse(userToken.pages);
    if (page.IsActive) {
      pages.push({ Page: page });
    } else {
      pages =  pages.filter(x=>x.Page.Id !== page.Id);
    }
    pages.sort((a, b) => a.Page.Order - b.Page.Order);

    userToken.pages = JSON.stringify(pages);
    this.setUserToken(userToken);
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      if (toConvert.hasOwnProperty(property)) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
    }
    return formBody.join("&");
  }

  /**
   * logout
   * @method
   * @memberOf {AuthenticationService}
   */
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem(this._sessionStorageUserTokenKey);
  }

  getCaptcha() {
    this.apiUrl=environment.captchaUrl;
    return super.get<CommonResponse<ICaptcha>>('GetCaptcha', null, new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
      'Language': this._localizationService.getCurrentLanguage().id.toString()
    }));
  }

  validateCaptcha(body) {
    return super.post<CommonResponse<boolean>>("IdentityApi/api/identity/captcha/validate", body);
  }
}
