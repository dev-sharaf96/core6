import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommonResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.identityApiUrl + 'identity/';
  }
  register(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('register', body);
  }
  login(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('login', body);
  }
}
