import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../models';
import { Observable } from 'rxjs';
import { RequestModel } from 'src/app/requests/requests.model';

@Injectable({
  providedIn: 'root'
})
export class  YakeenServicesService  extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'YakeenService/';
  }

  // CommonResponse<RequestModel>
  checkUpdateCarInfoByCustomTwo(body): Observable<any> {
    return super.post<any>('UpdateCarInfoByCustomTwo', body);
  }
}