import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonResponse, IUser } from 'src/app/core';
import { ICaptchaRes } from '../models';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  private RecentlyRegisteredUser = {} as IUser;
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.identityApiUrl + 'identity/';
  }
  getUserInfo(id): Observable<CommonResponse<IUser>> {
    return super.get<CommonResponse<IUser>>('user/', `id=${id}`);
  }
  getCaptcha(): Observable<CommonResponse<ICaptchaRes>> {
    return super.get<CommonResponse<ICaptchaRes>>('captcha/', null, new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
      'Language': this._localizationService.getCurrentLanguage().id.toString()
    }));
  }
  isAuthenticated(): Observable<boolean> {
    return super.get<boolean>('IsAuthenticated/');
  }
  resendverficationcode(UserId: string, PhoneNumber: string) {
    return super.post('resendverficationcode', { UserId: UserId, PhoneNumber: PhoneNumber });
  }
  verifyPhoneNumber(UserId: string, PhoneNumber: string, Code: string) {
    return super.post('verifycode', { UserId: UserId, PhoneNumber: PhoneNumber, Code: Code });
  }
  setRecentlyRegisteredUser(UserId: string, PhoneNumber: string) {
    this.RecentlyRegisteredUser.userId = UserId;
    this.RecentlyRegisteredUser.phoneNumber = PhoneNumber;
  }
  getRecentlyRegisteredUser() {
    return this.RecentlyRegisteredUser;
  }
  deleteRecentlyRegisteredUser() {
    this.RecentlyRegisteredUser = null;
  }
}
