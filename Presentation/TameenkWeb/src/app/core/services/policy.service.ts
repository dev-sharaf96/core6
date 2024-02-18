import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonResponse, INotification, IBank, IUserInvoice, IUserPolicy } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService extends ApiService {
  userPolicies: Observable<CommonResponse<IUserPolicy[]>>;
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.policyApiUrl;
  }

  getUserPolicies(id, paging = environment.defaultPaging): Observable<CommonResponse<IUserPolicy[]>> {
    this.userPolicies = super.get<CommonResponse<IUserPolicy[]>>('policy/user-policies/',
    `id=${id }${paging}`);
    return super.get<CommonResponse<IUserPolicy[]>>('policy/user-policies/', `id=${id }${paging}`);
  }
  downloadUserPolicy(fileId): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('policy/download-policy/', `fileId=${fileId}`);
  }
  getValidPoliciesCount(id): Observable<CommonResponse<number>> {
    return super.get<CommonResponse<number>>('policy/user-policies-count/', `id=${id}`);
  }
  getExpirePoliciesCount(id): Observable<CommonResponse<number>> {
    return super.get<CommonResponse<number>>('policy/user-expire-policies-count/', `id=${id}`);
  }
  getBillsCount(id): Observable<CommonResponse<number>> {
    return super.get<CommonResponse<number>>('policy/user-invoices/', `id=${id}`);
  }
  getUserAllInvoices(id, paging = environment.defaultPaging): Observable<CommonResponse<IUserInvoice[]>> {
    return super.get<CommonResponse<IUserInvoice[]>>('policy/user-all-invoices/', `id=${id}${paging}`);
  }
  downloadUserInvoice(fileId): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('policy/download-invoice/', `fileId=${fileId}`);
  }
  getNotifications(id, paging = environment.defaultPaging): Observable<CommonResponse<INotification[]>> {
    return super.get<CommonResponse<INotification[]>>('notification/user', `userId=${id}${paging}`);
  }
  getUpdateRequestsCount(id): Observable<CommonResponse<number>> {
    return super.get<CommonResponse<number>>('policy/user-update-request', `id=${id}`);
  }
  getUserBanks(id, paging = environment.defaultPaging): Observable<CommonResponse<IBank[]>> {
    return super.get<CommonResponse<IBank[]>>('policy/user-banks', `id=${id}${paging}`);
  }
  UpdateRequestPolicy(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('policy/update-request-policy', body);
  }
}
