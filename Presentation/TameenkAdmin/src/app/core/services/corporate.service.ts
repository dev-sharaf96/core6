import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CorporateAccountModel } from '../../Corporate/corporate-accounts/models/corporate-account-model';
import { CorporateNewAccountModel } from '../../Corporate/corporate-accounts/models/corporate-new-account-model';
import { CorporateNewUserModel } from '../../Corporate/corporate-users/models/corporate-new-user-model';
import { CorporateUserModel } from '../../Corporate/corporate-users/models/corporate-user-model';
import { CommonResponse, IIdNamePairModel } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'corporate/';
  }

  getAllCorporateUsersWithFilter(body, params): Observable<CommonResponse<CorporateUserModel[]>> {
    return super.post<CommonResponse<CorporateUserModel[]>>('all-users-with-Filter', body, params);
  }

  addNewUser(body): Observable<any> {
    return super.post<any>('Adduser', body);
  }

  updateUser(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('Edituser', body);
  }

  getCorporateUser(id): Observable<CorporateNewUserModel> {
    return super.get<CorporateNewUserModel>('get', `id=${id}`);
  }

  getAllCorporateAccounts(lang): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('corporateAccounts', `lang=${lang}`);
  }

  manageUserLock(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('manageLockUser', body);
  }

  // --------------- Corporate Account --------------- //

  getAllCorporateAccountsWithFilter(body, params): Observable<CommonResponse<CorporateAccountModel[]>> {
    return super.post<CommonResponse<CorporateAccountModel[]>>('all-corporate-account-with-Filter', body, params);
  }

  addNewAccount(body): Observable<any> {
    return super.post<any>('AddAccount', body);
  }

  getCorporateAccount(id): Observable<any> {
    return super.get<any>('getCorporateAccount', `id=${id}`);
  }

  updateAccount(body): Observable<any> {
    return super.post<any>('EditAccount', body);
  }

  manageAccountLock(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('manageLockAccount', body);
  }

  updateWalletBalance(body): Observable<any> {
    return super.post<any>('addBalanceToWallet', body);
  }

  getCorporateAccountUsers(id): Observable<any> {
    return super.get<any>('getCorporateAccountUsers', `id=${id}`);
  }
}
