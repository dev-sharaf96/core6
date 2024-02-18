import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CommonResponse, IIdNamePairModel } from '..';
import { CheckoutsFilter } from 'src/app/checkouts/checkouts-filter';
import { CheckoutsModel } from 'src/app/checkouts/checkouts-model';
import { Observable, BehaviorSubject } from 'rxjs';
import { PolicyCheckoutFilter } from 'src/app/policies/checkout-policies/checkout-policies-filter';
import { PolicyCheckoutModel } from 'src/app/policies/checkout-policies/checkout-policies-model';
import { OutputModel } from '../models/output-model';

@Injectable()
export class CheckoutsService extends ApiService {

  public checkoutsFilter: CheckoutsFilter = new CheckoutsFilter();
  public policyCheckoutFilter: PolicyCheckoutFilter = new PolicyCheckoutFilter();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'checkouts/';

  }

  getCheckoutsWithFilter(body, params) {
    return super.post<CommonResponse<CheckoutsModel[]>>('getCheckoutsWithFilter', body, params);
  }

  getCheckoutDetails(referenceId) {
    return super.get<CommonResponse<CheckoutsModel>>('details', `referenceId=${referenceId}`);
  }

  getAllCheckedoutPoliciesBasedOnFilter(body, params): Observable<CommonResponse<PolicyCheckoutModel>> {
    return super.post<CommonResponse<PolicyCheckoutModel>>('getAllCheckedoutPoliciesBasedOnFilter', body, params);
  }

  updateCheckedoutPolicy(body:PolicyCheckoutModel) {
    return super.post<CommonResponse<any>>('updateCheckedoutPolicy', body);
  }

  addCheckedoutPolicy(body:PolicyCheckoutModel) {
    return super.post<CommonResponse<any>>('addCheckedoutPolicy', body);
  }

  deleteCheckedoutPolicy(id:number) {
    return super.get<CommonResponse<boolean>>('deleteCheckedoutPolicy', `Id=${id}`);
  }

  getChannels(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('getChannels');
  }

  uploadCheckOutImages(body): Observable<CommonResponse<OutputModel>> {
    return super.post<CommonResponse<OutputModel>>('UploadImages', body);
  }

  UpdateCheckoutEmail(body): Observable<CommonResponse<OutputModel>> {
    return super.post<CommonResponse<OutputModel>>('UpdateCheckoutEmail', body);
  }
}
