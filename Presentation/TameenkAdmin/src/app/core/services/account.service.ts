import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SMSLogModel } from '../../request-logs/sms-log/sms-log-model';
import { UserToken } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'account/';
  }

  getUserInfo(): Observable<any> {
    return super.get<any>('UserInfo');
  }
  register(body): Observable<any> {
    return super.post<any>('register', body);
  }
  logout(): Observable<any> {
    return super.post<any>('Logout', null);
  }
  changePassword(body): Observable<any> {
    return super.post<any>('ChangePassword', body);
  }
  changeName(body): Observable<any> {
    return super.post<any>('ChangeName', body);
  }
  resetPassword(body): Observable<any> {
    return super.post<any>('ResetPassword', body);
  }
  SignOut(): Observable<boolean> {
    return super.post<boolean>("Logout",null);
  }

  sendOtp(body) {
    return super.post<SMSLogModel>('sendVerificationCode', body);
  }

  getFormUrlEncoded(value) {
    return encodeURIComponent(value);
  }

  validateConfirmationCode(body, params) {
    return super.post<SMSLogModel>('validateConfirmationCode', body, params);
  }

  setUserPhoneToken(phoneToken) {
    sessionStorage.setItem('phoneConfirmatinToken', JSON.stringify(phoneToken));
  }
  getUserPhoneToken() {
    return JSON.parse(sessionStorage.getItem('phoneConfirmatinToken')) as UserToken;
  }
}
