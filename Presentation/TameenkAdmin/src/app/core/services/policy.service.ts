import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';
import { CommonResponse, NajmStatusHistory, NajmStatistics, IPolicy, IUpdateRequest, NajmStatus } from '../models';
import { environment } from '../../../environments/environment';

/**
 *
 *
 * @export
 * @class PolicyService
 * @extends {ApiService}
 */
@Injectable()
export class PolicyService extends ApiService {

  /**
   * Creates an instance of PolicyService.
   * @param {HttpClient} httpClient
   * @memberof PolicyService
   */
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.policyApiUrl;
  }
  /**
   * Get Najm Status History
   *
   * @returns {Observable<CommonResponse<INajmStatusHistory[]>>}
   * @memberof PolicyService
   */
  getNajmStatus(): Observable<CommonResponse<NajmStatusHistory[]>> {
    return super.get<CommonResponse<NajmStatusHistory[]>>('get-najm');
  }
  /**
   * Get Najm Statistics
   *
   * @returns {Observable<NajmStatusResponse>}
   * @memberof PolicyService
   */
  getNajmStatistics(): Observable<CommonResponse<NajmStatistics>> {
    return super.get<CommonResponse<NajmStatistics>>('najm-statistics');
  }

  /**
   * Get Failure Policis
   *
   * @param {string} params
   * @returns {Observable<CommonResponse<IPolicy[]>>}
   * @memberof PolicyService
   */
  getFailurePolicis(pageIndex: number, pageSize: number): Observable<CommonResponse<IPolicy[]>> {
    return super.get<CommonResponse<IPolicy[]>>('GetPoliciesWithFailureStatus', `pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }


  /**
   * Get Max Tries Policies
   *
   * @param {string} params
   * @returns {Observable<CommonResponse<IPolicy[]>>}
   * @memberof PolicyService
   */
  getMaxTriesPolicies(params: string): Observable<CommonResponse<IPolicy[]>> {
    return super.get<CommonResponse<IPolicy[]>>('GetExceededMaxTriesPolicies', params);
  }

  /**
   * Get Closed Policies
   *
   * @param {string} params
   * @returns {Observable<CommonResponse<IPolicy[]>>}
   * @memberof PolicyService
   */
  getClosedPolicis(params: string): Observable<CommonResponse<IPolicy[]>> {
    return super.get<CommonResponse<IPolicy[]>>('all?policyStatusId=4', params);
  }
  /**
   * Get Najm Pending Policies
   *
   * @param {string} params
   * @returns {Observable<CommonResponse<IPolicy[]>>}
   * @memberof PolicyService
   */
  getAllNajmPolicies(params: string): Observable<CommonResponse<IPolicy[]>> {
    return super.get<CommonResponse<IPolicy[]>>('najm-all', params);
  }
  getUpdateRequest(params: string): Observable<CommonResponse<IUpdateRequest[]>> {
    return super.get<CommonResponse<IUpdateRequest[]>>('update-request', params);
  }
  setUpdateRequestChange(params: string): Observable<CommonResponse<IUpdateRequest[]>> {
    return super.get<CommonResponse<IUpdateRequest[]>>('update-request/change', params);
  }
 /* uploadPolicy(body, params: string): Observable<CommonResponse<IUpdateRequest[]>> {
    return super.post<CommonResponse<IUpdateRequest[]>>('upload', body, params);
  }*/

  uploadPolicy(body): Observable<CommonResponse<IUpdateRequest[]>> {
    return this._http.post<CommonResponse<IUpdateRequest[]>>(this.apiUrl + 'upload', body);
  }
  addPayment(body, params: string): Observable<CommonResponse<IUpdateRequest[]>> {
    return super.post<CommonResponse<IUpdateRequest[]>>('update-request/payment', body, params);
  }
  refundPolicy(referenceId: string): Observable<CommonResponse<boolean>> {
    const params = `referenceId=${referenceId}&isRefunded=true`;
    return super.get<CommonResponse<boolean>>('set-policy-isrefunded', params);
  }
  getPolicyDetailsWithFilter(body, params) {
    return super.post<CommonResponse<IPolicy[]>>('policies-with-filter', body, params);
  }
  getAllNajmStatus() {
    return super.get<CommonResponse<NajmStatus[]>>('all-najm-status');
  }

}
