import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponse, IIdNamePairModel } from '..';
import { environment } from '../../../environments/environment';
import { AutoleaseUser } from '../../AutoLease/autolease-users/models/autolease-user';
import { AutoleaseUserModel } from '../../AutoLease/autolease-users/models/autolease-user-model';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AutoleaseService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'autoleas/';
  }

  getAllWithFilter(body, params): Observable<CommonResponse<AutoleaseUserModel[]>> {
    return super.post<CommonResponse<AutoleaseUserModel[]>>('all-users-with-Filter', body, params);
  }

  addNewUser(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('Adduser', body);
  }

  updateUser(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('Edituser', body);
  }

  getAutoleaseUser(id): Observable<AutoleaseUser> {
    return super.get<AutoleaseUser>('get', `id=${id}`);
  }

  getAllBanks(lang): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('banks', `lang=${lang}`);
  }

  lockUser(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('DeleteUser', body);
  }
}
