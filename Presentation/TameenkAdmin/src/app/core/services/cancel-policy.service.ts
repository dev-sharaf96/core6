import { CommonResponse, IIdNamePairModel } from '..';
import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { CancelPolicyRequestDto } from 'src/app/cancellation/Cancel-Policy-Request-Dto.model';
import { CancelRequest } from 'src/app/cancellation/cancellation-request.model';
import { CancelRequestFilter } from 'src/app/cancellation/cancellation-request-filter.model';
import{CancellPolicyOutput}from 'src/app/cancellation/cancel-response-output.model'
import{LookupsOutputResponse}from 'src/app/core/models/lookups-output.model';
import { Observable } from 'rxjs';
import { ReasonCodeModel } from 'src/app/core/models/reson-code.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CancelPolicyService extends ApiService {
  public cancelrequestsFilter:CancelRequestFilter  = new CancelRequestFilter();
  public cancelPolicyRequestDto:CancelPolicyRequestDto  = new CancelPolicyRequestDto();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'cancellation/';
    
  }
 
  SendCancelPolicy(body): Observable<CommonResponse<CancellPolicyOutput>> {
    return super.post<CommonResponse<CancellPolicyOutput>>('cancelPolicy', body);
  }

  GetReasonCodes(): Observable<LookupsOutputResponse<ReasonCodeModel[]>> {
    return super.get<LookupsOutputResponse<ReasonCodeModel[]>>('ReasonCodes');
  }
  GetCanellationPolicy(body, params): Observable<CommonResponse<CancelRequest[]>> {
    return super.post<CommonResponse<CancelRequest[]>>('getPolicyWithFilterForCancellation', body, params);
    
  }
  ActivatePolicy(body) {
    return super.post('activateCancelledPolicy', body);
  }
}